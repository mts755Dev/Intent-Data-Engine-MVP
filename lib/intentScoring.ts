// Simple rule-based intent scoring system
import { Contact, IntentLevel } from '@/types';

// High-intent keywords
const HIGH_INTENT_KEYWORDS = [
  'buy', 'purchase', 'price', 'cost', 'quote', 'demo', 'trial',
  'signup', 'subscribe', 'consultation', 'solution', 'implement'
];

// Medium-intent keywords
const MEDIUM_INTENT_KEYWORDS = [
  'compare', 'review', 'best', 'features', 'benefits', 'how to',
  'guide', 'learn', 'alternatives', 'vs', 'versus'
];

/**
 * Calculate intent score based on keywords and recent activity
 * Rules:
 * - High: 2+ high-intent keywords OR activity within 7 days with high-intent keyword
 * - Medium: 1 high-intent keyword OR 2+ medium-intent keywords OR activity within 14 days
 * - Low: Everything else
 */
export const calculateIntentScore = (contact: Contact): IntentLevel => {
  const keywords = contact.keywords?.map(k => k.toLowerCase()) || [];
  const activityDate = contact.activityDate ? new Date(contact.activityDate) : null;
  const now = new Date();
  
  // Calculate days since activity
  const daysSinceActivity = activityDate 
    ? Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24))
    : Infinity;

  // Count keyword matches
  const highIntentMatches = keywords.filter(k => 
    HIGH_INTENT_KEYWORDS.some(hi => k.includes(hi))
  ).length;
  
  const mediumIntentMatches = keywords.filter(k => 
    MEDIUM_INTENT_KEYWORDS.some(mi => k.includes(mi))
  ).length;

  // Apply scoring rules
  if (highIntentMatches >= 2 || (daysSinceActivity <= 7 && highIntentMatches >= 1)) {
    return 'High';
  }
  
  if (highIntentMatches >= 1 || mediumIntentMatches >= 2 || daysSinceActivity <= 14) {
    return 'Medium';
  }
  
  return 'Low';
};

/**
 * Batch score contacts
 */
export const scoreContacts = (contacts: Contact[]): Contact[] => {
  return contacts.map(contact => ({
    ...contact,
    intentScore: calculateIntentScore(contact),
    updatedAt: new Date().toISOString()
  }));
};

