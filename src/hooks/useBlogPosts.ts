import { useState, useEffect } from 'react';
import type { BlogPost } from '@/types';
import { usePageData } from '@/hooks/usePageData';

const BLOG_API_BASE = '/blog-data';

interface UseBlogPostsResult {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
}

function normalizeTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.filter((tag): tag is string => typeof tag === 'string');
  }

  if (typeof tags !== 'string') {
    return [];
  }

  const trimmed = tags.trim();
  if (!trimmed) {
    return [];
  }

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }

  return [trimmed];
}

function normalizeBlogPost(rawPost: BlogPost): BlogPost {
  return {
    ...rawPost,
    tags: normalizeTags(rawPost.tags),
  };
}

function normalizeBlogPosts(rawPosts: BlogPost[]): BlogPost[] {
  return rawPosts.map(normalizeBlogPost);
}

export function useBlogPosts(): UseBlogPostsResult {
  const { blogPosts } = usePageData();
  const [posts, setPosts] = useState<BlogPost[]>(() => normalizeBlogPosts(blogPosts ?? []));
  const [loading, setLoading] = useState(() => blogPosts === undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (blogPosts !== undefined) {
      setPosts(normalizeBlogPosts(blogPosts));
      setLoading(false);
      return;
    }

    let cancelled = false;

    fetch(`${BLOG_API_BASE}/index.json`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!cancelled) {
          setPosts(normalizeBlogPosts(data));
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load posts');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [blogPosts]);

  return { posts, loading, error };
}

interface UseBlogPostResult {
  post: BlogPost | null;
  loading: boolean;
  error: string | null;
}

export function useBlogPost(slug: string | undefined): UseBlogPostResult {
  const { blogPost } = usePageData();
  const [post, setPost] = useState<BlogPost | null>(() => (blogPost ? normalizeBlogPost(blogPost) : null));
  const [loading, setLoading] = useState(() => blogPost === undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    if (blogPost && blogPost.slug === slug) {
      setPost(normalizeBlogPost(blogPost));
      setLoading(false);
      return;
    }

    let cancelled = false;

    fetch(`${BLOG_API_BASE}/${encodeURIComponent(slug)}.json`)
      .then(res => {
        if (!res.ok) throw new Error(res.status === 404 ? 'Post not found' : `HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!cancelled) {
          setPost(normalizeBlogPost(data));
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load post');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [blogPost, slug]);

  return { post, loading, error };
}
