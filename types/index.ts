// Core data types for the Intent Data Engine

export type IntentLevel = 'Low' | 'Medium' | 'High';

export interface Contact {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  company?: string;
  industry?: string;
  location?: string;
  keywords?: string[];
  activityDate?: string; // ISO date string
  intentScore?: IntentLevel;
  enrichedData?: {
    address?: string;
    socialProfiles?: string[];
    additionalInfo?: Record<string, any>;
  };
  source: 'csv' | 'serpapi';
  createdAt: string;
  updatedAt: string;
}

export interface AudienceFilter {
  industry?: string;
  location?: string;
  intentLevel?: IntentLevel[];
  dateRange?: {
    start: string;
    end: string;
  };
  keywords?: string[];
}

export interface AppConfig {
  serpApiKey?: string;
  skipTraceApiKey?: string;
  webhookUrl?: string;
}

export interface ExportOptions {
  format: 'csv' | 'webhook' | 'hashed';
  filters?: AudienceFilter;
}

