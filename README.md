# Abdullah Shaz's Portfolio

A modern, dynamic portfolio website that automatically fetches and displays GitHub projects. Built with vanilla HTML, CSS, and JavaScript.

## Features

✨ **Dynamic GitHub Integration** - Automatically fetches your latest 50+ GitHub repositories
🎨 **Modern Design** - Responsive, dark-mode aware, professional styling
🔍 **Project Filtering** - Filter projects by programming language
📱 **Mobile Responsive** - Works beautifully on all devices
⚡ **Performance** - Lightweight, no build process required
🎯 **SEO Friendly** - Proper HTML structure and metadata

## Project Structure

```
portfolio/
├── index.html          # Main portfolio page
├── css/
│   └── style.css       # All styling (light/dark mode support)
├── js/
│   └── projects.js     # GitHub API integration and filtering
└── README.md          # This file
```

## How It Works

1. **Automatic GitHub Fetching**: The portfolio fetches your public repositories from GitHub API
2. **Smart Filtering**: Projects are categorized by programming language
3. **Live Updates**: New repos appear automatically on your portfolio
4. **Project Details**: Shows repo name, description, language, stars, forks, and last updated

## Deployment to GitHub Pages

### Option 1: Quick Setup (Recommended)

1. Clone your GitHub Pages repository:
   ```bash
   git clone https://github.com/Abdullahshaz70/Abdullahshaz70.github.io
   cd Abdullahshaz70.github.io
   ```

2. Copy portfolio files into the repository:
   ```bash
   cp -r path/to/portfolio/* .
   ```

3. Commit and push:
   ```bash
   git add .
   git commit -m "Update portfolio with dynamic project showcase"
   git push origin main
   ```

4. Your portfolio is now live at: **https://abdullahshaz70.github.io**

### Option 2: Local Testing

To test locally before deploying:

1. Use Python (3.x):
   ```bash
   cd portfolio
   python -m http.server 8000
   ```

2. Or use Node.js with http-server:
   ```bash
   npm install -g http-server
   cd portfolio
   http-server
   ```

3. Open http://localhost:8000 in your browser

## Customization

### Change Your GitHub Username
Edit `js/projects.js`:
```javascript
const GITHUB_USERNAME = 'your-github-username'; // Change this
```

### Exclude Repositories
Edit the `excludeRepos` array in `js/projects.js`:
```javascript
const excludeRepos = ['repo-to-hide', 'another-repo'];
```

### Change Color Scheme
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #6366f1;      /* Change to your brand color */
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... other colors ... */
}
```

### Add Language Colors
Add to `languageColors` object in `js/projects.js`:
```javascript
const languageColors = {
    'Rust': '#ce422b',
    'Go': '#00add8',
    // ... more languages ...
};
```

### Update Personal Info
Edit sections in `index.html`:
- Hero title and subtitle
- About section content
- Contact email and links

## Features in Detail

### Hero Section
- Eye-catching gradient background
- Call-to-action buttons
- Links to GitHub profile

### Projects Section
- Grid layout (responsive, 1-3 columns)
- Filter by programming language
- Shows:
  - Project name and description
  - Programming language with color indicator
  - Stars and forks count
  - Last updated date
  - Direct GitHub link

### About Section
- Personal bio and interests
- Technology stack showcase
- Skills and expertise

### Contact Section
- Email link
- GitHub profile link
- Professional appearance

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- **No build step needed** - Pure HTML/CSS/JS
- **Lightweight** - ~50KB total size
- **Fast loading** - Minimal dependencies
- **GitHub API** - Cached by browser (60 requests/hour limit for unauthenticated)

### Rate Limiting Note
The GitHub API allows 60 requests per hour for unauthenticated requests. If you hit the limit:
1. Create a Personal Access Token at https://github.com/settings/tokens
2. Add it to your API requests: `fetch(url, {headers: {Authorization: 'token YOUR_TOKEN'}})`

## Troubleshooting

### Projects not loading?
- Check browser console for errors (F12)
- Verify GitHub API is accessible
- Check GitHub username is correct in `js/projects.js`

### Dark mode not working?
- Ensure browser supports `prefers-color-scheme`
- Check CSS variables are loading correctly

### Styling looks wrong?
- Clear browser cache
- Try in incognito/private mode
- Check for CSS file path issues

## Future Enhancements

Possible improvements:
- [ ] GitHub API authentication for higher rate limits
- [ ] Project categories/tags
- [ ] Blog section
- [ ] Skills timeline
- [ ] Project search functionality
- [ ] Social media integrations
- [ ] Analytics tracking

## License

Feel free to customize and use this portfolio template for your needs!

## Contact

**Email**: asifmubeenly333@gmail.com  
**GitHub**: https://github.com/Abdullahshaz70

---

Built with ❤️ and vanilla web technologies. No frameworks, no build tools, just pure code.
