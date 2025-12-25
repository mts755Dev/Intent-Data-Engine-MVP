'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { getConfig, saveConfig } from '@/lib/storage';
import { AppConfig } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Settings as SettingsIcon, Key, Webhook, CheckCircle2, Info } from 'lucide-react';

export default function Settings() {
  const [config, setConfig] = useState<AppConfig>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  const handleSave = () => {
    saveConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure your API keys and integrations
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <span>API Configuration</span>
              </CardTitle>
              <CardDescription>
                Configure your API keys for data sources and enrichment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {saved && (
                <Alert variant="success">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    Settings saved successfully!
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="serp-api">SerpAPI Key</Label>
                <Input
                  id="serp-api"
                  type="password"
                  value={config.serpApiKey || ''}
                  onChange={(e) => setConfig({ ...config, serpApiKey: e.target.value })}
                  placeholder="Enter your SerpAPI key"
                />
                <p className="text-xs text-muted-foreground">
                  Get your API key from{' '}
                  <a 
                    href="https://serpapi.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    serpapi.com
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skip-trace">Skip-trace API Key</Label>
                <Input
                  id="skip-trace"
                  type="password"
                  value={config.skipTraceApiKey || ''}
                  onChange={(e) => setConfig({ ...config, skipTraceApiKey: e.target.value })}
                  placeholder="Enter your skip-trace API key"
                />
                <p className="text-xs text-muted-foreground">
                  Configure your contact enrichment API key
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook">Webhook URL</Label>
                <Input
                  id="webhook"
                  type="url"
                  value={config.webhookUrl || ''}
                  onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                  placeholder="https://your-webhook-url.com/endpoint"
                />
                <p className="text-xs text-muted-foreground">
                  URL to receive contact data via webhook
                </p>
              </div>

              <Button onClick={handleSave} className="w-full">
                Save Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span>About This MVP</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground space-y-4">
                <p>
                  <strong className="text-foreground">Intent Data Engine MVP</strong> - A simple, rule-based system for collecting and scoring contact intent.
                </p>
                
                <div>
                  <h4 className="text-foreground font-medium mb-2">Features:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>✓ CSV upload for bulk contact import</li>
                    <li>✓ SerpAPI integration for Google search data</li>
                    <li>✓ Rule-based intent scoring (Low/Medium/High)</li>
                    <li>✓ Contact enrichment via skip-trace API</li>
                    <li>✓ Audience builder with advanced filters</li>
                    <li>✓ Multiple export formats (CSV, SHA-256, Webhook)</li>
                  </ul>
                </div>

                <Alert variant="info">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    All data is stored locally in your browser&apos;s localStorage.
                    Clear browser data will remove all contacts.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
