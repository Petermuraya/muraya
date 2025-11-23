import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { useServiceWorker, usePerformanceMonitoring } from './hooks/usePerformance'

// Initialize performance monitoring
if (process.env.NODE_ENV === 'production') {
  // Log performance metrics
  window.addEventListener('load', () => {
    setTimeout(() => {
      const { performanceMonitor } = require('./services/performanceMonitor')
      performanceMonitor.logReport()
    }, 1000)
  })
}

createRoot(document.getElementById("root")!).render(<App />);
