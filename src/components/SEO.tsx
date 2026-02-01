import { useEffect, useRef } from 'react';
import type { SEOProps } from '@/types';
import { generateMetaTags } from '@/utils/seo';

export function SEO(props: SEOProps) {
  const metaRef = useRef<HTMLMetaElement[]>([]);

  useEffect(() => {
    const metaTags = generateMetaTags(props);
    document.title = metaTags.title;

    // Cleanup old meta tags
    metaRef.current.forEach(el => el.remove());
    metaRef.current = [];

    // Create new meta tags
    metaTags.meta.forEach(tag => {
      const el = document.createElement('meta');
      if ('property' in tag && tag.property) {
        el.setAttribute('property', tag.property);
      } else if ('name' in tag && tag.name) {
        el.setAttribute('name', tag.name);
      }
      el.setAttribute('content', tag.content);
      document.head.appendChild(el);
      metaRef.current.push(el);
    });

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', metaTags.link[0].href);

    return () => {
      metaRef.current.forEach(el => el.remove());
      metaRef.current = [];
    };
  }, [props]);

  return null;
}
