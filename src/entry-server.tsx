import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import AppShell from '@/App';
import { PageDataProvider, type PageData } from '@/context/PageDataContext';
import type { BlogPost, SEOProps } from '@/types';
import {
  getBlogPostSEO,
  getBlogSEO,
  getHomeSEO,
  getPrivacySEO,
  getTermsSEO,
  renderSEOHead,
} from '@/utils/seo';

interface PrerenderPage {
  path: string;
  template: 'index.html' | 'blog.html' | 'privacy.html' | 'terms.html';
  seo: SEOProps;
  initialData?: PageData;
}

export function renderApp(url: string, initialData: PageData = {}): string {
  return renderToString(
    <PageDataProvider initialData={initialData}>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </PageDataProvider>
  );
}

export function getPrerenderPages(posts: BlogPost[]): PrerenderPage[] {
  const pages: PrerenderPage[] = [
    {
      path: '/',
      template: 'index.html',
      seo: getHomeSEO(),
    },
    {
      path: '/blog/',
      template: 'blog.html',
      seo: getBlogSEO(),
      initialData: { blogPosts: posts },
    },
    {
      path: '/privacy/',
      template: 'privacy.html',
      seo: getPrivacySEO(),
    },
    {
      path: '/terms/',
      template: 'terms.html',
      seo: getTermsSEO(),
    },
  ];

  posts.forEach((post) => {
    pages.push({
      path: `/blog/${post.slug}/`,
      template: 'blog.html',
      seo: getBlogPostSEO(post),
      initialData: { blogPost: post },
    });
  });

  return pages;
}

export { renderSEOHead };
