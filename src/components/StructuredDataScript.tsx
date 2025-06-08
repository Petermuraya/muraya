
import { Helmet } from 'react-helmet-async';

const StructuredDataScript = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Peter Muraya",
    "alternateName": ["Muraya", "sammie1604", "Peter Muraya Ndungu"],
    "brand": {
      "@type": "Brand",
      "name": "Muraya Tech Solutions"
    },
    "url": "https://petermuraya.github.io/muraya/",
    "description": "Peter Muraya (Muraya) - Leading IoT & AI developer building transformative tech solutions for African markets. Expert in React, TypeScript, Python, and cloud-native systems.",
    "image": {
      "@type": "ImageObject",
      "url": "https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg",
      "width": 1200,
      "height": 630,
      "caption": "Peter Muraya - Muraya Tech Solutions"
    },
    "jobTitle": "IoT & AI Developer",
    "email": "sammypeter1944@gmail.com",
    "telephone": "+254700471113",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi County",
      "addressCountry": "Kenya"
    },
    "sameAs": [
      "https://github.com/petermuraya",
      "https://www.linkedin.com/in/peter-muraya-ndungu/",
      "https://x.com/sammie1604",
      "https://www.instagram.com/murayandungu/",
      "https://www.facebook.com/sammy.wailer.319"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Muraya Tech Solutions",
      "description": "IoT and AI innovation company serving African markets"
    },
    "knowsAbout": [
      "IoT Development",
      "Artificial Intelligence",
      "React.js",
      "TypeScript",
      "Node.js",
      "Python",
      "Cloud Computing",
      "Smart Agriculture",
      "Healthcare Technology",
      "Kenya Tech Innovation"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredDataScript;
