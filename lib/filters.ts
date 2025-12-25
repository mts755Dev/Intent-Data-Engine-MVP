// Audience filtering utilities
import { Contact, AudienceFilter } from '@/types';

/**
 * Filter contacts based on audience criteria
 */
export const filterContacts = (contacts: Contact[], filters: AudienceFilter): Contact[] => {
  return contacts.filter(contact => {
    // Industry filter
    if (filters.industry && contact.industry) {
      if (!contact.industry.toLowerCase().includes(filters.industry.toLowerCase())) {
        return false;
      }
    }

    // Location filter
    if (filters.location && contact.location) {
      if (!contact.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
    }

    // Intent level filter
    if (filters.intentLevel && filters.intentLevel.length > 0) {
      if (!contact.intentScore || !filters.intentLevel.includes(contact.intentScore)) {
        return false;
      }
    }

    // Date range filter
    if (filters.dateRange) {
      const activityDate = contact.activityDate ? new Date(contact.activityDate) : null;
      if (activityDate) {
        const start = new Date(filters.dateRange.start);
        const end = new Date(filters.dateRange.end);
        
        if (activityDate < start || activityDate > end) {
          return false;
        }
      } else {
        return false;
      }
    }

    // Keywords filter
    if (filters.keywords && filters.keywords.length > 0) {
      const contactKeywords = contact.keywords?.map(k => k.toLowerCase()) || [];
      const hasKeyword = filters.keywords.some(filterKeyword =>
        contactKeywords.some(ck => ck.includes(filterKeyword.toLowerCase()))
      );
      
      if (!hasKeyword) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Get unique values for filter options
 */
export const getFilterOptions = (contacts: Contact[]) => {
  const industries = new Set<string>();
  const locations = new Set<string>();
  
  contacts.forEach(contact => {
    if (contact.industry) industries.add(contact.industry);
    if (contact.location) locations.add(contact.location);
  });

  return {
    industries: Array.from(industries).sort(),
    locations: Array.from(locations).sort(),
  };
};

