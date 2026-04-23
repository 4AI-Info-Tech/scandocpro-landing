import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'src', 'data');
const publicDir = path.join(__dirname, '..', 'public');

const read = (file) => JSON.parse(fs.readFileSync(file, 'utf-8'));

const hubs = read(path.join(dataDir, 'programmatic-hubs.json'));
const families = {
  documents: read(path.join(dataDir, 'programmatic-documents.json')),
  solutions: read(path.join(dataDir, 'programmatic-solutions.json')),
  compare: read(path.join(dataDir, 'programmatic-compare.json')),
  integrations: read(path.join(dataDir, 'programmatic-integrations.json')),
  tools: read(path.join(dataDir, 'programmatic-tools.json')),
};

const blogIndexPath = path.join(publicDir, 'blog-data', 'index.json');
const blogPosts = fs.existsSync(blogIndexPath) ? read(blogIndexPath) : [];

const NAV_LINKS = ['/', '/documents/', '/solutions/', '/integrations/', '/tools/', '/compare/', '/blog/'];

const nodes = new Map();

function addNode(url, meta) {
  if (!nodes.has(url)) {
    nodes.set(url, { ...meta, outbound: [], inbound: new Set() });
  }
}

addNode('/', { kind: 'static', label: 'Home' });
addNode('/blog/', { kind: 'static', label: 'Blog index' });
addNode('/privacy/', { kind: 'static', label: 'Privacy' });
addNode('/terms/', { kind: 'static', label: 'Terms' });

blogPosts.forEach((post) => {
  addNode(`/blog/${post.slug}/`, { kind: 'blog', label: post.title });
});

hubs.forEach((hub) => {
  addNode(hub.url, { kind: 'hub', family: hub.family, label: hub.h1 });
});

Object.entries(families).forEach(([family, pages]) => {
  pages.forEach((page) => {
    const url = `/${family}/${page.slug}/`;
    addNode(url, { kind: 'page', family, slug: page.slug, label: page.name ?? page.competitorName ?? page.slug });
  });
});

function recordEdge(from, to) {
  const fromNode = nodes.get(from);
  if (!fromNode) return;
  fromNode.outbound.push(to);
  const toNode = nodes.get(to);
  if (toNode) toNode.inbound.add(from);
}

hubs.forEach((hub) => {
  hub.featuredUrls.forEach((to) => recordEdge(hub.url, to));
  hub.relatedFamilies.forEach((fam) => {
    const target = hubs.find((h) => h.family === fam);
    if (target) recordEdge(hub.url, target.url);
  });
  const pages = families[hub.family] ?? [];
  pages.forEach((page) => recordEdge(hub.url, `/${hub.family}/${page.slug}/`));
});

const BLOG_INDEX_URL = '/blog/';
blogPosts.forEach((post) => recordEdge(BLOG_INDEX_URL, `/blog/${post.slug}/`));

Object.entries(families).forEach(([family, pages]) => {
  pages.forEach((page) => {
    const from = `/${family}/${page.slug}/`;
    page.relatedUrls.forEach((to) => recordEdge(from, to));
  });
});

NAV_LINKS.forEach((to) => recordEdge('/', to));

const brokenEdges = [];
const orphans = [];
const hubOnlyInbound = [];
const inboundDist = { 0: 0, 1: 0, 2: 0, 3: 0, '4+': 0 };

for (const [url, node] of nodes.entries()) {
  node.outbound.forEach((to) => {
    if (!nodes.has(to)) brokenEdges.push({ from: url, to });
  });

  const inboundCount = node.inbound.size;
  if (inboundCount === 0) inboundDist[0] += 1;
  else if (inboundCount === 1) inboundDist[1] += 1;
  else if (inboundCount === 2) inboundDist[2] += 1;
  else if (inboundCount === 3) inboundDist[3] += 1;
  else inboundDist['4+'] += 1;

  if (url === '/') continue;

  if (inboundCount === 0 && node.kind !== 'static') {
    orphans.push(url);
  }

  if (
    node.kind === 'page' &&
    inboundCount > 0 &&
    [...node.inbound].every((from) => nodes.get(from)?.kind === 'hub' || from === '/')
  ) {
    hubOnlyInbound.push({ url, family: node.family, inboundFrom: [...node.inbound] });
  }
}

const toolPages = [...nodes.entries()].filter(([, n]) => n.family === 'tools' && n.kind === 'page');
const toolPagesNoInbound = toolPages.filter(([, n]) => n.inbound.size === 0);
const toolPagesOnlyFromHub = toolPages.filter(([, n]) => {
  if (n.inbound.size === 0) return false;
  return [...n.inbound].every((from) => nodes.get(from)?.kind === 'hub' || from === '/');
});

const reportLine = (label, value) => console.log(`${label.padEnd(42)} ${value}`);

console.log('\n=== Link audit ===\n');
reportLine('Total nodes in graph:', nodes.size);
reportLine('Hubs:', hubs.length);
reportLine('Programmatic pages:', Object.values(families).reduce((s, a) => s + a.length, 0));
reportLine('Blog posts:', blogPosts.length);

console.log('\nInbound-link distribution (non-home):');
Object.entries(inboundDist).forEach(([bucket, count]) => reportLine(`  ${bucket} inbound`, count));

console.log('\nBroken outbound edges:', brokenEdges.length);
brokenEdges.forEach((edge) => console.log(`  ${edge.from}  →  ${edge.to}  (404)`));

console.log('\nOrphans (0 inbound, non-static):', orphans.length);
orphans.forEach((url) => console.log(`  ${url}`));

console.log('\nPages whose only inbound is a hub:', hubOnlyInbound.length);
hubOnlyInbound.forEach((entry) => {
  console.log(`  ${entry.url}  [inbound from: ${entry.inboundFrom.join(', ')}]`);
});

console.log('\nTool-page inbound coverage:');
reportLine('  Tool pages total:', toolPages.length);
reportLine('  Tool pages with zero inbound:', toolPagesNoInbound.length);
reportLine('  Tool pages reached only from hub:', toolPagesOnlyFromHub.length);
toolPagesOnlyFromHub.forEach(([url]) => console.log(`    ${url}`));

console.log('\nTop 10 most-linked destinations (excluding /):');
const ranked = [...nodes.entries()]
  .filter(([url]) => url !== '/')
  .map(([url, n]) => ({ url, count: n.inbound.size }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 10);
ranked.forEach(({ url, count }) => reportLine(`  ${count}×`, url));

const hasIssues = brokenEdges.length > 0 || orphans.length > 0;
process.exit(hasIssues ? 1 : 0);
