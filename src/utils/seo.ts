import type { SEOProps } from '@/types';

const DEFAULT_SEO = {
  siteName: 'ScanDocPro',
  siteUrl: 'https://scandocpro.com',
  twitterHandle: '@scandocpro',
  defaultImage: 'https://scandocpro.com/og-image.jpg',
};

export function generateMetaTags({
  title,
  description,
  image = DEFAULT_SEO.defaultImage,
  url = DEFAULT_SEO.siteUrl,
  type = 'website',
  keywords = [],
  noindex = false,
}: SEOProps) {
  const fullTitle = title === DEFAULT_SEO.siteName 
    ? title 
    : `${title} | ${DEFAULT_SEO.siteName}`;

  return {
    title: fullTitle,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords.join(', ') },
      
      // Open Graph
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: DEFAULT_SEO.siteName },
      
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:site', content: DEFAULT_SEO.twitterHandle },
      
      // Robots
      { name: 'robots', content: noindex ? 'noindex, nofollow' : 'index, follow' },
      
      // Viewport & Theme
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'canonical', href: url },
    ],
  };
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
