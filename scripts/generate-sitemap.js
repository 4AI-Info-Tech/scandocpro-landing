import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://scandocpro.com';
const TODAY = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/blog', priority: 0.9, changefreq: 'daily' },
  { url: '/privacy', priority: 0.5, changefreq: 'monthly' },
  { url: '/terms', priority: 0.5, changefreq: 'monthly' },
];

// Read blog posts
function getBlogPosts() {
  const blogDir = path.join(__dirname, '..', 'blog');
  const posts = [];
  
  if (!fs.existsSync(blogDir)) {
    return posts;
  }
  
  const files = fs.readdirSync(blogDir);
  
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const slug = file.replace('.md', '');
      const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
      const dateMatch = content.match(/date:\s*(.+)/);
      const date = dateMatch ? dateMatch[1].trim() : TODAY;
      
      posts.push({
        url: `/blog/${slug}`,
        priority: 0.8,
        changefreq: 'weekly',
        lastmod: date,
      });
    }
  });
  
  return posts;
}

function generateSitemap() {
  const blogPosts = getBlogPosts();
  const allRoutes = [...staticRoutes, ...blogPosts];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${route.lastmod || TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const distPath = path.join(__dirname, '..', 'dist');
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }
  
  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully!');
  console.log(`📄 ${allRoutes.length} URLs included`);
}

generateSitemap();
