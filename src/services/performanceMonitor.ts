class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  private navigationStart = performance.now();

  recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(value);
  }

  measurePageLoad() {
    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigationTiming) {
      return {
        domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart,
        loadComplete: navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
        timeToFirstByte: navigationTiming.responseStart - navigationTiming.requestStart,
        totalPageLoadTime: navigationTiming.loadEventEnd - navigationTiming.fetchStart,
        dnsLookup: navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart,
        tcpConnection: navigationTiming.connectEnd - navigationTiming.connectStart,
        serverResponseTime: navigationTiming.responseEnd - navigationTiming.responseStart,
      };
    }

    return null;
  }

  measureWebVitals() {
    const vitals: any = {};

    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          vitals.lcp = lastEntry.renderTime || lastEntry.loadTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.log('LCP not supported');
      }

      // Cumulative Layout Shift
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              vitals.cls = clsValue;
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.log('CLS not supported');
      }

      // First Input Delay
      try {
        const fIDObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries() as any;
          entries.forEach((entry) => {
            vitals.fid = entry.processingDuration;
          });
        });
        fIDObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.log('FID not supported');
      }
    }

    return vitals;
  }

  measureResourceTiming() {
    const resourceTimings = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    const summary = {
      totalResources: resourceTimings.length,
      totalSize: resourceTimings.reduce((sum, r) => sum + (r.transferSize || 0), 0),
      averageLoadTime: resourceTimings.reduce((sum, r) => sum + r.duration, 0) / resourceTimings.length,
      slowestResource: resourceTimings.reduce((slowest, current) => 
        current.duration > slowest.duration ? current : slowest
      ),
      resourcesByType: {} as Record<string, any>,
    };

    resourceTimings.forEach((r) => {
      const type = r.initiatorType || 'other';
      if (!summary.resourcesByType[type]) {
        summary.resourcesByType[type] = { count: 0, totalSize: 0, totalTime: 0 };
      }
      summary.resourcesByType[type].count += 1;
      summary.resourcesByType[type].totalSize += r.transferSize || 0;
      summary.resourcesByType[type].totalTime += r.duration;
    });

    return summary;
  }

  generateReport() {
    const pageLoad = this.measurePageLoad();
    const webVitals = this.measureWebVitals();
    const resources = this.measureResourceTiming();

    const report = {
      timestamp: new Date().toISOString(),
      pageLoadMetrics: pageLoad,
      webVitals,
      resourceMetrics: resources,
      allMetrics: Object.fromEntries(this.metrics),
    };

    return report;
  }

  logReport() {
    const report = this.generateReport();
    console.table({
      'Total Page Load Time': `${report.pageLoadMetrics?.totalPageLoadTime.toFixed(2)}ms`,
      'DOM Content Loaded': `${report.pageLoadMetrics?.domContentLoaded.toFixed(2)}ms`,
      'Time to First Byte': `${report.pageLoadMetrics?.timeToFirstByte.toFixed(2)}ms`,
      'Total Resources': report.resourceMetrics?.totalResources,
      'Total Resource Size': `${(report.resourceMetrics?.totalSize! / 1024).toFixed(2)}KB`,
      'LCP': report.webVitals?.lcp ? `${report.webVitals.lcp.toFixed(2)}ms` : 'N/A',
      'CLS': report.webVitals?.cls ? `${report.webVitals.cls.toFixed(3)}` : 'N/A',
    });

    return report;
  }

  sendMetricsToServer(endpoint: string) {
    const report = this.generateReport();
    navigator.sendBeacon(endpoint, JSON.stringify(report));
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Auto log on page unload in production
if (process.env.NODE_ENV === 'production') {
  window.addEventListener('beforeunload', () => {
    performanceMonitor.sendMetricsToServer('/api/metrics');
  });
}

export default performanceMonitor;
