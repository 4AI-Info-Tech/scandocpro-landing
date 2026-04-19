import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');
const serverEntryPath = path.join(distDir, 'server', 'entry-server.js');
const blogIndexPath = path.join(distDir, 'blog-data', 'index.json');

function stripSeoHead(html) {
  return html
    .replace(/<meta[^>]*data-seo-managed="true"[^>]*>/gi, '')
    .replace(/<link[^>]*data-seo-managed="true"[^>]*>/gi, '')
    .replace(/<script[^>]*data-seo-managed="true"[\s\S]*?<\/script>/gi, '')
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name="description"[\s\S]*?>/gi, '')
    .replace(/<meta\s+name="robots"[\s\S]*?>/gi, '')
    .replace(/<link\s+rel="canonical"[\s\S]*?>/gi, '');
}

function serializePageData(initialData) {
  if (!initialData || Object.keys(initialData).length === 0) {
    return '';
  }

  const payload = JSON.stringify(initialData).replace(/</g, '\\u003c');
  return `<script>window.__SCANDOCPRO_PAGE_DATA__=${payload};</script>`;
}

function injectRenderedApp(template, appHtml, seoHead, initialData) {
  const withoutSeo = stripSeoHead(template);
  const withHead = withoutSeo.replace('</head>', `${seoHead}\n</head>`);
  const withApp = withHead.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  const dataScript = serializePageData(initialData);

  if (!dataScript) {
    return withApp;
  }

  return withApp.replace('<script type="module"', `${dataScript}\n    <script type="module"`);
}

function getOutputPath(routePath) {
  if (routePath === '/') {
    return path.join(distDir, 'index.html');
  }

  const segments = routePath.replace(/^\/|\/$/g, '').split('/');
  return path.join(distDir, ...segments, 'index.html');
}

function ensureDirectory(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

async function prerender() {
  if (!fs.existsSync(serverEntryPath)) {
    throw new Error(`SSR entry not found at ${serverEntryPath}`);
  }

  if (!fs.existsSync(blogIndexPath)) {
    throw new Error(`Blog index not found at ${blogIndexPath}`);
  }

  const posts = JSON.parse(fs.readFileSync(blogIndexPath, 'utf-8'));
  const { getPrerenderPages, renderApp, renderSEOHead } = await import(pathToFileURL(serverEntryPath).href);
  const pages = getPrerenderPages(posts);
  const templateCache = new Map();

  pages.forEach((page) => {
    if (templateCache.has(page.template)) {
      return;
    }

    const templatePath = path.join(distDir, page.template);
    templateCache.set(page.template, fs.readFileSync(templatePath, 'utf-8'));
  });

  pages.forEach((page) => {
    const template = templateCache.get(page.template);
    const appHtml = renderApp(page.path, page.initialData);
    const seoHead = renderSEOHead(page.seo);
    const outputPath = getOutputPath(page.path);
    const html = injectRenderedApp(template, appHtml, seoHead, page.initialData);

    ensureDirectory(outputPath);
    fs.writeFileSync(outputPath, html);
    console.log(`✅ Prerendered ${page.path}`);
  });

  ['blog.html', 'privacy.html', 'terms.html'].forEach((fileName) => {
    const templatePath = path.join(distDir, fileName);
    if (fs.existsSync(templatePath)) {
      fs.rmSync(templatePath);
    }
  });

  const serverDir = path.join(distDir, 'server');
  if (fs.existsSync(serverDir)) {
    fs.rmSync(serverDir, { recursive: true, force: true });
  }
}

prerender();
