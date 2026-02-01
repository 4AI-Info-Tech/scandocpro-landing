# ScanDocPro Landing Page - Agent Guide

This document provides essential information for AI coding agents working on the ScanDocPro landing page project.

---

## Project Overview

**ScanDocPro Landing Page** is a modern, enterprise-grade marketing website for ScanDocPro - an AI-powered mobile document scanner app. The site is built as a static single-page application (SPA) with client-side routing.

- **Repository**: `scandocpro-landing`
- **Domain**: https://scandocpro.com
- **Company**: 4AI Info Tech
- **Language**: English (all code and content)

---

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 18.3.1 |
| Language | TypeScript | 5.5.3 |
| Build Tool | Vite | 5.4.21 |
| Styling | Tailwind CSS | 3.4.1 |
| Routing | React Router DOM | 6.22.3 |
| Icons | Lucide React | 0.344.0 |
| Analytics | PostHog | 1.258.2 |

---

## Project Structure

```
.
├── blog/                      # Markdown blog posts with frontmatter
├── public/                    # Static assets (copied to dist/)
│   ├── blog-data/            # Generated JSON files from blog posts
│   ├── blog-images/          # Blog post images
│   ├── favicon.svg
│   └── robots.txt
├── scripts/                   # Build automation scripts
│   ├── build-blog.cjs        # Compiles markdown → JSON
│   └── generate-sitemap.js   # Generates sitemap.xml
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── SEO.tsx          # Dynamic meta tag manager
│   │   ├── Navigation.tsx   # Header with theme toggle
│   │   ├── Footer.tsx
│   │   ├── PhoneMockup.tsx  # Product mockup component
│   │   ├── FeatureCard.tsx
│   │   ├── BlogCard.tsx
│   │   ├── GradientText.tsx
│   │   ├── StepCard.tsx
│   │   ├── AppBadge.tsx     # App store download buttons
│   │   ├── LoadingSpinner.tsx
│   │   └── MarkdownContent.tsx
│   ├── context/
│   │   └── ThemeContext.tsx  # Dark/light mode provider
│   ├── hooks/
│   │   ├── useScrollPosition.ts
│   │   └── useBlogPosts.ts   # Blog data fetching hooks
│   ├── pages/                # Route-level components
│   │   ├── Home.tsx         # Landing page
│   │   ├── Blog.tsx         # Blog listing page
│   │   ├── BlogPost.tsx     # Individual blog post page
│   │   ├── Privacy.tsx      # Privacy policy
│   │   └── Terms.tsx        # Terms of service
│   ├── utils/
│   │   └── seo.ts           # SEO helper functions and defaults
│   ├── data/
│   │   └── features.ts      # Static feature content data
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   ├── App.tsx              # Root component with routing
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles + Tailwind directives
├── index.html               # HTML entry point
├── package.json
├── tsconfig.json            # TypeScript config (src only)
├── tsconfig.node.json       # TypeScript config (vite config)
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind with custom colors
└── eslint.config.js         # ESLint flat config
```

---

## Build Commands

```bash
# Development
npm run dev              # Start Vite dev server with hot reload

# Production Build
npm run build            # Full production build:
                         # 1. npm run build-blog (compile markdown → JSON)
                         # 2. npx vite build (create optimized bundle)
                         # 3. npm run generate-sitemap (create sitemap.xml)

# Individual Build Steps
npm run build-blog       # Compile blog/ markdown files to public/blog-data/*.json
npm run generate-sitemap # Generate dist/sitemap.xml from routes + blog posts

# Quality
npm run lint             # Run ESLint on all source files
npm run preview          # Preview production build locally
```

---

## Architecture Details

### Routing
- Uses `BrowserRouter` from react-router-dom
- Routes defined in `src/App.tsx`:
  - `/` - Home (landing page)
  - `/blog` - Blog listing
  - `/blog/:slug` - Individual blog post
  - `/privacy` - Privacy policy
  - `/terms` - Terms of service
- Pages are lazy-loaded with `React.lazy()` for code splitting

### Theming
- Dark/light mode via Tailwind's `darkMode: 'class'` strategy
- Theme state managed in `ThemeContext.tsx`
- Persists to localStorage with key `"theme"`
- Respects system preference on first visit via `prefers-color-scheme`

### Blog System
1. Write posts as Markdown files in `/blog/` directory
2. Frontmatter format:
   ```yaml
   ---
   title: Post Title
   excerpt: Brief description
   date: 2026-01-15
   author: Author Name
   tags: [tag1, tag2]
   readTime: 5 min read
   image: /blog-images/image.jpg (optional)
   ---
   ```
3. Run `npm run build-blog` to compile to JSON
4. Posts served via `fetch()` from `/blog-data/*.json`

### SEO
- `SEO.tsx` component manages `<head>` meta tags dynamically
- Uses `react-helmet-async` pattern (manual DOM manipulation)
- Each page should include `<SEO ... />` component with:
  - `title`, `description`, `keywords`
  - Optional: `image`, `url`, `type`, `noindex`
- Sitemap auto-generated with static routes + blog posts

---

## Code Style Guidelines

### TypeScript
- Strict mode enabled (`strict: true` in tsconfig.json)
- All components must have explicit return types when exported
- Use `@/` path alias for imports from `src/` directory
- No unused locals/parameters allowed (enforced by compiler)

### React
- Functional components with hooks only
- Custom hooks for shared logic (see `src/hooks/`)
- Context providers for global state (theme only)
- Lazy loading for all page components

### Styling
- Tailwind CSS utility classes exclusively
- Custom colors defined in `tailwind.config.js`:
  - `primary` (indigo): Brand color, CTAs, links
  - `accent` (teal): Highlights, success states
- Dark mode variants: `dark:bg-gray-900`, `dark:text-white`
- Animation classes available: `animate-fade-in`, `animate-slide-up`

### Component Patterns
```typescript
// Props interface
interface Props {
  title: string;
  variant?: 'primary' | 'accent';
}

// Named export for pages
export function PageName() { }

// Default export for components
export function ComponentName() { }
```

---

## Testing

**No automated tests are currently configured.** The project relies on:
- ESLint for code quality
- TypeScript for type checking
- Manual testing in browser
- Build verification (`npm run build` must succeed)

---

## Deployment

### Build Output
- Static files generated in `dist/` directory
- Base URL: https://scandocpro.com

### Recommended Platforms
1. **Cloudflare Pages** (current recommendation)
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node.js version: 18+

2. **Vercel**
   ```bash
   npm i -g vercel
   vercel --prod
   ```

3. **Netlify**
   - Build command: `npm run build`
   - Publish directory: `dist`

### Post-Deployment Verification
- Check sitemap.xml at `/sitemap.xml`
- Verify robots.txt at `/robots.txt`
- Test dark mode toggle
- Verify blog posts load correctly

---

## Security Considerations

- No server-side code - static site only
- No sensitive data in repository
- PostHog analytics loaded via CDN (privacy-focused)
- `rel="noopener noreferrer"` on all external links
- No user input forms (reduces attack surface)

---

## Adding New Pages

1. Create component in `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`:
   ```typescript
   const NewPage = lazy(() => import('@/pages/NewPage').then(m => ({ default: m.NewPage })));
   ```
3. Add `<Route path="/new-path" element={<NewPage />} />` in Routes
4. Add to sitemap in `scripts/generate-sitemap.js`:
   ```javascript
   { url: '/new-path', priority: 0.7, changefreq: 'weekly' }
   ```
5. Include `<SEO ... />` component in new page

---

## Dependencies Notes

### Production Dependencies
- `lucide-react`: Icon library (tree-shakeable)
- `posthog-js`: Analytics (loaded asynchronously)
- `react`, `react-dom`: Core framework
- `react-router-dom`: Client-side routing

### Development Dependencies
- `@vitejs/plugin-react`: Fast Refresh support
- `typescript-eslint`: Type-aware linting
- `autoprefixer`, `postcss`: CSS processing

---

## Common Issues

1. **Blog posts not updating**: Must run `npm run build-blog` after editing markdown files
2. **Sitemap 404**: Ensure `npm run generate-sitemap` runs after Vite build
3. **TypeScript path alias errors**: Check `vite.config.ts` resolve.alias configuration
4. **Dark mode flash**: Normal behavior - theme detected after hydration

---

## License

© 2026 4AI Info Tech. All rights reserved.
