import { useEffect, useRef } from 'react';
import type { SEOProps } from '@/types';
import { generateMetaTags, getSEOManagedSelector } from '@/utils/seo';

export function SEO(props: SEOProps) {
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const metaTags = generateMetaTags(props);
    document.title = metaTags.title;

    document.querySelectorAll(getSEOManagedSelector()).forEach(el => el.remove());
    elementsRef.current = [];

    // Create new meta tags
    metaTags.meta.forEach(tag => {
      const el = document.createElement('meta');
      el.setAttribute('data-seo-managed', 'true');
      if ('property' in tag && tag.property) {
        el.setAttribute('property', tag.property);
      } else if ('name' in tag && tag.name) {
        el.setAttribute('name', tag.name);
      }
      el.setAttribute('content', tag.content);
      document.head.appendChild(el);
      elementsRef.current.push(el);
    });

    // Canonical link
    const canonical = document.createElement('link');
    canonical.setAttribute('data-seo-managed', 'true');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', metaTags.canonical);
    document.head.appendChild(canonical);
    elementsRef.current.push(canonical);

    metaTags.schema.forEach((entry) => {
      const schemaTag = document.createElement('script');
      schemaTag.setAttribute('data-seo-managed', 'true');
      schemaTag.setAttribute('type', 'application/ld+json');
      schemaTag.textContent = JSON.stringify(entry);
      document.head.appendChild(schemaTag);
      elementsRef.current.push(schemaTag);
    });

    return () => {
      elementsRef.current.forEach(el => el.remove());
      elementsRef.current = [];
    };
  }, [props]);

  return null;
}
