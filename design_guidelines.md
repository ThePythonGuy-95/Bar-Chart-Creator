# Design Guidelines: Bar Chart Generator

## Design Approach

**Selected Framework:** Design System Approach - Material Design inspired with data visualization focus

**Rationale:** This is a utility-focused tool where efficiency, clarity, and usability are paramount. Drawing inspiration from professional data visualization platforms like Observable, Plotly, and Google Charts to ensure intuitive data input and clear chart output.

**Key Principles:**
- Clarity over decoration
- Immediate feedback and preview
- Minimal cognitive load
- Data visualization best practices

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 220 90% 56% (Professional blue for actions)
- Background: 0 0% 100% (Pure white)
- Surface: 220 13% 97% (Light gray for cards)
- Border: 220 13% 91% (Subtle dividers)
- Text Primary: 220 9% 15%
- Text Secondary: 220 9% 46%

**Dark Mode:**
- Primary: 220 90% 66% (Lighter blue for contrast)
- Background: 222 47% 11% (Deep slate)
- Surface: 217 33% 17% (Elevated surfaces)
- Border: 217 20% 28%
- Text Primary: 210 20% 98%
- Text Secondary: 215 16% 65%

**Chart Colors:** Use a professional palette: 199 89% 48%, 142 71% 45%, 24 94% 50%, 271 81% 56%, 48 96% 53%

### B. Typography

**Font Families:**
- Primary: 'Inter' (Google Fonts) - Modern, excellent readability
- Monospace: 'JetBrains Mono' for data/numbers

**Hierarchy:**
- Page Title: text-3xl font-semibold (2rem)
- Section Headers: text-xl font-medium (1.25rem)
- Input Labels: text-sm font-medium (0.875rem)
- Body/Input Text: text-base (1rem)
- Helper Text: text-sm text-secondary (0.875rem)

### C. Layout System

**Spacing Primitives:** Use Tailwind units: 2, 4, 6, 8, 12, 16, 24
- Component padding: p-6 to p-8
- Section spacing: mb-8 to mb-12
- Input gaps: gap-4 to gap-6

**Grid Structure:**
- Desktop: Two-column layout (40% input panel / 60% chart preview)
- Tablet: Single column with input above preview
- Mobile: Stack vertically with optimized form controls

**Container:** max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

### D. Component Library

**Data Input Panel (Left/Top):**
- Card container with surface background
- Chart title input: Large text field with label
- Dynamic field rows: X-axis label + Y-axis value pairs
- Add/Remove buttons: Icon buttons (Heroicons - plus/minus)
- Primary action button: "Generate Chart" - prominent, full-width on mobile
- Clear data button: Secondary/ghost variant

**Chart Preview Area (Right/Bottom):**
- Card container with clean background
- Chart canvas: Responsive, maintains aspect ratio
- Chart controls: Download PNG/SVG, Copy data buttons
- Empty state: Illustration or icon with "Add data to generate chart" message

**Form Controls:**
- Text inputs: Consistent height (h-10), rounded-md borders
- Number inputs: Right-aligned for Y-axis values
- Focus states: Ring-2 ring-primary ring-offset-2
- Error states: Red border with helper text below
- Validation: Inline feedback for required fields

**Buttons:**
- Primary: bg-primary text-white, hover state darkens
- Secondary: border variant with subtle hover
- Icon buttons: p-2, rounded-md, hover:bg-surface

**Interactions:**
- Add field: Smooth entry animation (slide down + fade in)
- Remove field: Exit animation with confirmation for last field
- Chart updates: Debounced re-render (300ms after last input)
- Download: Trigger with visual feedback

### E. Page Structure

**No Hero Section** - Direct utility interface

**Main Layout:**
1. **Header Bar** (py-4): Logo/title "Chart Builder", optional theme toggle
2. **Input Section**: Form panel with all data entry controls
3. **Preview Section**: Chart display with export options
4. **Footer** (optional): Simple credits or link to documentation

**Mobile Optimization:**
- Sticky "Generate Chart" button at bottom
- Collapsible input sections if many fields
- Horizontal scroll for wide charts
- Touch-friendly hit areas (min 44px)

## Special Considerations

**Chart Rendering:**
- Use Chart.js via CDN for lightweight implementation
- Default bar chart style: Rounded tops, consistent spacing
- Grid lines: Subtle, don't compete with data
- Axis labels: Clear, auto-rotating if long text
- Responsive: Chart resizes with container

**Data Management:**
- Minimum 2 data points to generate chart
- Maximum 20 data points (reasonable limit)
- Local storage: Auto-save draft data
- Sample data button for quick demo

**Accessibility:**
- ARIA labels for all inputs
- Keyboard navigation for add/remove actions
- Focus management for dynamic fields
- Chart alt text with data summary

**Empty State:**
- Friendly illustration or icon (bar chart outline)
- Clear call-to-action: "Start by adding your first data point"

**No Images Required** - This is a pure utility tool focused on data visualization functionality.