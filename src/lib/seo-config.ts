
export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  breadcrumbs?: { name: string; url: string }[];
}

export interface Breadcrumb {
  name: string;
  url: string;
}

// Enhanced SEO configuration with priority on "Peter Muraya" and "Muraya"
export const baseSEOConfig = {
  siteName: "Peter Muraya - IoT & AI Developer Kenya",
  siteUrl: "https://petermuraya.github.io/muraya",
  defaultImage: "https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg",
  author: "Peter Muraya",
  authorFullName: "Peter Muraya Ndungu", 
  primaryName: "Peter Muraya",
  brandName: "Muraya",
  twitterHandle: "@sammie1604",
  email: "sammypeter1944@gmail.com",
  phone: "+254700471113",
  location: "Nairobi, Kenya",
};

// Page-specific configurations prioritizing "Muraya" brand
export const pageConfigs: Record<string, SEOConfig> = {
  home: {
    title: "Peter Muraya (@sammie1604) | Leading IoT & AI Developer Kenya | Muraya Tech Solutions",
    description: "Peter Muraya (Muraya) - Award-winning IoT & AI specialist from Kenya. Building cutting-edge solutions for healthcare, agriculture, and smart cities. Expert in React, TypeScript, Node.js, Python. Follow @sammie1604",
    keywords: "Peter Muraya, Muraya developer, Muraya Kenya, IoT developer Kenya, AI specialist Africa, React expert Kenya, TypeScript developer Nairobi, sammie1604, GitHub petermuraya, muraya tech solutions",
    type: "profile",
    url: baseSEOConfig.siteUrl
  },
  about: {
    title: "About Peter Muraya | Muraya - IoT & AI Innovation Leader Kenya",
    description: "Learn about Peter Muraya (Muraya) - Kenya's leading IoT & AI developer. From Karatina University to building transformative tech solutions across Africa. Youth tech leader and innovation advocate.",
    keywords: "About Peter Muraya, Muraya biography, Kenya tech leader, IoT developer story, AI specialist background, Karatina University, muraya innovation",
    url: `${baseSEOConfig.siteUrl}/about`
  },
  projects: {
    title: "Peter Muraya Projects | Muraya Tech Portfolio - IoT & AI Solutions Kenya",
    description: "Explore Peter Muraya's (Muraya) innovative IoT and AI projects. Smart agriculture, healthcare technology, and cloud solutions transforming African industries.",
    keywords: "Peter Muraya projects, Muraya portfolio, IoT projects Kenya, AI solutions Africa, smart agriculture, healthcare tech, muraya innovations",
    url: `${baseSEOConfig.siteUrl}/projects`
  },
  blog: {
    title: "Peter Muraya Blog | Muraya Tech Insights - IoT & AI Development Kenya",
    description: "Latest insights from Peter Muraya (Muraya) on IoT, AI, and tech innovation in Kenya and Africa. Expert perspectives on modern development.",
    keywords: "Peter Muraya blog, Muraya tech blog, IoT insights Kenya, AI development Africa, tech innovation blog, muraya thoughts",
    url: `${baseSEOConfig.siteUrl}/blog`
  },
  contact: {
    title: "Contact Peter Muraya | Muraya - IoT & AI Consultant Kenya",
    description: "Get in touch with Peter Muraya (Muraya) for IoT and AI consulting, tech partnerships, or collaboration opportunities. Available for projects across Kenya and Africa.",
    keywords: "Contact Peter Muraya, Muraya contact, IoT consultant Kenya, AI developer hire, tech collaboration, muraya consulting",
    url: `${baseSEOConfig.siteUrl}/contact`
  }
};

// Generate enhanced structured data with "Muraya" brand prominence
export const generateStructuredData = (page: string, customData?: object) => {
  const config = pageConfigs[page] || pageConfigs.home;
  
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Peter Muraya",
    "alternateName": ["Muraya", "sammie1604", "Peter Muraya Ndungu"],
    "brand": {
      "@type": "Brand",
      "name": "Muraya Tech Solutions"
    },
    "url": config.url,
    "image": baseSEOConfig.defaultImage,
    "jobTitle": "IoT & AI Developer",
    "description": config.description,
    "email": baseSEOConfig.email,
    "telephone": baseSEOConfig.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nairobi",
      "addressCountry": "Kenya"
    },
    "sameAs": [
      "https://github.com/petermuraya",
      "https://www.linkedin.com/in/peter-muraya-ndungu/",
      "https://x.com/sammie1604",
      "https://www.instagram.com/murayandungu/",
      "https://www.facebook.com/sammy.wailer.319"
    ],
    "knowsAbout": [
      "IoT Development", "Artificial Intelligence", "React.js", "TypeScript",
      "Node.js", "Python", "Cloud Computing", "Smart Agriculture",
      "Healthcare Technology", "Kenya Tech Innovation"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Muraya Tech Solutions",
      "description": "IoT and AI innovation company serving African markets"
    }
  };

  return customData ? { ...baseStructuredData, ...customData } : baseStructuredData;
};
