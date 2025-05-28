
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from '@/components/SEO';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Not Found - 404 Error",
    "description": "The requested page could not be found. Return to the homepage to continue browsing.",
    "url": `https://yourportfolio.com${location.pathname}`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Peter Muraya Portfolio",
      "url": "https://yourportfolio.com"
    }
  };

  return (
    <>
      <SEO 
        title="404 - Page Not Found | Peter Muraya Portfolio"
        description="The page you're looking for doesn't exist. Return to the homepage to explore Peter Muraya's portfolio and projects."
        keywords="404, page not found, error"
        url={`https://yourportfolio.com${location.pathname}`}
        structuredData={structuredData}
      />
      
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
