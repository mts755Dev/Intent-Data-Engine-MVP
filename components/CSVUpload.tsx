'use client';

import { useState } from 'react';
import { parseCSV, generateCSVTemplate } from '@/lib/csvParser';
import { addContacts } from '@/lib/storage';
import { scoreContacts } from '@/lib/intentScoring';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Download, CheckCircle2, AlertCircle } from 'lucide-react';

interface CSVUploadProps {
  onUploadComplete?: () => void;
}

export default function CSVUpload({ onUploadComplete }: CSVUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    try {
      const result = await parseCSV(file);

      if (result.errors.length > 0) {
        setMessage({ 
          type: 'error', 
          text: `Upload completed with errors: ${result.errors.slice(0, 3).join(', ')}` 
        });
      }

      if (result.contacts.length > 0) {
        const scoredContacts = scoreContacts(result.contacts);
        addContacts(scoredContacts);
        
        setMessage({ 
          type: 'success', 
          text: `Successfully imported ${result.contacts.length} contacts` 
        });

        if (onUploadComplete) {
          onUploadComplete();
        }
      } else {
        setMessage({ type: 'error', text: 'No valid contacts found in CSV' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: `Upload failed: ${error.message}` });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const downloadTemplate = () => {
    const template = generateCSVTemplate();
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contacts_template.csv';
    link.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5" />
          <span>Upload CSV</span>
        </CardTitle>
        <CardDescription>
          Import contacts from CSV file with automatic intent scoring
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {message && (
          <Alert variant={message.type === 'success' ? 'success' : 'destructive'}>
            {message.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="csv-file">Select CSV File</Label>
          <Input
            id="csv-file"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button 
            onClick={downloadTemplate}
            variant="outline"
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Columns: email, phone, name, company, industry, location, keywords
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
