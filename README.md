# ScanDocPro Landing Page

A modern, enterprise-grade landing page for ScanDocPro - the AI-powered document scanner. Built with Vite + React + TypeScript + Tailwind CSS.

![ScanDocPro](https://img.shields.io/badge/ScanDocPro-AI%20Scanner-primary)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-teal)

---

## ✨ Features

- **🌓 Dark/Light Mode** - Automatic theme detection with manual toggle
- **📱 Responsive Design** - Mobile-first approach, works on all devices
- **📝 Blog System** - Markdown-based blog with automatic sitemap generation
- **🔍 SEO Optimized** - Meta tags, Open Graph, structured data
- **🗺️ Sitemap Generation** - Automatic XML sitemap for search engines
- **⚡ Fast Performance** - Vite-powered development and optimized builds
- **🔒 Privacy Focused** - No external tracking, privacy-first approach
- **♿ Accessible** - ARIA labels, keyboard navigation, focus management

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd scandocpro-landing

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development

```bash
npm run dev      # Start dev server with hot reload
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Build Scripts

```bash
npm run build           # Full production build
npm run build-blog      # Compile blog posts to JSON
npm run generate-sitemap # Create sitemap.xml
```

---

## 📁 Project Structure

```
.
├── blog/                      # Markdown blog posts
│   ├── welcome-to-scandocpro.md
│   ├── ocr-technology-explained.md
│   └── ...
├── public/
│   ├── blog-data/            # Generated blog JSON files
│   ├── blog-images/          # Blog post images
│   ├── favicon.svg
│   └── robots.txt
├── scripts/
│   ├── build-blog.cjs        # Blog compilation script
│   └── generate-sitemap.js   # Sitemap generator
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── SEO.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── PhoneMockup.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── BlogCard.tsx
│   │   └── ...
│   ├── context/
│   │   └── ThemeContext.tsx  # Dark/light mode provider
│   ├── hooks/
│   │   ├── useScrollPosition.ts
│   │   └── useBlogPosts.ts
│   ├── pages/
│   │   ├── Home.tsx          # Landing page
│   │   ├── Blog.tsx          # Blog listing
│   │   ├── BlogPost.tsx      # Individual blog post
│   │   ├── Privacy.tsx       # Privacy policy
│   │   └── Terms.tsx         # Terms of service
│   ├── utils/
│   │   └── seo.ts            # SEO helper functions
│   ├── data/
│   │   └── features.ts       # Static content data
│   ├── types/
│   │   └── index.ts          # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🎨 Design System

### Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary | `#4F46E5` | `#818CF8` | Buttons, links, accents |
| Accent | `#14B8A6` | `#2DD4BF` | Highlights, success states |
| Background | `#FFFFFF` | `#111827` | Page background |
| Surface | `#F9FAFB` | `#1F2937` | Cards, sections |
| Text | `#111827` | `#F9FAFB` | Primary text |
| Muted | `#6B7280` | `#9CA3AF` | Secondary text |

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: 600-800 weight
- **Body**: 400-500 weight
- **Scale**: Major Third (1.250)

---

## 📝 Blog System

### Creating a Blog Post

1. Create a new `.md` file in the `/blog` directory
2. Add frontmatter at the top:

```markdown
---
title: Your Post Title
excerpt: Brief description for preview
date: 2026-01-15
author: Your Name
tags: [tag1, tag2]
readTime: 5 min read
image: /blog-images/your-image.jpg (optional)
---

Your markdown content here...
```

3. Run `npm run build-blog` to compile
4. The post will be available at `/blog/your-post-slug`

### Markdown Support

- Headers (H1-H3)
- Bold and italic text
- Lists (ordered/unordered)
- Links
- Basic formatting

---

## 🔍 SEO

### Automatic Meta Tags

Each page includes:
- Title and description
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Keywords

### Sitemap

Auto-generated at `/sitemap.xml` including:
- Static pages (Home, Blog, Privacy, Terms)
- All blog posts with lastmod dates

### robots.txt

Configured to allow all crawlers with sitemap reference.

---

## 🌙 Dark Mode

### Features

- Automatic system preference detection
- Manual toggle in navigation
- Persistent preference (localStorage)
- Smooth transitions between themes

### Implementation

Uses Tailwind's `darkMode: 'class'` strategy with a React Context provider.

---

## 🚀 Deployment

### Cloudflare Pages (Recommended)

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Build output: `dist`
4. Environment: `Node.js 18`

### Vercel

```bash
npm i -g vercel
vercel --prod
```

### Netlify

Connect repository with build settings:
- Build command: `npm run build`
- Publish directory: `dist`

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your static host
```

---

## 🔧 Customization

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    600: '#your-color',
  },
  accent: {
    500: '#your-accent',
  },
}
```

### Adding Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add to sitemap in `scripts/generate-sitemap.js`

### Modifying Content

Update static data in:
- `src/data/features.ts` - Feature cards
- `src/pages/Home.tsx` - Landing page sections
- `blog/*.md` - Blog posts

---

## 📄 License

© 2026 4AI Info Tech All rights reserved.

---

Made with ❤️ in Ankara
