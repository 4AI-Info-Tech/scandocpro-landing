import { PageDataContext, type PageData } from '@/context/PageDataStore';

declare global {
  interface Window {
    __SCANDOCPRO_PAGE_DATA__?: PageData;
  }
}

interface PageDataProviderProps {
  children: React.ReactNode;
  initialData?: PageData;
}

function getClientPageData(): PageData {
  if (typeof window === 'undefined') {
    return {};
  }

  return window.__SCANDOCPRO_PAGE_DATA__ ?? {};
}

export function PageDataProvider({ children, initialData }: PageDataProviderProps) {
  const value = initialData ?? getClientPageData();
  return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>;
}
