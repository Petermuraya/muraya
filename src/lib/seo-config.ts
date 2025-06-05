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
  twitterHandle: "@sammie1604",
  email: "sammypeter1944@gmail.com",
  phone: "+254700471113",
  keywords: {
    primary: "Peter Muraya, IoT developer Kenya, AI developer Nairobi, React developer Kenya, TypeScript expert, Node.js developer, smart agriculture, health tech Kenya",
    secondary: "full-stack developer Kenya, cloud solutions Nairobi, smart agriculture Kenya, health tech developer, Karatina University, software engineering Kenya, tech innovation Africa",
    technical: "JavaScript Kenya, Python developer, AWS Kenya, IoT systems Kenya, machine learning Africa, web development Nairobi, GitHub Kenya, LinkedIn developer, tech content creator Kenya",
    social: "tech influencer Kenya, developer community Nairobi, open source contributor Kenya, tech meetups Nairobi, programming education Kenya, coding tutorials Africa, sammie1604, murayandungu"
  }
};

export const pageConfigs: Record<string, Partial<SEOConfig>> = {
  home: {
    title: "Peter Muraya Ndung'u | Leading IoT & AI Developer in Kenya | React, TypeScript Expert | @sammie1604",
    description: "Award-winning IoT & AI specialist Peter Muraya from Kenya building cutting-edge solutions for healthcare, agriculture, and smart cities. Expert in React, TypeScript, Node.js, Python, and cloud architecture. Connect on LinkedIn, GitHub, Twitter @sammie1604, Instagram @murayandungu. Contact: sammypeter1944@gmail.com | +254 700 471113",
    keywords: `Peter Muraya Ndung'u, ${baseSEOConfig.keywords.primary}, ${baseSEOConfig.keywords.secondary}, ${baseSEOConfig.keywords.social}, sammie1604, murayandungu, sammypeter1944@gmail.com, IoT developer Nairobi, software engineer Kenya`,
    url: baseSEOConfig.siteUrl,
    type: "website"
  },
  about: {
    title: "About Peter Muraya | IoT Developer Journey & Expertise | Kenya Tech Leader | Connect @sammie1604 LinkedIn GitHub",
    description: "Learn about Peter Muraya Ndung'u's journey from Karatina University computer science student to leading IoT & AI developer in Kenya. Discover his expertise in React, TypeScript, and sustainable technology solutions. Connect via LinkedIn, GitHub @petermuraya, Twitter @sammie1604, Instagram @murayandungu. Email: sammypeter1944@gmail.com | Phone: +254 700 471113",
    keywords: `about Peter Muraya Ndungu, IoT developer background Kenya, Kenya tech expert, ${baseSEOConfig.keywords.technical}, LinkedIn developer Kenya, GitHub projects petermuraya, tech blog Kenya, developer story Karatina University, sammie1604, murayandungu`,
    url: `${baseSEOConfig.siteUrl}/about`,
    type: "profile"
  },
  projects: {
    title: "Projects Portfolio | IoT & AI Solutions by Peter Muraya | Kenya Innovation | Open Source GitHub @petermuraya",
    description: "Explore Peter Muraya Ndung'u's innovative IoT and AI projects including smart agriculture systems, healthcare solutions, and web applications built with React, TypeScript, and modern technologies. View code on GitHub @petermuraya and read detailed case studies. Contact for collaborations: sammypeter1944@gmail.com",
    keywords: `Peter Muraya projects, IoT projects Kenya, AI solutions Africa, React projects Kenya, ${baseSEOConfig.keywords.technical}, GitHub repositories petermuraya, open source projects Kenya, project case studies, sammie1604 projects`,
    url: `${baseSEOConfig.siteUrl}/projects`,
    type: "website"
  },
  blog: {
    title: "Tech Blog | IoT, AI & Web Development Insights by Peter Muraya @sammie1604 | Programming Tutorials Kenya",
    description: "Read Peter Muraya Ndung'u's insights on IoT development, AI implementation, React best practices, and technology trends in Kenya and Africa. Expert tutorials, case studies, and industry analysis for developers and tech enthusiasts. Follow @sammie1604 on Twitter, @murayandungu on Instagram. Contact: sammypeter1944@gmail.com",
    keywords: `Peter Muraya blog, IoT tutorials Kenya, AI insights Africa, React tips Kenya, ${baseSEOConfig.keywords.technical}, programming tutorials Kenya, tech trends Africa, developer blog Kenya, coding education, sammie1604 blog, murayandungu`,
    url: `${baseSEOConfig.siteUrl}/blog`,
    type: "blog"
  },
  contact: {
    title: "Contact Peter Muraya | IoT & AI Developer Kenya | Collaboration Opportunities | @sammie1604 LinkedIn GitHub",
    description: "Connect with Peter Muraya Ndung'u for IoT development, AI solutions, React consulting, or collaboration opportunities. Based in Nairobi, Kenya, available for projects worldwide. Email: sammypeter1944@gmail.com | Phone: +254 700 471113 | LinkedIn: peter-muraya-ndungu | GitHub: @petermuraya | Twitter: @sammie1604 | Instagram: @murayandungu",
    keywords: `contact Peter Muraya Ndungu, hire IoT developer Kenya, AI consultant Nairobi, React developer contact Kenya, tech collaboration Africa, LinkedIn contact peter-muraya-ndungu, developer networking Kenya, sammypeter1944@gmail.com, sammie1604, murayandungu`,
    url: `${baseSEOConfig.siteUrl}/contact`,
    type: "website"
  }
};

export const generateStructuredData = (page: string, customData?: object) => {
  const basePersonData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Peter Muraya Ndung'u",
    "alternateName": ["Peter Muraya", "sammie1604", "murayandungu"],
    "jobTitle": "IoT & AI Solutions Developer",
    "description": "Experienced IoT & Cloud Solutions Developer specializing in React, TypeScript, Node.js, and modern web technologies. Tech blogger and open source contributor based in Kenya.",
    "url": baseSEOConfig.siteUrl,
    "image": baseSEOConfig.defaultImage,
    "email": "sammypeter1944@gmail.com",
    "telephone": "+254700471113",
    "sameAs": [
      "https://github.com/petermuraya",
      "https://www.linkedin.com/in/peter-muraya-ndungu/",
      "https://x.com/sammie1604",
      "https://www.instagram.com/murayandungu/",
      "https://www.facebook.com/sammy.wailer.319"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance Developer & Tech Consultant"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nairobi",
      "addressCountry": "Kenya"
    },
    "nationality": {
      "@type": "Country",
      "name": "Kenya"
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
      "Tech Blogging",
      "Open Source Development"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Karatina University"
    },
    "award": [
      "Kenya IoT Innovation Award 2023",
      "Top Developer GitHub Kenya"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+254700471113",
      "email": "sammypeter1944@gmail.com",
      "contactType": "Professional"
    }
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
        "description": "IoT and AI development services, tech consulting, and educational content",
        "areaServed": "Worldwide"
      },
      "potentialAction": {
        "@type": "FollowAction",
        "target": [
          "https://github.com/petermuraya",
          "https://www.linkedin.com/in/peter-muraya-ndungu/",
          "https://x.com/sammie1604"
        ]
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
        "name": "IoT and AI Project Portfolio",
        "creator": basePersonData
      }
    },
    blog: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Peter Muraya Tech Blog",
      "description": pageConfigs.blog.description,
      "author": basePersonData,
      "publisher": basePersonData,
      "inLanguage": "en-US",
      "audience": {
        "@type": "Audience",
        "audienceType": "Developers, Tech Enthusiasts, IoT Engineers"
      }
    }
  };

  return {
    ...pageSpecificData[page],
    ...customData
  };
};
