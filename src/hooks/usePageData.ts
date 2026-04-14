import { useContext } from 'react';
import { PageDataContext, type PageData } from '@/context/PageDataStore';

export function usePageData(): PageData {
  return useContext(PageDataContext);
}
