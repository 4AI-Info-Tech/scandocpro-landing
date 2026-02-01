import { Play } from 'lucide-react';

interface AppBadgeProps {
  store: 'apple' | 'google';
  disabled?: boolean;
}

// Official Apple logo SVG
const AppleLogo = () => (
  <svg className="w-6 h-6" viewBox="0 0 814 1000" fill="currentColor">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.1 784.2 0 649.6 0 520.8c0-198.9 129.2-304.3 256.4-304.3 67.5 0 123.7 44.2 166.1 44.2 40 0 102.6-46.6 176.2-46.6 28.5 0 130.9 2.5 189.4 99.8zM571.2 104c36.4-43.8 61-104.4 61-165.1 0-8.5-.6-17.2-1.9-24.2-58.3 2.2-127.1 38.9-168.5 87.5-33.6 38.9-65.3 100.2-65.3 161.9 0 9.4 1.6 18.8 1.9 21.6 3.7.6 9.7 1.3 15.7 1.3 52.3 0 117.5-35.2 157.1-83z"/>
  </svg>
);

export function AppBadge({ store, disabled = true }: AppBadgeProps) {
  const isApple = store === 'apple';
  
  const content = (
    <>
      {isApple ? <AppleLogo /> : <Play className="w-6 h-6" />}
      <div className="text-left">
        <div className="text-xs opacity-80">
          {disabled ? 'Coming Soon' : 'Download on'}
        </div>
        <div className="text-sm font-semibold">
          {isApple ? 'App Store' : 'Google Play'}
        </div>
      </div>
    </>
  );

  if (disabled) {
    return (
      <span className="inline-flex items-center space-x-3 px-6 py-3 rounded-xl bg-gray-900 dark:bg-gray-800 text-white opacity-60 cursor-not-allowed select-none">
        {content}
      </span>
    );
  }

  return (
    <a
      href={isApple ? 'https://apps.apple.com/app/scandocpro' : 'https://play.google.com/store/apps/details?id=com.fourai.scandocpro'}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-3 px-6 py-3 rounded-xl bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
    >
      {content}
    </a>
  );
}
