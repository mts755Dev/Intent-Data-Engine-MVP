'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ContactsTable from '@/components/ContactsTable';
import { getContacts, getConfig } from '@/lib/storage';
import { filterContacts, getFilterOptions } from '@/lib/filters';
import { exportToCSV, exportHashedAudience, sendToWebhook } from '@/lib/export';
import { Contact, AudienceFilter, IntentLevel } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Hash, Send, Filter, RotateCcw, Users } from 'lucide-react';

export default function AudienceBuilder() {
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [filters, setFilters] = useState<AudienceFilter>({});
  const [filterOptions, setFilterOptions] = useState({ industries: [] as string[], locations: [] as string[] });
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const contacts = getContacts();
    setAllContacts(contacts);
    setFilteredContacts(contacts);
    setFilterOptions(getFilterOptions(contacts));
  }, []);

  const applyFilters = () => {
    const filtered = filterContacts(allContacts, filters);
    setFilteredContacts(filtered);
  };

  const resetFilters = () => {
    setFilters({});
    setFilteredContacts(allContacts);
  };

  const handleExportCSV = () => {
    if (filteredContacts.length === 0) {
      alert('No contacts to export');
      return;
    }
    exportToCSV(filteredContacts, 'audience.csv');
  };

  const handleExportHashed = () => {
    if (filteredContacts.length === 0) {
      alert('No contacts to export');
      return;
    }
    exportHashedAudience(filteredContacts, 'hashed_audience.csv');
  };

  const handleExportWebhook = async () => {
    if (filteredContacts.length === 0) {
      alert('No contacts to export');
      return;
    }

    const config = getConfig();
    if (!config.webhookUrl) {
      alert('Please configure webhook URL in Settings');
      return;
    }

    setExporting(true);
    try {
      const success = await sendToWebhook(config.webhookUrl, filteredContacts);
      if (success) {
        alert('Successfully sent to webhook!');
      } else {
        alert('Failed to send to webhook');
      }
    } catch (error) {
      alert('Webhook error. Check console for details.');
      console.error(error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Audience Builder</h1>
          <p className="text-muted-foreground mt-2">
            Filter and segment your contacts to build targeted audiences
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </CardTitle>
              <CardDescription>
                Apply filters to segment your audience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={filters.industry || 'all'}
                    onValueChange={(value) => setFilters({ ...filters, industry: value === 'all' ? undefined : value })}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="All Industries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      {filterOptions.industries.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select
                    value={filters.location || 'all'}
                    onValueChange={(value) => setFilters({ ...filters, location: value === 'all' ? undefined : value })}
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {filterOptions.locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="intent">Intent Level</Label>
                  <Select
                    value={filters.intentLevel?.[0] || 'all'}
                    onValueChange={(value) => {
                      setFilters({ 
                        ...filters, 
                        intentLevel: value === 'all' ? undefined : [value as IntentLevel]
                      });
                    }}
                  >
                    <SelectTrigger id="intent">
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-start">Date Range Start</Label>
                  <Input
                    id="date-start"
                    type="date"
                    value={filters.dateRange?.start || ''}
                    onChange={(e) => setFilters({ 
                      ...filters, 
                      dateRange: { 
                        start: e.target.value, 
                        end: filters.dateRange?.end || '' 
                      } 
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-end">Date Range End</Label>
                  <Input
                    id="date-end"
                    type="date"
                    value={filters.dateRange?.end || ''}
                    onChange={(e) => setFilters({ 
                      ...filters, 
                      dateRange: { 
                        start: filters.dateRange?.start || '', 
                        end: e.target.value 
                      } 
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="keywords"
                    type="text"
                    placeholder="buy, demo, pricing"
                    onChange={(e) => {
                      const keywords = e.target.value
                        .split(',')
                        .map(k => k.trim())
                        .filter(k => k);
                      setFilters({ ...filters, keywords: keywords.length > 0 ? keywords : undefined });
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button onClick={applyFilters}>
                  <Filter className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
                <Button onClick={resetFilters} variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Filters
                </Button>
                <div className="ml-auto text-sm text-muted-foreground">
                  <Users className="inline h-4 w-4 mr-1" />
                  {filteredContacts.length} contacts match your filters
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Export Options</span>
              </CardTitle>
              <CardDescription>
                Export your filtered audience in various formats
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button 
                onClick={handleExportCSV} 
                disabled={filteredContacts.length === 0}
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button 
                onClick={handleExportHashed} 
                disabled={filteredContacts.length === 0}
                variant="outline"
              >
                <Hash className="mr-2 h-4 w-4" />
                Export SHA-256 Hashed
              </Button>
              <Button 
                onClick={handleExportWebhook} 
                disabled={filteredContacts.length === 0 || exporting}
              >
                <Send className="mr-2 h-4 w-4" />
                {exporting ? 'Sending...' : 'Send to Webhook'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <ContactsTable contacts={filteredContacts} />
      </div>
    </div>
  );
}
