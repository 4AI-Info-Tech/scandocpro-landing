import type { SEOProps } from '@/types';
import type { BlogPost } from '@/types';
import type { ProgrammaticHub, ProgrammaticPage } from '@/types';
import { getProgrammaticFamilyLabel } from '@/data/programmaticPages';

const DEFAULT_SEO = {
  siteName: 'ScanDocPro',
  siteUrl: 'https://scandocpro.com',
  twitterHandle: '@scandocpro',
  defaultImage: 'https://scandocpro.com/og-image.svg',
};

const SEO_MANAGED_ATTR = 'data-seo-managed';

export const siteConfig = {
  ...DEFAULT_SEO,
  companyName: '4AI Info Tech',
  defaultImagePath: '/og-image.svg',
};

interface PageSEOOptions {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: string;
  keywords?: string[];
  noindex?: boolean;
  schema?: Array<Record<string, unknown>>;
}

interface MetaTagDefinition {
  name?: string;
  property?: string;
  content: string;
}

interface GeneratedMetaTags {
  title: string;
  canonical: string;
  meta: MetaTagDefinition[];
  schema: Array<Record<string, unknown>>;
}

export function normalizePath(path: string): string {
  if (!path || path === '/') {
    return '/';
  }

  return path.endsWith('/') ? path : `${path}/`;
}

export function buildAbsoluteUrl(path: string): string {
  return `${DEFAULT_SEO.siteUrl}${normalizePath(path)}`;
}

function buildImageUrl(image?: string): string {
  if (!image) {
    return DEFAULT_SEO.defaultImage;
  }

  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  return `${DEFAULT_SEO.siteUrl}${image.startsWith('/') ? image : `/${image}`}`;
}

function buildOrganizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.companyName,
    url: siteConfig.siteUrl,
    brand: siteConfig.siteName,
    logo: siteConfig.defaultImage,
  };
}

function buildSoftwareApplicationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.siteName,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'iOS, Android',
    description: 'AI-powered mobile document scanner with OCR, smart enhancement, and PDF export.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: buildAbsoluteUrl('/'),
  };
}

function buildBlogSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${siteConfig.siteName} Blog`,
    description: 'Tips, tutorials, and insights about document scanning, OCR technology, and mobile productivity.',
    url: buildAbsoluteUrl('/blog'),
    publisher: {
      '@type': 'Organization',
      name: siteConfig.companyName,
      url: siteConfig.siteUrl,
    },
  };
}

function buildBlogPostSchema(post: BlogPost): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: buildAbsoluteUrl(`/blog/${post.slug}`),
    image: buildImageUrl(post.image),
    author: {
      '@type': post.author.toLowerCase().includes('team') ? 'Organization' : 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.companyName,
      url: siteConfig.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.defaultImage,
      },
    },
  };
}

function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.path),
    })),
  };
}

function buildFAQSchema(faq: ProgrammaticPage['faq'] | ProgrammaticHub['faq']): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

function buildHowToSchema(page: ProgrammaticPage): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: page.title,
    description: page.metaDescription,
    step: page.workflowSteps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `Step ${index + 1}`,
      text: step,
    })),
    totalTime: 'PT5M',
    tool: page.recommendedFeatures.map((feature) => ({
      '@type': 'HowToTool',
      name: feature,
    })),
  };
}

function buildWebPageSchema(path: string, name: string, description: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: buildAbsoluteUrl(path),
    isPartOf: siteConfig.siteUrl,
  };
}

function buildCollectionPageSchema(hub: ProgrammaticHub): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hub.title,
    description: hub.metaDescription,
    url: buildAbsoluteUrl(hub.url),
    isPartOf: siteConfig.siteUrl,
  };
}

export function createPageSEO({
  path,
  title,
  description,
  image,
  type = 'website',
  keywords = [],
  noindex = false,
  schema = [],
}: PageSEOOptions): SEOProps {
  return {
    title,
    description,
    image: buildImageUrl(image),
    url: buildAbsoluteUrl(path),
    type,
    keywords,
    noindex,
    schema,
  };
}

export function getHomeSEO(): SEOProps {
  return createPageSEO({
    path: '/',
    title: 'ScanDocPro - AI Document Scanner',
    description: 'Transform paper into professional PDFs instantly. AI-powered scanning, OCR, and document enhancement for mobile teams.',
    keywords: defaultKeywords,
    schema: [buildOrganizationSchema(), buildSoftwareApplicationSchema()],
  });
}

export function getBlogSEO(): SEOProps {
  return createPageSEO({
    path: '/blog',
    title: 'ScanDocPro Blog',
    description: 'Tips, tutorials, and insights about document scanning, OCR technology, and mobile productivity.',
    keywords: ['document scanning', 'OCR', 'mobile productivity', 'PDF scanning tips'],
    schema: [buildBlogSchema()],
  });
}

export function getPrivacySEO(): SEOProps {
  return createPageSEO({
    path: '/privacy',
    title: 'Privacy Policy',
    description: 'Learn how ScanDocPro protects your privacy and handles your data with industry-leading security practices.',
    noindex: true,
  });
}

export function getTermsSEO(): SEOProps {
  return createPageSEO({
    path: '/terms',
    title: 'Terms of Service',
    description: 'Terms and conditions for using ScanDocPro. Please read carefully before using our services.',
    noindex: true,
  });
}

export function getBlogPostSEO(post: BlogPost): SEOProps {
  return createPageSEO({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt,
    image: post.image,
    type: 'article',
    keywords: post.tags,
    schema: [buildBlogPostSchema(post)],
  });
}

export function getProgrammaticHubSEO(hub: ProgrammaticHub): SEOProps {
  const familyLabel = getProgrammaticFamilyLabel(hub.family);

  return createPageSEO({
    path: hub.url,
    title: hub.title,
    description: hub.metaDescription,
    keywords: [
      hub.targetKeyword,
      `${familyLabel.toLowerCase()} scanner app`,
      'document scanner app',
      'ocr scanner app',
      'mobile document workflow',
    ],
    schema: [
      buildCollectionPageSchema(hub),
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: familyLabel, path: hub.url },
      ]),
      buildFAQSchema(hub.faq),
    ],
  });
}

export function getProgrammaticPageSEO(page: ProgrammaticPage): SEOProps {
  const familyLabel = getProgrammaticFamilyLabel(page.family);
  const schema: Array<Record<string, unknown>> = [
    buildWebPageSchema(page.url, page.title, page.metaDescription),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: familyLabel, path: `/${page.family}/` },
      { name: page.title, path: page.url },
    ]),
  ];

  if (page.schemaType === 'HowTo') {
    schema.push(buildHowToSchema(page));
  }

  if (page.faq.length > 0) {
    schema.push(buildFAQSchema(page.faq));
  }

  return createPageSEO({
    path: page.url,
    title: page.title,
    description: page.metaDescription,
    keywords: [
      page.targetKeyword,
      ...page.recommendedFeatures.map((feature) => feature.toLowerCase()),
      'document scanner app',
      'ocr scanner app',
    ],
    schema,
  });
}

export function generateMetaTags({
  title,
  description,
  image = DEFAULT_SEO.defaultImage,
  url = DEFAULT_SEO.siteUrl,
  type = 'website',
  keywords = [],
  noindex = false,
  schema = [],
}: SEOProps) {
  const fullTitle = title === DEFAULT_SEO.siteName || title.includes(DEFAULT_SEO.siteName)
    ? title 
    : `${title} | ${DEFAULT_SEO.siteName}`;

  const meta: MetaTagDefinition[] = [
    { name: 'description', content: description },
    { name: 'keywords', content: keywords.join(', ') },
    
    // Open Graph
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:image', content: buildImageUrl(image) },
    { property: 'og:url', content: url },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: DEFAULT_SEO.siteName },
    
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: buildImageUrl(image) },
    { name: 'twitter:site', content: DEFAULT_SEO.twitterHandle },
    
    // Robots
    { name: 'robots', content: noindex ? 'noindex, follow' : 'index, follow' },
  ];

  return {
    title: fullTitle,
    canonical: url,
    meta,
    schema,
  } satisfies GeneratedMetaTags;
}

function escapeAttribute(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function renderSEOHead(props: SEOProps): string {
  const metaTags = generateMetaTags(props);
  const metaHtml = metaTags.meta.map((tag) => {
    const attributes = tag.property
      ? `property="${escapeAttribute(tag.property)}"`
      : `name="${escapeAttribute(tag.name ?? '')}"`;

    return `<meta ${SEO_MANAGED_ATTR}="true" ${attributes} content="${escapeAttribute(tag.content)}" />`;
  }).join('\n');

  const schemaHtml = metaTags.schema.map((entry) => (
    `<script ${SEO_MANAGED_ATTR}="true" type="application/ld+json">${JSON.stringify(entry)}</script>`
  )).join('\n');

  return [
    `<title>${escapeAttribute(metaTags.title)}</title>`,
    metaHtml,
    `<link ${SEO_MANAGED_ATTR}="true" rel="canonical" href="${escapeAttribute(metaTags.canonical)}" />`,
    schemaHtml,
  ].filter(Boolean).join('\n');
}

export function getSEOManagedSelector(): string {
  return `[${SEO_MANAGED_ATTR}="true"]`;
}

export const defaultKeywords = [
  'document scanner app',
  'ai document scanner',
  'pdf scanner mobile',
  'ocr scanner app',
  'receipt scanner',
  'scan documents iphone',
  'scan documents android',
  'mobile scanner',
  'document scanning app',
  'best scanner app',
];
