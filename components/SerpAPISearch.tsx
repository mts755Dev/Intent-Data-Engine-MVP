'use client';

import { useState } from 'react';
import { searchSerpApi } from '@/lib/serpApi';
import { getConfig } from '@/lib/storage';
import { addContacts } from '@/lib/storage';
import { scoreContacts } from '@/lib/intentScoring';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface SerpAPISearchProps {
  onSearchComplete?: () => void;
}

export default function SerpAPISearch({ onSearchComplete }: SerpAPISearchProps) {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setMessage({ type: 'error', text: 'Please enter a search query' });
      return;
    }

    const config = getConfig();
    if (!config.serpApiKey) {
      setMessage({ type: 'error', text: 'Please configure SerpAPI key in Settings' });
      return;
    }

    setSearching(true);
    setMessage({ type: 'info', text: 'Searching...' });

    try {
      const result = await searchSerpApi(query, config.serpApiKey);

      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else if (result.contacts.length > 0) {
        const scoredContacts = scoreContacts(result.contacts);
        addContacts(scoredContacts);
        
        setMessage({ 
          type: 'success', 
          text: `Found ${result.contacts.length} results` 
        });
        
        setQuery('');

        if (onSearchComplete) {
          onSearchComplete();
        }
      } else {
        setMessage({ type: 'info', text: 'No results found' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: `Search failed: ${error.message}` });
    } finally {
      setSearching(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Search className="h-5 w-5" />
          <span>SerpAPI Search</span>
        </CardTitle>
        <CardDescription>
          Search Google for potential leads with automatic intent analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {message && (
          <Alert variant={message.type === 'error' ? 'destructive' : message.type === 'success' ? 'success' : 'info'}>
            {message.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : message.type === 'error' ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <Info className="h-4 w-4" />
            )}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="search-query">Search Query</Label>
          <div className="flex space-x-2">
            <Input
              id="search-query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="e.g., software companies looking for CRM solutions"
              disabled={searching}
            />
            <Button 
              onClick={handleSearch}
              disabled={searching}
            >
              {searching ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Results will be automatically scored based on intent keywords
        </p>
      </CardContent>
    </Card>
  );
}
