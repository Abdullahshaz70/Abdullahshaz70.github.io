# Premium Interactive Portfolio

A modern, interactive portfolio built with React, Three.js, and advanced web technologies. Features smooth scrolling, responsive design, and dark theme.

## Features

- **Hero Section**: Large typography with call-to-action buttons
- **About Section**: Introduction with structured layout
- **Contact Section**: Contact form with social links
- **Responsive Design**: Mobile-first, adapts to all screen sizes
- **Smooth Animations**: CSS animations and transitions
- **Modern Fonts**: Geist and Instrument Serif from Google Fonts
- **Dark Theme**: Optimized for modern aesthetics
- **Accessibility**: Semantic HTML and ARIA labels

## Tech Stack

- **React**: UI framework
- **Three.js**: 3D graphics (ready for future enhancements)
- **Lenis**: Smooth scrolling library
- **CSS3**: Advanced styling with custom properties

## Getting Started

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Customize content** - Replace placeholders in `Portfolio.dc.html`:
   - `[YOUR NAME]` - Your full name
   - `[YOUR EMAIL]` - Your email address
   - `[YOUR CITY]` - Your location
   - `[YOUR-GITHUB]` - Your GitHub username
   - `[YOUR-LINKEDIN]` - Your LinkedIn handle (optional)

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   - Navigate to `http://localhost:3000` (or the port shown)

### File Structure

```
portfolio/
├── Portfolio.dc.html     # Main portfolio template (dc-component format)
├── support.js           # DC-runtime for template rendering
├── package.json         # Project dependencies
└── README.md           # This file
```

## Customization

### Colors

The portfolio uses a custom accent color defined in the CSS:

```css
:root {
  --acc: #c8f542  /* Change this to your brand color */
}
```

### Content Sections

Edit `Portfolio.dc.html` to:
- Update the about section description
- Add or modify sections
- Change social media links
- Update contact form endpoint

### Fonts

The portfolio loads fonts from Google Fonts:
- **Geist**: Main typeface (300-700 weights)
- **Geist Mono**: Monospace (400, 500)
- **Instrument Serif**: Display/italic (regular, italic)

To change fonts, modify the `<link>` in the `<helmet>` section.

## Deployment

### To Vercel (Recommended for Next.js)

1. Push to GitHub
2. Connect to Vercel
3. Vercel will auto-deploy on push

### To other platforms

1. Build: `npm run build`
2. Deploy the `.next` folder or static export

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The portfolio is optimized for:
- Fast load times
- Smooth 60fps animations
- Mobile performance
- Accessibility

## Future Enhancements

- [ ] 3D background animation (Three.js)
- [ ] Project showcase carousel
- [ ] Blog section
- [ ] Dark/Light theme toggle
- [ ] Contact form backend integration
- [ ] Analytics integration

## Support

For issues or questions about the design, refer to the original design system or submit an issue.

## License

Created with [Claude Code](https://claude.com/claude-code)
