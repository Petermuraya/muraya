import { useEffect } from 'react';
import { performanceMonitor } from '@/services/performanceMonitor';

export const useServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });

          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker ready, prompt user
                  console.log('New version available! Refresh to update.');
                }
              });
            }
          });

          console.log('Service Worker registered successfully');
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      });
    }
  }, []);
};

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Log performance metrics when page loads
    const handleLoad = () => {
      setTimeout(() => {
        const report = performanceMonitor.logReport();
        
        // Send metrics to analytics if needed
        if (window.gtag) {
          window.gtag('event', 'page_timing', {
            page_load_time: report.pageLoadMetrics?.totalPageLoadTime,
            resources_count: report.resourceMetrics?.totalResources,
            lcp: report.webVitals?.lcp,
            cls: report.webVitals?.cls,
          });
        }
      }, 0);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return performanceMonitor;
};

export default useServiceWorker;
