import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://scandocpro.com';
const TODAY = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { url: '/', priority: 1.0, changefreq: 'weekly', file: 'index.html' },
  { url: '/blog', priority: 0.9, changefreq: 'daily', file: 'blog.html' },
  { url: '/privacy', priority: 0.5, changefreq: 'monthly', file: 'privacy.html' },
  { url: '/terms', priority: 0.5, changefreq: 'monthly', file: 'terms.html' },
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

// Copy HTML files to proper directory structure
function createPageStructure(blogPosts, distPath) {
  const indexPath = path.join(distPath, 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.warn('⚠️  index.html not found in dist folder');
    return;
  }
  
  const indexContent = fs.readFileSync(indexPath, 'utf-8');
  
  // Move blog.html to blog/index.html
  const blogHtmlPath = path.join(distPath, 'blog.html');
  const blogDir = path.join(distPath, 'blog');
  if (fs.existsSync(blogHtmlPath)) {
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }
    fs.renameSync(blogHtmlPath, path.join(blogDir, 'index.html'));
    console.log('  📄 /blog/index.html');
  }
  
  // Move privacy.html to privacy/index.html
  const privacyHtmlPath = path.join(distPath, 'privacy.html');
  const privacyDir = path.join(distPath, 'privacy');
  if (fs.existsSync(privacyHtmlPath)) {
    if (!fs.existsSync(privacyDir)) {
      fs.mkdirSync(privacyDir, { recursive: true });
    }
    fs.renameSync(privacyHtmlPath, path.join(privacyDir, 'index.html'));
    console.log('  📄 /privacy/index.html');
  }
  
  // Move terms.html to terms/index.html
  const termsHtmlPath = path.join(distPath, 'terms.html');
  const termsDir = path.join(distPath, 'terms');
  if (fs.existsSync(termsHtmlPath)) {
    if (!fs.existsSync(termsDir)) {
      fs.mkdirSync(termsDir, { recursive: true });
    }
    fs.renameSync(termsHtmlPath, path.join(termsDir, 'index.html'));
    console.log('  📄 /terms/index.html');
  }
  
  // Create blog post pages
  blogPosts.forEach(post => {
    const postDir = path.join(distPath, 'blog', post.url.replace('/blog/', ''));
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(postDir, 'index.html'), indexContent);
    console.log(`  📄 ${post.url}/index.html`);
  });
  
  console.log(`✅ Created ${blogPosts.length + 3} page directories`);
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
  
  // Create page structure
  createPageStructure(blogPosts, distPath);
}

generateSitemap();
