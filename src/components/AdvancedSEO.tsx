
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface AdvancedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  customStructuredData?: object;
}

const AdvancedSEO = ({
  title,
  description,
  keywords,
  image,
  article,
  customStructuredData
}: AdvancedSEOProps) => {
  const location = useLocation();
  const currentUrl = `https://petermuraya.github.io/muraya${location.pathname}`;
  
  const defaultTitle = "Peter Muraya Ndung'u (@sammie1604) | Leading IoT & AI Developer Kenya | React TypeScript Expert";
  const defaultDescription = "Award-winning IoT & AI specialist Peter Muraya from Kenya building cutting-edge solutions for healthcare, agriculture, and smart cities. Expert in React, TypeScript, Node.js, Python. Connect @sammie1604 | sammypeter1944@gmail.com";
  const defaultImage = "https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg";
  
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;

  // Generate page-specific structured data
  const generateStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": finalTitle,
      "description": finalDescription,
      "url": currentUrl,
      "image": finalImage,
      "author": {
        "@type": "Person",
        "name": "Peter Muraya Ndung'u",
        "alternateName": ["sammie1604", "murayandungu"],
        "url": "https://petermuraya.github.io/muraya",
        "image": defaultImage,
        "sameAs": [
          "https://github.com/petermuraya",
          "https://www.linkedin.com/in/peter-muraya-ndungu/",
          "https://x.com/sammie1604",
          "https://www.instagram.com/murayandungu/",
          "https://www.facebook.com/sammy.wailer.319"
        ]
      },
      "mainEntity": {
        "@type": "Person",
        "name": "Peter Muraya Ndung'u",
        "jobTitle": "IoT & AI Solutions Developer",
        "worksFor": {
          "@type": "Organization",
          "name": "Freelance Developer & Tech Consultant"
        },
        "knowsAbout": [
          "IoT Development", "Artificial Intelligence", "React.js", "TypeScript", 
          "Node.js", "Python", "Cloud Computing", "Smart Agriculture", 
          "Healthcare Technology", "Full-Stack Development"
        ]
      }
    };

    if (article) {
      return {
        ...baseData,
        "@type": "Article",
        "headline": finalTitle,
        "datePublished": article.publishedTime,
        "dateModified": article.modifiedTime || article.publishedTime,
        "articleSection": article.section,
        "keywords": article.tags?.join(", ")
      };
    }

    return { ...baseData, ...customStructuredData };
  };

  // Generate comprehensive keywords
  const generateKeywords = () => {
    const baseKeywords = [
      "Peter Muraya Ndungu", "sammie1604", "murayandungu",
      "IoT developer Kenya", "AI developer Nairobi", "React developer Kenya",
      "TypeScript expert", "Node.js developer", "Python developer Kenya",
      "Full-stack developer Nairobi", "Software engineer Kenya",
      "Smart agriculture Kenya", "Healthcare tech Africa", "Cloud solutions Kenya",
      "Tech innovation Africa", "GitHub petermuraya", "LinkedIn peter-muraya-ndungu",
      "sammypeter1944@gmail.com", "Karatina University developer"
    ];
    
    return keywords ? `${keywords}, ${baseKeywords.join(", ")}` : baseKeywords.join(", ");
  };

  return (
    <Helmet>
      {/* Enhanced Title and Meta */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={generateKeywords()} />
      
      {/* Enhanced Author Information */}
      <meta name="author" content="Peter Muraya Ndung'u" />
      <meta name="creator" content="Peter Muraya Ndung'u (@sammie1604)" />
      <meta name="publisher" content="Peter Muraya Ndung'u" />
      
      {/* Enhanced Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large" />
      
      {/* Geographic Enhancement */}
      <meta name="geo.region" content="KE-47" />
      <meta name="geo.placename" content="Nairobi, Kenya" />
      <meta name="geo.position" content="-1.286389;36.817223" />
      <meta name="ICBM" content="-1.286389, 36.817223" />
      <meta name="geo.country" content="Kenya" />
      
      {/* Language and Locale */}
      <meta name="language" content="en-KE" />
      <meta httpEquiv="content-language" content="en-KE" />
      
      {/* Enhanced Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:secure_url" content={finalImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={article ? "article" : "profile"} />
      <meta property="og:locale" content="en_KE" />
      <meta property="og:site_name" content="Peter Muraya Ndung'u Portfolio" />
      
      {/* Article-specific Open Graph */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author || "Peter Muraya Ndung'u"} />
          <meta property="article:section" content={article.section} />
          {article.tags?.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Enhanced Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sammie1604" />
      <meta name="twitter:creator" content="@sammie1604" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content="Peter Muraya Ndung'u - IoT & AI Developer Portfolio" />
      
      {/* LinkedIn Specific */}
      <meta property="og:image:alt" content="Peter Muraya Ndung'u Professional Portfolio" />
      
      {/* Performance and Security */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="theme-color" content="#0d1117" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://i.postimg.cc" />
      
      {/* Enhanced DNS Prefetch */}
      <link rel="dns-prefetch" href="//github.com" />
      <link rel="dns-prefetch" href="//linkedin.com" />
      <link rel="dns-prefetch" href="//twitter.com" />
    </Helmet>
  );
};

export default AdvancedSEO;
