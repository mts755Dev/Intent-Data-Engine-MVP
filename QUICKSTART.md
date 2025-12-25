# Quick Start Guide

Get your Intent Data Engine MVP running in minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# This will install:
# - Next.js 14
# - shadcn/ui components
# - Tailwind CSS
# - All required dependencies
```

## Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## First Steps

### 1. Configure API Keys (Optional)
- Navigate to **Settings** (top right)
- Add your SerpAPI key if you want to use search
- Add Skip-trace API key for enrichment
- Add Webhook URL if needed

### 2. Import Sample Data
- Go to **Dashboard**
- Upload `example_contacts.csv` to see the system in action
- Contacts will be automatically scored

### 3. Try Features

**Dashboard:**
- View all contacts with intent scores
- Export to CSV
- Delete contacts
- Enrich contacts (requires API key)

**Audience Builder:**
- Filter by industry, location, intent level
- Set date ranges
- Export filtered audiences
- Send to webhook

## Sample Workflow

1. **Upload CSV** → Contacts auto-scored
2. **View Dashboard** → See intent scores (High/Medium/Low)
3. **Build Audience** → Filter high-intent contacts in Tech industry
4. **Export** → Download CSV or send to webhook

## Keyboard Shortcuts

- Press **Enter** in SerpAPI search to search immediately
- Use browser search (Cmd/Ctrl+F) to find contacts in table

## Tips

- Start with sample CSV to understand format
- High-intent keywords: buy, demo, trial, pricing, quote
- Medium-intent: compare, review, features, best
- All data stored in browser (localStorage)
- Clear browser data = lose all contacts

## Troubleshooting

**"No contacts found"**
- Upload a CSV or search with SerpAPI first

**SerpAPI not working**
- Check API key in Settings
- Verify you have API credits

**Export not working**
- Check browser allows downloads
- For webhook, verify URL is correct

**Data disappeared**
- localStorage cleared (browser data cleared)
- Use export feature regularly to backup

## Production Build

```bash
npm run build
npm start
```

## Next Steps

- Read full README.md for detailed documentation
- Customize intent scoring rules in `lib/intentScoring.ts`
- Adapt enrichment API in `lib/enrichment.ts`
- Modify filters in Audience Builder as needed

---

**Remember:** This is an MVP. Keep it simple. No over-engineering.

