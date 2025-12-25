// Export functionality: CSV, Webhook, SHA-256 hashing
import { Contact } from '@/types';
import CryptoJS from 'crypto-js';

/**
 * Export contacts as CSV
 */
export const exportToCSV = (contacts: Contact[], filename: string = 'contacts.csv'): void => {
  const headers = [
    'id', 'email', 'phone', 'name', 'company', 'industry', 
    'location', 'keywords', 'intentScore', 'activityDate', 'source'
  ];
  
  const rows = contacts.map(contact => [
    contact.id,
    contact.email || '',
    contact.phone || '',
    contact.name || '',
    contact.company || '',
    contact.industry || '',
    contact.location || '',
    contact.keywords?.join(';') || '',
    contact.intentScore || '',
    contact.activityDate || '',
    contact.source
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export hashed audience (SHA-256)
 * Hashes emails and phones for privacy (useful for ad platforms)
 */
export const exportHashedAudience = (contacts: Contact[], filename: string = 'hashed_audience.csv'): void => {
  const headers = ['hashed_email', 'hashed_phone', 'industry', 'location', 'intentScore'];
  
  const rows = contacts.map(contact => [
    contact.email ? CryptoJS.SHA256(contact.email.toLowerCase().trim()).toString() : '',
    contact.phone ? CryptoJS.SHA256(contact.phone.replace(/\D/g, '')).toString() : '',
    contact.industry || '',
    contact.location || '',
    contact.intentScore || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Send contacts to webhook
 */
export const sendToWebhook = async (webhookUrl: string, contacts: Contact[]): Promise<boolean> => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contacts,
        timestamp: new Date().toISOString(),
        count: contacts.length
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Webhook error:', error);
    return false;
  }
};

