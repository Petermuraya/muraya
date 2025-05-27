
import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
  author?: string;
  twitterHandle?: string;
}

const SEO = ({ 
  title = "Peter Muraya Ndung'u - IoT & Cloud Solutions Developer | React, TypeScript, Node.js Expert",
  description = "Experienced IoT & Cloud Solutions Developer specializing in React, TypeScript, Node.js, and modern web technologies. Passionate about technology for global development and digital innovation.",
  keywords = "IoT developer, cloud solutions, React developer, TypeScript, Node.js, web development, JavaScript, frontend, backend, portfolio, software engineer, global development, digital innovation, smart agriculture, health tech",
  image = "https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg",
  url = "https://yourportfolio.com",
  type = "website",
  author = "Peter Muraya Ndung'u",
  twitterHandle = "@petermuraya",
  structuredData
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'English');
    updateMetaTag('revisit-after', '7 days');
    updateMetaTag('theme-color', '#0d1117');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:locale', 'en_US', true);
    updateMetaTag('og:site_name', 'Peter Muraya Portfolio', true);

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);
    updateMetaTag('twitter:url', url, true);
    updateMetaTag('twitter:creator', twitterHandle, true);
    updateMetaTag('twitter:site', twitterHandle, true);

    // Additional SEO meta tags
    updateMetaTag('format-detection', 'telephone=no');
    updateMetaTag('mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', url);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', url);
      document.head.appendChild(canonicalLink);
    }

    // Structured Data
    if (structuredData) {
      let structuredDataScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (structuredDataScript) {
        structuredDataScript.textContent = JSON.stringify(structuredData);
      } else {
        structuredDataScript = document.createElement('script') as HTMLScriptElement;
        structuredDataScript.type = 'application/ld+json';
        structuredDataScript.textContent = JSON.stringify(structuredData);
        document.head.appendChild(structuredDataScript);
      }
    }
  }, [title, description, keywords, image, url, type, author, twitterHandle, structuredData]);

  return null;
};

export default SEO;
