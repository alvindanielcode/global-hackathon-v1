# Startup Launchpad - Setup Instructions

## Project Overview

This is a React + TypeScript + Tailwind CSS + shadcn/ui project featuring an interactive 3D globe (Launchpad) component.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation Steps

1. **Install all dependencies:**
   ```bash
   npm install
   ```
   
   This will install:
   - React, TypeScript, Vite
   - Tailwind CSS with animations
   - `cobe` for the 3D globe
   - `lucide-react` for icons
   - `framer-motion` for navbar animations
   - `@types/node` for TypeScript support

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Project Structure

```
global-hackathon-v1/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── launchpad.tsx       # 3D Globe component (renamed from Globe)
│   │   │   └── launchpad-demo.tsx  # Demo implementation
│   │   └── Header.tsx              # Navigation header
│   ├── lib/
│   │   └── utils.ts                # Utility functions (cn helper)
│   ├── App.tsx                     # Main application component
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Global styles with Tailwind
├── components.json                 # shadcn/ui configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite configuration
└── package.json                    # Dependencies and scripts
```

## Key Features

### Components Created

1. **Launchpad Component** (`/src/components/ui/launchpad.tsx`)
   - Interactive 3D globe using the `cobe` library
   - Displays markers for startup locations worldwide
   - Draggable and responsive

2. **Header Component** (`/src/components/Header.tsx`)
   - Clean navigation with three sections:
     - Home
     - Explore Startups
     - Upload Ideas
   - Sticky header with backdrop blur effect

3. **Main App** (`/src/App.tsx`)
   - Hero section with Launchpad demo
   - Explore Startups section with placeholder cards
   - Upload Ideas section with a form

## Dependencies Installed

### Production Dependencies
- `react` & `react-dom` - React framework
- `cobe` - 3D globe visualization
- `clsx` & `tailwind-merge` - Utility for conditional CSS classes
- `lucide-react` - Icon library (used for Rocket icon in header)

### Development Dependencies
- `vite` - Build tool and dev server
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS framework
- `tailwindcss-animate` - Animation utilities
- `@vitejs/plugin-react` - Vite React plugin
- TypeScript type definitions for React

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm start` - Alias for `npm run dev`

## Component Usage

### Using the Launchpad Component

```tsx
import { Launchpad } from "@/components/ui/launchpad"

function MyComponent() {
  return (
    <div className="relative h-96">
      <Launchpad className="top-0" />
    </div>
  )
}
```

### Customizing the Launchpad

You can pass custom configuration:

```tsx
import { Launchpad } from "@/components/ui/launchpad"

const customConfig = {
  markerColor: [1, 0, 0], // Red markers
  // ... other COBE options
}

function MyComponent() {
  return <Launchpad config={customConfig} />
}
```

## Why `/components/ui` Folder?

The `/components/ui` folder is important because:

1. **shadcn/ui Convention**: This is the standard location where shadcn/ui components are installed
2. **Separation of Concerns**: UI primitives are separated from feature components
3. **Reusability**: Components in this folder are meant to be reusable across the application
4. **Path Aliases**: The `@/components/ui` import path is configured in `tsconfig.json` and `components.json`

## Troubleshooting

If you encounter any issues:

1. **Clear node_modules and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node.js version:**
   ```bash
   node --version
   ```
   Should be v16 or higher.

3. **TypeScript errors:**
   The project uses strict TypeScript. All types should be properly defined.

## Next Steps

- Customize the Launchpad markers to show your startup locations
- Add real data to the "Explore Startups" section
- Implement form submission logic for "Upload Ideas"
- Add more pages and routing (consider using React Router)
- Connect to a backend API

## License

MIT
