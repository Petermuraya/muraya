
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
    primary: "IoT developer, AI developer, React developer, TypeScript, Node.js, Kenya developer, tech blog, programming tutorials",
    secondary: "full-stack developer, cloud solutions, smart agriculture, health tech, Nairobi, software engineering, tech innovation",
    technical: "JavaScript, Python, AWS, IoT systems, machine learning, web development, GitHub, LinkedIn, dev.to, medium, tech content creator",
    social: "tech influencer Kenya, developer community, open source contributor, tech meetups Nairobi, programming education, coding tutorials"
  }
};

export const pageConfigs: Record<string, Partial<SEOConfig>> = {
  home: {
    title: "Peter Muraya Ndung'u | Leading IoT & AI Developer in Kenya | React, TypeScript Expert | Tech Blog",
    description: "Award-winning IoT & AI specialist in Kenya building cutting-edge solutions for healthcare, agriculture, and smart cities. Expert in React, TypeScript, Node.js, Python, and cloud architecture. Follow for tech insights and tutorials.",
    keywords: `${baseSEOConfig.keywords.primary}, ${baseSEOConfig.keywords.secondary}, ${baseSEOConfig.keywords.social}, portfolio, software engineer Kenya, tech blogger, programming tutorials`,
    url: baseSEOConfig.siteUrl,
    type: "website"
  },
  about: {
    title: "About Peter Muraya | IoT Developer Journey & Expertise | Kenya Tech Leader | Connect on LinkedIn & GitHub",
    description: "Learn about Peter Muraya's journey from computer science student to leading IoT & AI developer in Kenya. Discover his expertise in React, TypeScript, and sustainable technology solutions. Connect on LinkedIn, GitHub, and follow his tech blog.",
    keywords: `about Peter Muraya, IoT developer background, Kenya tech expert, ${baseSEOConfig.keywords.technical}, LinkedIn developer, GitHub projects, tech blog Kenya, developer story`,
    url: `${baseSEOConfig.siteUrl}/about`,
    type: "profile"
  },
  projects: {
    title: "Projects Portfolio | IoT & AI Solutions by Peter Muraya | Kenya Innovation | Open Source on GitHub",
    description: "Explore Peter Muraya's innovative IoT and AI projects including smart agriculture systems, healthcare solutions, and web applications built with React, TypeScript, and modern technologies. View code on GitHub and read detailed case studies.",
    keywords: `Peter Muraya projects, IoT projects Kenya, AI solutions, React projects, ${baseSEOConfig.keywords.technical}, GitHub repositories, open source projects, project case studies`,
    url: `${baseSEOConfig.siteUrl}/projects`,
    type: "website"
  },
  blog: {
    title: "Tech Blog | IoT, AI & Web Development Insights by Peter Muraya | Programming Tutorials & Industry Analysis",
    description: "Read Peter Muraya's insights on IoT development, AI implementation, React best practices, and technology trends in Kenya and Africa. Expert tutorials, case studies, and industry analysis for developers and tech enthusiasts.",
    keywords: `Peter Muraya blog, IoT tutorials, AI insights, React tips, ${baseSEOConfig.keywords.technical}, programming tutorials, tech trends Kenya, developer blog, coding education`,
    url: `${baseSEOConfig.siteUrl}/blog`,
    type: "blog"
  },
  contact: {
    title: "Contact Peter Muraya | IoT & AI Developer | Collaboration Opportunities | LinkedIn & Email",
    description: "Connect with Peter Muraya for IoT development, AI solutions, React consulting, or collaboration opportunities. Based in Nairobi, Kenya, available for projects worldwide. Reach out via LinkedIn, email, or social media.",
    keywords: `contact Peter Muraya, hire IoT developer, AI consultant Kenya, React developer contact, tech collaboration, LinkedIn contact, developer networking`,
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
    "description": "Experienced IoT & Cloud Solutions Developer specializing in React, TypeScript, Node.js, and modern web technologies. Tech blogger and open source contributor.",
    "url": baseSEOConfig.siteUrl,
    "image": baseSEOConfig.defaultImage,
    "sameAs": [
      "https://github.com/petermuraya",
      "https://linkedin.com/in/petermuraya",
      "https://twitter.com/petermuraya",
      "https://dev.to/petermuraya",
      "https://medium.com/@petermuraya",
      "https://youtube.com/@petermuraya"
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
      "name": "University of Nairobi"
    },
    "award": [
      "Kenya IoT Innovation Award 2023",
      "Top Developer GitHub Kenya"
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
        "description": "IoT and AI development services, tech consulting, and educational content",
        "areaServed": "Worldwide"
      },
      "potentialAction": {
        "@type": "FollowAction",
        "target": [
          "https://github.com/petermuraya",
          "https://linkedin.com/in/petermuraya",
          "https://twitter.com/petermuraya"
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
