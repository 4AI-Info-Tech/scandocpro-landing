import { createContext } from 'react';
import type { BlogPost } from '@/types';

export interface PageData {
  blogPosts?: BlogPost[];
  blogPost?: BlogPost;
}

export const PageDataContext = createContext<PageData>({});
