# eCFR Analytics Dashboard

A web application for analyzing and visualizing data from the Electronic Code of Federal Regulations (eCFR). Built with React, TypeScript, Chakra UI, and ReCharts. The production app is hosted on Heroku at https://ecfr-frontend-1b42d1c0ad44.herokuapp.com

## Features
- View stats for all federal agencies
- Deep dive into individual agencies
- Search and sorting functionality to find specific agencies
- Top-level aggregate statistics across the CFR
- Visualization of regulatory corrections trends over time
- Responsive for optimal viewing on all screen sizes

## Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/josephycyeh/ecfr-analyzer-frontend.git
cd eCFR
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root:
```
VITE_API_URL=http://localhost:5001
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Preview the production build locally:
```bash
npm run preview
```

## Main Project Structure
- `src/`
  - `components/` - Reusable components
  - `pages/` - Main application pages
  - `hooks/` - Custom React hooks (sorting + filtering)
  - `utils/` - Utility functions (formatting numbers)
  - `App.tsx` - Main application component

## Key Pages

- `Analytics.tsx` - Analytics dashboard with charts and statistics
- `Agencies.tsx` - Main page with agency listing with search and sort functionality
- `AgencyDetails.tsx` - Detailed view of a given agency 
