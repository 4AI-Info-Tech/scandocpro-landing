import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://scandoc.pro';
const TODAY = new Date().toISOString().split('T')[0];
const PROGRAMMATIC_HUBS_PATH = path.join(__dirname, '..', 'src', 'data', 'programmatic-hubs.json');
const PROGRAMMATIC_DOCUMENTS_PATH = path.join(__dirname, '..', 'src', 'data', 'programmatic-documents.json');
const PROGRAMMATIC_SOLUTIONS_PATH = path.join(__dirname, '..', 'src', 'data', 'programmatic-solutions.json');
const PROGRAMMATIC_COMPARE_PATH = path.join(__dirname, '..', 'src', 'data', 'programmatic-compare.json');
const PROGRAMMATIC_INTEGRATIONS_PATH = path.join(__dirname, '..', 'src', 'data', 'programmatic-integrations.json');

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

function readJsonFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function getProgrammaticRoutes() {
  const hubs = readJsonFile(PROGRAMMATIC_HUBS_PATH);
  const documents = readJsonFile(PROGRAMMATIC_DOCUMENTS_PATH);
  const solutions = readJsonFile(PROGRAMMATIC_SOLUTIONS_PATH);
  const comparisons = readJsonFile(PROGRAMMATIC_COMPARE_PATH);
  const integrations = readJsonFile(PROGRAMMATIC_INTEGRATIONS_PATH);

  return [
    ...hubs.map((hub) => ({
      url: hub.url,
      priority: 0.85,
      changefreq: 'weekly',
      lastmod: TODAY,
    })),
    ...documents.map((page) => ({
      url: `/documents/${page.slug}/`,
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: TODAY,
    })),
    ...solutions.map((page) => ({
      url: `/solutions/${page.slug}/`,
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: TODAY,
    })),
    ...comparisons.map((page) => ({
      url: `/compare/${page.slug}/`,
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: TODAY,
    })),
    ...integrations.map((page) => ({
      url: `/integrations/${page.slug}/`,
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: TODAY,
    })),
  ];
}

function generateSitemap() {
  const blogPosts = getBlogPosts();
  const programmaticRoutes = getProgrammaticRoutes();
  const allRoutes = [...staticRoutes, ...blogPosts, ...programmaticRoutes];
  
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
