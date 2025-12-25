'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import CSVUpload from '@/components/CSVUpload';
import SerpAPISearch from '@/components/SerpAPISearch';
import ContactsTable from '@/components/ContactsTable';
import { getContacts, deleteContact, clearContacts, saveContacts } from '@/lib/storage';
import { enrichContacts } from '@/lib/enrichment';
import { getConfig } from '@/lib/storage';
import { exportToCSV } from '@/lib/export';
import { Contact } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Sparkles, Trash2, Database } from 'lucide-react';

export default function Dashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [enriching, setEnriching] = useState(false);

  const loadContacts = () => {
    setContacts(getContacts());
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      deleteContact(id);
      loadContacts();
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete ALL contacts? This cannot be undone.')) {
      clearContacts();
      loadContacts();
    }
  };

  const handleEnrichAll = async () => {
    const config = getConfig();
    if (!config.skipTraceApiKey) {
      alert('Please configure Skip-trace API key in Settings');
      return;
    }

    if (!confirm(`Enrich ${contacts.length} contacts? This may take a while.`)) {
      return;
    }

    setEnriching(true);
    try {
      const enriched = await enrichContacts(
        contacts, 
        config.skipTraceApiKey,
        (current, total) => {
          console.log(`Enriching ${current}/${total}`);
        }
      );
      saveContacts(enriched);
      loadContacts();
      alert('Enrichment complete!');
    } catch (error) {
      alert('Enrichment failed. Check console for details.');
      console.error(error);
    } finally {
      setEnriching(false);
    }
  };

  const handleExport = () => {
    if (contacts.length === 0) {
      alert('No contacts to export');
      return;
    }
    exportToCSV(contacts);
  };

  const stats = [
    {
      title: 'Total Contacts',
      value: contacts.length,
      icon: Database,
    },
    {
      title: 'High Intent',
      value: contacts.filter(c => c.intentScore === 'High').length,
      icon: Sparkles,
    },
    {
      title: 'Medium Intent',
      value: contacts.filter(c => c.intentScore === 'Medium').length,
      icon: Sparkles,
    },
    {
      title: 'Low Intent',
      value: contacts.filter(c => c.intentScore === 'Low').length,
      icon: Sparkles,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your intent data and track leads
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={handleExport}
              disabled={contacts.length === 0}
              variant="outline"
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button 
              onClick={handleEnrichAll}
              disabled={contacts.length === 0 || enriching}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {enriching ? 'Enriching...' : 'Enrich All'}
            </Button>
            <Button 
              onClick={handleClearAll}
              disabled={contacts.length === 0}
              variant="destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <CSVUpload onUploadComplete={loadContacts} />
          <SerpAPISearch onSearchComplete={loadContacts} />
        </div>

        <ContactsTable contacts={contacts} onDelete={handleDelete} />
      </div>
    </div>
  );
}
