// SerpAPI integration for Google search data
import { Contact } from '@/types';

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export interface SerpApiResult {
  title: string;
  link: string;
  snippet: string;
  position?: number;
}

export interface SerpApiSearchResult {
  contacts: Contact[];
  error?: string;
}

/**
 * Search using SerpAPI
 * Extract potential contact information from search results
 */
export const searchSerpApi = async (
  query: string,
  apiKey: string
): Promise<SerpApiSearchResult> => {
  try {
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      return { contacts: [], error: `API error: ${response.statusText}` };
    }

    const data = await response.json();
    
    if (data.error) {
      return { contacts: [], error: data.error };
    }

    const contacts: Contact[] = [];
    
    // Extract data from organic results
    const organicResults = data.organic_results || [];
    
    organicResults.forEach((result: any) => {
      // Extract keywords from title and snippet
      const keywords = extractKeywords(result.title + ' ' + result.snippet);
      
      // Create contact entry (basic info from search result)
      const contact: Contact = {
        id: generateId(),
        company: result.title?.split('|')[0]?.trim() || result.title,
        keywords,
        activityDate: new Date().toISOString(),
        source: 'serpapi',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      contacts.push(contact);
    });

    return { contacts };
  } catch (error: any) {
    return { contacts: [], error: error.message };
  }
};

/**
 * Extract keywords from text
 */
const extractKeywords = (text: string): string[] => {
  const keywords: string[] = [];
  const lowerText = text.toLowerCase();
  
  const keywordPatterns = [
    'buy', 'purchase', 'price', 'cost', 'quote', 'demo', 'trial',
    'signup', 'subscribe', 'compare', 'review', 'best', 'solution'
  ];

  keywordPatterns.forEach(pattern => {
    if (lowerText.includes(pattern)) {
      keywords.push(pattern);
    }
  });

  return keywords;
};

