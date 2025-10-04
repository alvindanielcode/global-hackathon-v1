# Quick Start Guide

## 🚀 Get Started in 2 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run the App
```bash
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## ✨ What You'll See

### Full-Screen Globe Experience
- **Black background** with an interactive 3D globe
- **White text** overlaid on the globe
- **Smooth scrolling** through different sections

### Main Sections

1. **Home** - Hero section with "Launchpad" heading and tagline
2. **Explore Startups** - Grid of startup cards
3. **Upload Ideas** - Form to submit new ideas
4. **About** - Information about the platform

### Interactive Footer Navigation
- **Tubelight navbar** at the bottom with animated tab indicator
- Click to navigate between sections
- Responsive design (icons on mobile, text on desktop)

---

## 🎨 Design Highlights

- **Color Scheme**: Black background, white text, orange accents
- **Globe**: Interactive, draggable, always visible
- **Animations**: Smooth transitions and spring animations
- **Glass Morphism**: Semi-transparent cards with backdrop blur

---

## 📁 Key Files

- `src/App.tsx` - Main application with all sections
- `src/components/ui/launchpad.tsx` - 3D globe component
- `src/components/ui/tubelight-navbar.tsx` - Animated footer navigation
- `package.json` - All dependencies

---

## 🔧 Customization

### Change Globe Colors
Edit `src/components/ui/launchpad.tsx`:
```typescript
const LAUNCHPAD_CONFIG: COBEOptions = {
  dark: 1,              // 0 = light, 1 = dark
  mapBrightness: 6,     // Adjust brightness
  markerColor: [r, g, b], // RGB values (0-1)
  // ... more options
}
```

### Add More Navigation Items
Edit `src/App.tsx`:
```typescript
const navItems = [
  { name: "Home", url: "#home", icon: Home },
  // Add more items here
]
```

### Modify Sections
All sections are in `src/App.tsx` - edit the JSX directly.

---

## 🐛 Troubleshooting

**TypeScript errors about missing modules?**
- Run `npm install` to install all dependencies
- The errors will disappear once packages are installed

**Globe not showing?**
- Check browser console for WebGL errors
- Ensure your browser supports WebGL

**Navbar not animating?**
- Ensure `framer-motion` is installed
- Check that JavaScript is enabled

---

## 📚 Learn More

- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [IMPLEMENTATION_NOTES.md](./IMPLEMENTATION_NOTES.md) - Technical details
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
