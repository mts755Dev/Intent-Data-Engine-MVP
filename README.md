# Intent Data Engine MVP

A simple, rule-based Intent Data Engine built with Next.js. This MVP focuses on clean functionality without over-engineering.

## Features

✅ **Data Sources**
- CSV upload with bulk import
- SerpAPI integration for Google search data

✅ **Intent Scoring**
- Rule-based scoring system (Low/Medium/High)
- Based on keyword matching and recent activity window
- No AI or machine learning

✅ **Data Enrichment**
- Skip-trace API integration
- Basic contact enrichment

✅ **Dashboard**
- Clean table view of all contacts
- Filter and search capabilities
- Delete and bulk operations

✅ **Audience Builder**
- Advanced filtering:
  - Industry
  - Location
  - Intent level
  - Date range
  - Keywords
- Real-time filtering

✅ **Export Options**
- CSV export
- SHA-256 hashed audiences (for ad platforms)
- Webhook integration

## Tech Stack

- **Frontend:** Next.js 14 with TypeScript
- **UI Library:** shadcn/ui with Radix UI primitives
- **Styling:** Tailwind CSS
- **Storage:** Browser localStorage (MVP only)
- **Icons:** Lucide React

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Configuration

1. Navigate to **Settings** page
2. Configure your API keys:
   - **SerpAPI Key:** Get from [serpapi.com](https://serpapi.com)
   - **Skip-trace API Key:** Configure your enrichment API
   - **Webhook URL:** Optional webhook endpoint for exports

## Usage

### 1. Upload Contacts via CSV

- Go to Dashboard
- Click "Download Template" to get the CSV format
- Upload your CSV file with contacts
- Contacts will be automatically scored

**CSV Columns:**
- email, phone, name, company, industry, location, keywords (comma-separated)

### 2. Search with SerpAPI

- Enter a search query (e.g., "software companies looking for CRM")
- Results will be fetched and automatically scored
- Data is stored locally

### 3. View and Manage Contacts

- All contacts appear in the Dashboard table
- View intent scores, keywords, and contact details
- Delete individual contacts or clear all

### 4. Enrich Contacts

- Click "Enrich All" to enhance contact data
- Requires Skip-trace API key configuration
- Adds additional information like addresses, social profiles

### 5. Build Audiences

- Navigate to **Audience Builder**
- Apply filters to segment your contacts
- Export filtered audiences

### 6. Export Data

**Three export formats:**

1. **CSV Export:** Full contact data
2. **SHA-256 Hashed:** Privacy-safe export for ad platforms
3. **Webhook:** Send data to your configured endpoint

## Intent Scoring Rules

The scoring system uses simple, transparent rules:

### High Intent
- 2+ high-intent keywords, OR
- Activity within 7 days with high-intent keyword

**High-intent keywords:** buy, purchase, price, cost, quote, demo, trial, signup, subscribe, consultation, solution, implement

### Medium Intent
- 1 high-intent keyword, OR
- 2+ medium-intent keywords, OR
- Activity within 14 days

**Medium-intent keywords:** compare, review, best, features, benefits, how to, guide, learn, alternatives, vs, versus

### Low Intent
- Everything else

## Data Storage

All data is stored in browser localStorage:
- `intent_data_contacts` - Contact records
- `intent_data_config` - API keys and settings

**Note:** Data persists only in your browser. Clear browser data = lose contacts.

## Limitations (MVP Scope)

This is an MVP with intentional limitations:

- ❌ No backend database
- ❌ No authentication
- ❌ No advanced analytics
- ❌ No machine learning
- ❌ No complex automation
- ❌ localStorage only (not scalable)

## Project Structure

```
├── app/
│   ├── page.tsx                    # Dashboard
│   ├── audience-builder/page.tsx   # Audience Builder
│   ├── settings/page.tsx           # Settings
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
├── components/
│   ├── Navigation.tsx              # Nav bar
│   ├── CSVUpload.tsx               # CSV upload
│   ├── SerpAPISearch.tsx           # SerpAPI search
│   └── ContactsTable.tsx           # Contacts table
├── lib/
│   ├── storage.ts                  # localStorage utilities
│   ├── intentScoring.ts            # Scoring logic
│   ├── csvParser.ts                # CSV parsing
│   ├── export.ts                   # Export functions
│   ├── serpApi.ts                  # SerpAPI integration
│   ├── enrichment.ts               # Contact enrichment
│   └── filters.ts                  # Filtering logic
└── types/
    └── index.ts                    # TypeScript types
```

## API Integration Notes

### SerpAPI
- Endpoint: `https://serpapi.com/search.json`
- Free tier available
- Returns organic search results

### Skip-trace API (Placeholder)
- Generic implementation provided
- Adapt `lib/enrichment.ts` for your chosen API
- Options: Pipl, Clearbit, Hunter.io, etc.

### Webhook
- Sends POST request with JSON payload
- Includes contacts array and metadata

## Future Enhancements (Beyond MVP)

If you want to scale this:
- Add a proper database (PostgreSQL, MongoDB)
- Implement authentication
- Add backend API routes
- Build automated workflows
- Add more data sources
- Implement real-time updates
- Add advanced analytics

## License

MIT

## Support

This is an MVP - keep expectations lean and focused on core functionality.

