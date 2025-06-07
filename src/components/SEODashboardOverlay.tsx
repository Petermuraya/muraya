
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import FuturisticSEODashboard from '@/components/FuturisticSEODashboard';

const SEODashboardOverlay = () => {
  const [showSEODashboard, setShowSEODashboard] = useState(false);

  return (
    <>
      {/* SEO Dashboard Overlay */}
      {showSEODashboard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative">
            <Button
              onClick={() => setShowSEODashboard(false)}
              className="absolute -top-4 -right-4 z-10 rounded-full bg-red-600 hover:bg-red-700"
              size="sm"
            >
              ×
            </Button>
            <FuturisticSEODashboard />
          </div>
        </div>
      )}

      {/* Floating SEO Dashboard Button */}
      <Button
        onClick={() => setShowSEODashboard(true)}
        className="fixed bottom-48 right-8 z-40 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4"
        size="icon"
        title="Open SEO Dashboard"
      >
        <BarChart3 className="w-6 h-6" />
      </Button>
    </>
  );
};

export default SEODashboardOverlay;
