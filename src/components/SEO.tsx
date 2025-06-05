
import { Helmet } from 'react-helmet-async';

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
  title = "Peter Muraya Ndung'u - IoT & Cloud Solutions Developer | React, TypeScript, Node.js Expert | @sammie1604",
  description = "Experienced IoT & Cloud Solutions Developer Peter Muraya specializing in React, TypeScript, Node.js, and modern web technologies. Passionate about technology for global development and digital innovation. Contact: sammypeter1944@gmail.com | +254 700 471113 | Follow @sammie1604",
  keywords = "Peter Muraya, IoT developer Kenya, cloud solutions Nairobi, React developer Kenya, TypeScript, Node.js, web development Kenya, JavaScript, frontend, backend, portfolio, software engineer Kenya, global development, digital innovation, smart agriculture Kenya, health tech, sammie1604, murayandungu",
  image = "https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg",
  url = "https://petermuraya.lovable.app",
  type = "website",
  author = "Peter Muraya Ndung'u",
  twitterHandle = "@sammie1604",
  structuredData
}: SEOProps) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="googlebot" content="index,follow" />
      <meta name="bingbot" content="index,follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="3 days" />
      <meta name="theme-color" content="#0d1117" />

      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="KE" />
      <meta name="geo.placename" content="Nairobi" />
      <meta name="geo.position" content="-1.286389;36.817223" />
      <meta name="ICBM" content="-1.286389, 36.817223" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Peter Muraya Ndung'u - IoT & AI Developer" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Peter Muraya Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Peter Muraya Portfolio" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:label1" content="Expertise" />
      <meta name="twitter:data1" content="IoT, AI, React, TypeScript" />
      <meta name="twitter:label2" content="Location" />
      <meta name="twitter:data2" content="Nairobi, Kenya" />

      {/* Additional SEO meta tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Peter Muraya" />
      <meta name="application-name" content="Peter Muraya Portfolio" />

      {/* Performance and Security */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />

      {/* Contact Information for Rich Snippets */}
      <meta name="contact" content="sammypeter1944@gmail.com" />
      <meta name="phone" content="+254700471113" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://i.postimg.cc" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//i.postimg.cc" />
    </Helmet>
  );
};

export default SEO;
