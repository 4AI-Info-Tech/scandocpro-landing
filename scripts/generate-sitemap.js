import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://scandocpro.com';
const TODAY = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/blog/', priority: 0.9, changefreq: 'weekly' },
];

function getBlogPosts() {
  const blogIndexPath = path.join(__dirname, '..', 'public', 'blog-data', 'index.json');
  if (!fs.existsSync(blogIndexPath)) {
    return [];
  }

  const posts = JSON.parse(fs.readFileSync(blogIndexPath, 'utf-8'));
  return posts.map((post) => ({
    url: `/blog/${post.slug}/`,
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: post.date || TODAY,
  }));
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
