// CSV parsing and validation
import Papa from 'papaparse';
import { Contact } from '@/types';
import { v4 as uuidv4 } from 'crypto';

// Generate simple UUID alternative for browser
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export interface CSVParseResult {
  contacts: Contact[];
  errors: string[];
}

/**
 * Parse CSV file and convert to Contact objects
 * Expected columns: email, phone, name, company, industry, location, keywords
 */
export const parseCSV = (file: File): Promise<CSVParseResult> => {
  return new Promise((resolve) => {
    const errors: string[] = [];
    const contacts: Contact[] = [];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        results.data.forEach((row: any, index: number) => {
          try {
            // Basic validation
            if (!row.email && !row.phone) {
              errors.push(`Row ${index + 1}: Must have email or phone`);
              return;
            }

            const contact: Contact = {
              id: generateId(),
              email: row.email?.trim() || undefined,
              phone: row.phone?.trim() || undefined,
              name: row.name?.trim() || undefined,
              company: row.company?.trim() || undefined,
              industry: row.industry?.trim() || undefined,
              location: row.location?.trim() || undefined,
              keywords: row.keywords ? row.keywords.split(',').map((k: string) => k.trim()) : undefined,
              activityDate: row.activityDate || new Date().toISOString(),
              source: 'csv',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            contacts.push(contact);
          } catch (error) {
            errors.push(`Row ${index + 1}: ${error}`);
          }
        });

        resolve({ contacts, errors });
      },
      error: (error) => {
        errors.push(`Parse error: ${error.message}`);
        resolve({ contacts, errors });
      }
    });
  });
};

/**
 * Generate CSV template
 */
export const generateCSVTemplate = (): string => {
  const headers = ['email', 'phone', 'name', 'company', 'industry', 'location', 'keywords'];
  const example = [
    'john@example.com',
    '555-1234',
    'John Doe',
    'Acme Corp',
    'Technology',
    'San Francisco, CA',
    'buy,demo,pricing'
  ];
  
  return `${headers.join(',')}\n${example.join(',')}`;
};

