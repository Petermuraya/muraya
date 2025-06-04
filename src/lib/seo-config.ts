
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  url: string;
  type?: string;
  structuredData?: object;
  breadcrumbs?: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const baseSEOConfig = {
  siteName: "Peter Muraya Ndung'u - Portfolio",
  siteUrl: "https://petermuraya.lovable.app",
  defaultImage: "https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg",
  author: "Peter Muraya Ndung'u",
  twitterHandle: "@petermuraya",
  keywords: {
    primary: "IoT developer, AI developer, React developer, TypeScript, Node.js, Kenya developer",
    secondary: "full-stack developer, cloud solutions, smart agriculture, health tech, Nairobi",
    technical: "JavaScript, Python, AWS, IoT systems, machine learning, web development"
  }
};

export const pageConfigs: Record<string, Partial<SEOConfig>> = {
  home: {
    title: "Peter Muraya Ndung'u | Leading IoT & AI Developer in Kenya | React, TypeScript Expert",
    description: "Award-winning IoT & AI specialist in Kenya building cutting-edge solutions for healthcare, agriculture, and smart cities. Expert in React, TypeScript, Node.js, Python, and cloud architecture.",
    keywords: `${baseSEOConfig.keywords.primary}, ${baseSEOConfig.keywords.secondary}, portfolio, software engineer Kenya`,
    url: baseSEOConfig.siteUrl,
    type: "website"
  },
  about: {
    title: "About Peter Muraya | IoT Developer Journey & Expertise | Kenya Tech Leader",
    description: "Learn about Peter Muraya's journey from computer science student to leading IoT & AI developer in Kenya. Discover his expertise in React, TypeScript, and sustainable technology solutions.",
    keywords: `about Peter Muraya, IoT developer background, Kenya tech expert, ${baseSEOConfig.keywords.technical}`,
    url: `${baseSEOConfig.siteUrl}/about`,
    type: "profile"
  },
  projects: {
    title: "Projects Portfolio | IoT & AI Solutions by Peter Muraya | Kenya Innovation",
    description: "Explore Peter Muraya's innovative IoT and AI projects including smart agriculture systems, healthcare solutions, and web applications built with React, TypeScript, and modern technologies.",
    keywords: `Peter Muraya projects, IoT projects Kenya, AI solutions, React projects, ${baseSEOConfig.keywords.technical}`,
    url: `${baseSEOConfig.siteUrl}/projects`,
    type: "website"
  },
  blog: {
    title: "Tech Blog | IoT, AI & Web Development Insights by Peter Muraya",
    description: "Read Peter Muraya's insights on IoT development, AI implementation, React best practices, and technology trends in Kenya and Africa. Expert tutorials and case studies.",
    keywords: `Peter Muraya blog, IoT tutorials, AI insights, React tips, ${baseSEOConfig.keywords.technical}`,
    url: `${baseSEOConfig.siteUrl}/blog`,
    type: "blog"
  },
  contact: {
    title: "Contact Peter Muraya | IoT & AI Developer | Collaboration Opportunities",
    description: "Connect with Peter Muraya for IoT development, AI solutions, React consulting, or collaboration opportunities. Based in Nairobi, Kenya, available for projects worldwide.",
    keywords: `contact Peter Muraya, hire IoT developer, AI consultant Kenya, React developer contact`,
    url: `${baseSEOConfig.siteUrl}/contact`,
    type: "website"
  }
};

export const generateStructuredData = (page: string, customData?: object) => {
  const basePersonData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Peter Muraya Ndung'u",
    "jobTitle": "IoT & AI Solutions Developer",
    "description": "Experienced IoT & Cloud Solutions Developer specializing in React, TypeScript, Node.js, and modern web technologies.",
    "url": baseSEOConfig.siteUrl,
    "image": baseSEOConfig.defaultImage,
    "sameAs": [
      "https://github.com/petermuraya",
      "https://linkedin.com/in/petermuraya",
      "https://twitter.com/petermuraya"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance Developer"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nairobi",
      "addressCountry": "Kenya"
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
      "Healthcare Technology"
    ]
  };

  const pageSpecificData: Record<string, object> = {
    home: {
      "@context": "https://schema.org",
      "@type": ["Person", "ProfessionalService"],
      ...basePersonData,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": baseSEOConfig.siteUrl
      },
      "offers": {
        "@type": "Offer",
        "description": "IoT and AI development services",
        "areaServed": "Worldwide"
      }
    },
    about: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": basePersonData,
      "name": "About Peter Muraya Ndung'u",
      "description": pageConfigs.about.description
    },
    projects: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Peter Muraya's Project Portfolio",
      "description": pageConfigs.projects.description,
      "author": basePersonData,
      "mainEntity": {
        "@type": "CreativeWork",
        "name": "IoT and AI Project Portfolio"
      }
    }
  };

  return {
    ...pageSpecificData[page],
    ...customData
  };
};
