# Premium Interactive 3D Developer Portfolio

A production-grade, high-performance developer portfolio built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and Three.js.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page
│   │   ├── globals.css         # Global styles
│   ├── components/
│   │   ├── CustomCursor.tsx    # Custom cursor with magnetic effects
│   │   ├── Navigation.tsx      # Responsive navigation
│   │   ├── Footer.tsx          # Footer component
│   │   ├── sections/           # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Experience.tsx
│   │   │   └── Contact.tsx
│   │   ├── three/              # 3D components
│   │   │   └── HeroScene.tsx
│   │   └── ui/                 # Reusable UI components
│   │       ├── MagneticButton.tsx
│   │       ├── SectionHeading.tsx
│   │       ├── ProjectCard.tsx
│   │       └── Counter.tsx
│   ├── data/
│   │   └── portfolio.ts        # Portfolio content & data
│   └── types/                  # TypeScript types
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── next.config.mjs
```

## ✨ Features

### Visual & Interactions
- ✓ Custom cursor with magnetic effects
- ✓ Smooth scroll experience (Lenis)
- ✓ 3D hero scene (React Three Fiber)
- ✓ Framer Motion animations
- ✓ Glass-morphism effects
- ✓ Gradient text and glows
- ✓ Section transitions

### Responsive Design
- ✓ Mobile-first approach
- ✓ Tablet optimization
- ✓ Desktop experience
- ✓ Touch-friendly interactions
- ✓ Performance optimized

### Sections
1. **Hero** - Impressive introduction with 3D scene
2. **About** - Professional summary with stats
3. **Skills** - Interactive tech stack organized by category
4. **Projects** - Showcase your best work
5. **Experience** - Timeline of your journey
6. **Contact** - Email, GitHub, LinkedIn + contact form
7. **Footer** - Quick navigation and social links

### Performance
- Code splitting and lazy loading
- Image optimization with Next.js Image
- Dynamic imports for heavy components
- Reduced motion support
- GPU-accelerated animations

### SEO
- Open Graph tags
- Twitter/X metadata
- Semantic HTML
- Meta descriptions
- Sitemap ready

## 🎨 Customization

### Content
Edit `src/data/portfolio.ts` to update:

```typescript
portfolioData: {
  name: '[YOUR NAME]',
  email: 'your.email@example.com',
  city: '[YOUR CITY]',
  bio: 'Your professional bio',
  social: { /* social links */ }
}

skills: { /* technology categories */ }
projects: [ /* your projects */ ]
experience: [ /* your journey */ ]
stats: [ /* key metrics */ ]
```

### Colors & Theme
Modify `tailwind.config.ts`:

```typescript
colors: {
  primary: '#00d9ff',      // Cyan accent
  secondary: '#b026ff',    // Violet accent
  // ... customize further
}
```

Also update CSS variables in `src/app/globals.css`:

```css
:root {
  --accent-cyan: #00d9ff;
  --accent-violet: #b026ff;
  --accent-lime: #00ff00;
}
```

### Typography
The portfolio uses Google Fonts **Geist** and **Geist Mono**. To change:

1. Update `src/app/layout.tsx` font import
2. Modify `tailwind.config.ts` fontFamily section
3. Update CSS if needed

### 3D Scene
Customize the hero 3D scene in `src/components/three/HeroScene.tsx`:

- Change geometry (currently `Icosahedron`)
- Adjust colors and materials
- Modify particle behavior
- Update lighting and camera

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Connect to Vercel
# Select your repository
# Deploy automatically
```

### Other Platforms

**Netlify:**
```bash
npm run build
# Deploy the .next folder
```

**Self-hosted:**
```bash
npm run build
npm start
```

Environment variables can be configured in `.env.local`.

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Each breakpoint has optimized:
- Typography sizes
- Spacing
- Animations
- 3D scene complexity
- Custom cursor behavior

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on buttons
- Reduced motion support (`prefers-reduced-motion`)
- High color contrast ratios
- Screen reader friendly

## ⚡ Performance Tips

1. **Images**: Add project images to `public/` and optimize
2. **Fonts**: Pre-load critical fonts
3. **3D**: Reduce geometry complexity on mobile
4. **Animations**: Use CSS transforms over position changes
5. **Code**: Tree-shake unused components

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

## 📚 Technologies Used

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS3
- **Animation**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **Scroll**: Lenis
- **Icons**: Lucide React
- **UI**: Custom components

## 🎯 Roadmap

- [ ] Dark/light theme toggle
- [ ] Blog section with MDX
- [ ] GitHub contributions graph
- [ ] Newsletter signup
- [ ] Dynamic project detail modals
- [ ] Analytics dashboard
- [ ] Multi-language support

## 📝 License

This portfolio template is free to use and modify for your personal use.

## 🤝 Support

For issues or questions, refer to the documentation in each component file.

---

**Built with ❤️ using Next.js and modern web technologies**
