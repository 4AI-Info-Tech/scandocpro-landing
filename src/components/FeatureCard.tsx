import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: 'primary' | 'accent';
}

export function FeatureCard({ icon: Icon, title, description, variant = 'primary' }: FeatureCardProps) {
  const bgClass = variant === 'primary' 
    ? 'bg-primary-100 dark:bg-primary-900/30' 
    : 'bg-accent-100 dark:bg-accent-900/30';
  
  const iconClass = variant === 'primary'
    ? 'text-primary-600 dark:text-primary-400'
    : 'text-accent-600 dark:text-accent-400';

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-300">
      <div className={`w-12 h-12 ${bgClass} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-6 h-6 ${iconClass}`} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
