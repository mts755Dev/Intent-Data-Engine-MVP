# UI Design Guide

## Professional UI with shadcn/ui

The Intent Data Engine MVP now features a modern, professional interface built with **shadcn/ui** and **Tailwind CSS**.

## Design Philosophy

- **Clean & Modern:** Professional appearance without complexity
- **Consistent:** Unified design language across all pages
- **Accessible:** Built on Radix UI primitives for accessibility
- **Responsive:** Works seamlessly on all screen sizes
- **Intuitive:** Clear visual hierarchy and user flow

## Key UI Components

### 1. Navigation Bar

**Features:**
- Logo with icon badge
- Active state highlighting
- Icon + label navigation items
- Hover states for better UX

**Components Used:**
- Custom navigation with Lucide icons
- Tailwind utility classes

### 2. Dashboard

**Features:**
- Statistics cards showing key metrics
- Two-column layout for data sources
- Professional action buttons with icons
- Responsive grid layout

**Components Used:**
- `Card`, `CardHeader`, `CardTitle`, `CardContent`
- `Button` with variants (primary, outline, destructive)
- Icons from Lucide React

### 3. Data Input Cards

**CSV Upload & SerpAPI Search:**
- Clean card-based design
- Icon-enhanced titles
- Inline alerts for feedback
- Professional file input styling
- Action buttons with loading states

**Components Used:**
- `Card` components
- `Input` with custom styling
- `Label` for form fields
- `Alert` for notifications
- `Button` with loading states

### 4. Contacts Table

**Features:**
- Clean bordered table design
- Color-coded intent badges
- Keyword tags
- Hover effects on rows
- Icon-based actions
- Empty state with icon

**Components Used:**
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`, `TableHead`
- `Badge` with custom variants (destructive, warning, info)
- Lucide icons for visual clarity

### 5. Audience Builder

**Features:**
- Advanced filter controls
- Professional select dropdowns
- Date range inputs
- Real-time contact count
- Multiple export options
- Filter reset functionality

**Components Used:**
- `Select` with Radix UI
- `Input` for text and date fields
- `Label` for accessibility
- `Button` group for actions

### 6. Settings Page

**Features:**
- Centered layout with max-width
- Password input fields
- Success notifications
- External link styling
- Info card with feature list

**Components Used:**
- `Input` type="password"
- `Alert` with success variant
- `Card` for sections

## Color Scheme

### Intent Scores
- **High Intent:** Red/Destructive (`badge-destructive`)
- **Medium Intent:** Yellow/Warning (`badge-warning`)
- **Low Intent:** Blue/Info (`badge-info`)

### Actions
- **Primary:** Blue (`bg-primary`)
- **Secondary:** Gray (`bg-secondary`)
- **Destructive:** Red (`bg-destructive`)
- **Success:** Green (custom variant)

### Semantic Colors
- **Background:** `bg-background`
- **Foreground:** `text-foreground`
- **Muted:** `text-muted-foreground`
- **Border:** `border-border`

## Typography

- **Headings:** Bold, tracking-tight
- **Body:** Regular weight, comfortable line-height
- **Labels:** Medium weight, smaller size
- **Descriptions:** Muted foreground color

## Spacing & Layout

- **Container:** Max-width with auto margins
- **Padding:** Consistent 4/8 spacing units
- **Grid Gaps:** 4-6 spacing units
- **Card Padding:** 6 spacing units

## Interactive States

### Buttons
- **Default:** Solid background
- **Hover:** Slightly darker shade
- **Disabled:** 50% opacity
- **Focus:** Ring outline

### Tables
- **Hover:** Subtle background change
- **Selected:** Muted background

### Inputs
- **Focus:** Blue ring outline
- **Error:** Red border
- **Disabled:** Reduced opacity

## Icons

All icons from **Lucide React**:

- `Database` - Data/contacts
- `Users` - Audience/groups
- `Settings` - Configuration
- `Upload` - File upload
- `Download` - Export
- `Search` - SerpAPI search
- `Filter` - Audience filtering
- `Sparkles` - Enrichment
- `Trash2` - Delete actions
- `CheckCircle2` - Success states
- `AlertCircle` - Error states
- `Info` - Information
- `Send` - Webhook
- `Hash` - Hashing
- `Key` - API keys

## Responsive Breakpoints

- **Mobile:** < 768px (single column)
- **Tablet:** 768px - 1024px (2 columns)
- **Desktop:** > 1024px (full layout)

## Customization

### Changing Colors

Edit `app/globals.css`:
```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Blue */
  --destructive: 0 84.2% 60.2%; /* Red */
  /* ... other colors */
}
```

### Adding Components

Install additional shadcn/ui components:
```bash
npx shadcn-ui@latest add [component-name]
```

### Custom Variants

Extend `tailwind.config.ts` for custom colors/variants.

## Best Practices

1. **Consistency:** Use shadcn/ui components throughout
2. **Accessibility:** Always include labels and ARIA attributes
3. **Feedback:** Show loading and success/error states
4. **Icons:** Use meaningful icons to enhance UX
5. **Spacing:** Maintain consistent spacing with Tailwind classes
6. **Colors:** Stick to the semantic color system

## Component Structure

```tsx
// Typical component structure
<Card>
  <CardHeader>
    <CardTitle className="flex items-center space-x-2">
      <Icon className="h-5 w-5" />
      <span>Title</span>
    </CardTitle>
    <CardDescription>
      Description text
    </CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content here */}
  </CardContent>
</Card>
```

## Future Enhancements

Potential UI improvements:
- Dark mode toggle
- Data visualization charts
- Drag-and-drop CSV upload
- Toast notifications instead of alerts
- Loading skeletons
- Pagination for large datasets
- Column sorting and filtering
- Bulk selection checkboxes
- Modal dialogs for confirmations

---

**Note:** This UI is built with production-ready components while maintaining the lean MVP scope. All enhancements are optional and should align with core functionality needs.

