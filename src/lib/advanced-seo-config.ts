
export interface TechSEOConfig {
  regions: {
    primary: string[];
    secondary: string[];
    languages: string[];
  };
  techStack: {
    frontend: string[];
    backend: string[];
    iot: string[];
    ai: string[];
    cloud: string[];
  };
  kenyaTechEcosystem: {
    hubs: string[];
    universities: string[];
    communities: string[];
    events: string[];
  };
  voiceSearchKeywords: string[];
  longTailKeywords: string[];
}

export const advancedSEOConfig: TechSEOConfig = {
  regions: {
    primary: ["Kenya", "Nairobi", "East Africa", "Africa"],
    secondary: ["Karatina", "Central Kenya", "Sub-Saharan Africa", "Developing Nations"],
    languages: ["English", "Swahili", "Kikuyu"]
  },
  techStack: {
    frontend: [
      "React.js expert Kenya", "TypeScript developer Nairobi", "JavaScript specialist Africa",
      "Responsive web design Kenya", "Progressive Web Apps Africa", "Frontend architecture Kenya"
    ],
    backend: [
      "Node.js developer Kenya", "Express.js expert Africa", "REST API design Kenya",
      "GraphQL implementation Africa", "Database design Kenya", "Server architecture Africa"
    ],
    iot: [
      "IoT developer Kenya", "Smart agriculture Kenya", "IoT sensors Africa",
      "Industrial IoT Kenya", "Smart cities Africa", "Connected devices Kenya",
      "Arduino projects Kenya", "Raspberry Pi solutions Africa", "LoRaWAN Kenya"
    ],
    ai: [
      "AI developer Kenya", "Machine Learning Africa", "Deep Learning Kenya",
      "AI for agriculture Africa", "Healthcare AI Kenya", "Computer Vision Africa",
      "Natural Language Processing Kenya", "AI consulting Africa"
    ],
    cloud: [
      "AWS Kenya", "Cloud architecture Africa", "Serverless Kenya",
      "DevOps Kenya", "CI/CD Africa", "Cloud migration Kenya", "Microservices Africa"
    ]
  },
  kenyaTechEcosystem: {
    hubs: [
      "iHub Nairobi", "Nairobi Garage", "C4DLab", "mLab East Africa",
      "Growth Garage", "Nailab", "ICIPE", "Strathmore @iLabAfrica"
    ],
    universities: [
      "Karatina University", "University of Nairobi", "Strathmore University",
      "JKUAT", "Moi University", "Kenyatta University", "Technical University of Kenya"
    ],
    communities: [
      "Kenya Developer Community", "IoT Kenya", "AI Kenya", "React Kenya",
      "Python Kenya", "JavaScript Kenya", "Women in Tech Kenya", "Tech Entrepreneurs Kenya"
    ],
    events: [
      "DevFest Kenya", "PyConKE", "React Conf Kenya", "IoT Conference Kenya",
      "AI Summit Kenya", "Tech Safari", "Startup Grind Nairobi", "Google I/O Extended Kenya"
    ]
  },
  voiceSearchKeywords: [
    "Who is the best IoT developer in Kenya",
    "How to build IoT solutions in Africa",
    "React developer near me Kenya",
    "AI consultant in Nairobi",
    "Smart agriculture solutions Kenya",
    "Healthcare technology developer Africa",
    "Youth tech leader Kenya",
    "Peter Muraya contact information"
  ],
  longTailKeywords: [
    "IoT solutions for smallholder farmers in Kenya",
    "AI-powered healthcare systems for rural Africa",
    "React TypeScript development best practices Kenya",
    "Smart city technology implementation Nairobi",
    "Affordable IoT sensors for African agriculture",
    "Youth entrepreneurship in Kenya tech sector",
    "Sustainable technology solutions for developing countries",
    "Digital transformation consulting for African businesses"
  ]
};

export const generateKenyaTechSchema = () => ({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "about": {
    "@type": "Thing",
    "name": "Kenya Technology Ecosystem",
    "description": "Comprehensive overview of Kenya's thriving technology sector and innovation landscape"
  },
  "mentions": [
    {
      "@type": "Organization",
      "name": "iHub",
      "url": "https://ihub.co.ke",
      "description": "Kenya's premier innovation hub fostering tech entrepreneurship"
    },
    {
      "@type": "EducationalOrganization", 
      "name": "Karatina University",
      "url": "https://www.karu.ac.ke",
      "description": "Leading Kenyan university producing top tech talent"
    },
    {
      "@type": "Event",
      "name": "DevFest Kenya",
      "description": "Annual developer conference in Kenya showcasing latest technologies"
    }
  ]
});

export const generateIoTAfricaSchema = () => ({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "name": "IoT Solutions for Africa",
  "description": "Innovative Internet of Things applications addressing African challenges",
  "keywords": "IoT Africa, Smart Agriculture Kenya, Healthcare IoT Africa, Smart Cities Kenya",
  "about": [
    {
      "@type": "Thing",
      "name": "Smart Agriculture",
      "description": "IoT solutions revolutionizing farming practices in Africa"
    },
    {
      "@type": "Thing",
      "name": "Healthcare Technology",
      "description": "Connected health solutions for rural and urban Africa"
    }
  ]
});
