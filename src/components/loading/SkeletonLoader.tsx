import React from 'react';

interface SkeletonLoaderProps {
  type?: 'card' | 'text' | 'image' | 'full-page' | 'hero';
  count?: number;
  className?: string;
}

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 h-48 rounded-lg mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded w-3/4"></div>
      <div className="h-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded w-5/6"></div>
      <div className="h-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded w-4/6"></div>
    </div>
  </div>
);

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className = '' 
}) => (
  <div className={`space-y-3 animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div 
        key={i} 
        className="h-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded"
        style={{ width: `${100 - i * 15}%` }}
      ></div>
    ))}
  </div>
);

export const SkeletonImage: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="w-full h-64 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg"></div>
  </div>
);

const SkeletonHero: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse space-y-8 ${className}`}>
    <div className="space-y-4">
      <div className="h-16 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded w-3/4"></div>
      <div className="h-8 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded w-1/2"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-32 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded"></div>
          <div className="h-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded"></div>
          <div className="h-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  </div>
);

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  type = 'card', 
  count = 3, 
  className = '' 
}) => {
  const baseContent = () => {
    switch (type) {
      case 'hero':
        return <SkeletonHero className={className} />;
      case 'image':
        return <SkeletonImage className={className} />;
      case 'text':
        return <SkeletonText lines={5} className={className} />;
      case 'full-page':
        return (
          <div className={`space-y-8 ${className}`}>
            <SkeletonHero />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        );
      case 'card':
      default:
        return (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
            {Array.from({ length: count }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        );
    }
  };

  return baseContent();
};

export default SkeletonLoader;
