// localStorage utility functions for MVP
import { Contact, AppConfig } from '@/types';

const CONTACTS_KEY = 'intent_data_contacts';
const CONFIG_KEY = 'intent_data_config';

// Contacts Management
export const saveContacts = (contacts: Contact[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }
};

export const getContacts = (): Contact[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(CONTACTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addContact = (contact: Contact): void => {
  const contacts = getContacts();
  contacts.push(contact);
  saveContacts(contacts);
};

export const addContacts = (newContacts: Contact[]): void => {
  const contacts = getContacts();
  contacts.push(...newContacts);
  saveContacts(contacts);
};

export const updateContact = (id: string, updates: Partial<Contact>): void => {
  const contacts = getContacts();
  const index = contacts.findIndex(c => c.id === id);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...updates, updatedAt: new Date().toISOString() };
    saveContacts(contacts);
  }
};

export const deleteContact = (id: string): void => {
  const contacts = getContacts();
  const filtered = contacts.filter(c => c.id !== id);
  saveContacts(filtered);
};

export const clearContacts = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CONTACTS_KEY);
  }
};

// Configuration Management
export const saveConfig = (config: AppConfig): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  }
};

export const getConfig = (): AppConfig => {
  if (typeof window === 'undefined') return {};
  const data = localStorage.getItem(CONFIG_KEY);
  return data ? JSON.parse(data) : {};
};

