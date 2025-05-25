
import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'sw' | 'fr' | 'hi' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    blog: 'Blog',
    contact: 'Contact',
    portfolio: 'Portfolio',
    language: 'Language',
    theme: 'Theme',
    
    // Hero Section
    heroTitle: "Hi, I'm Peter Muraya",
    heroSubtitle: 'IoT & Cloud Solutions Developer',
    heroTagline: 'Tech for Global Development',
    heroDescription: 'Passionate about leveraging technology for global development, inclusion, and digital innovation. Specializing in smart agriculture, health tech, and AI-powered solutions.',
    viewMyWork: 'View My Work',
    getInTouch: 'Get In Touch',
    
    // Features Section
    whyChooseInnovation: 'Why Choose Innovation',
    drivingTechnological: 'Driving technological advancement through purposeful innovation',
    aiInnovation: 'AI Innovation',
    aiInnovationDesc: 'Cutting-edge artificial intelligence solutions for real-world problems',
    iotExcellence: 'IoT Excellence',
    iotExcellenceDesc: 'Smart connected systems that bridge the physical and digital worlds',
    globalImpact: 'Global Impact',
    globalImpactDesc: 'Technology solutions focused on social good and sustainable development',
    
    // Projects Section
    featuredProjects: 'Featured Projects',
    innovativeSolutions: 'Innovative solutions in AI, IoT, and cloud technologies for social impact',
    viewAllProjects: 'View All Projects',
    
    // Project Titles and Descriptions
    thoraxiqTitle: 'ThoraxIQ - AI Chest X-ray Analysis',
    thoraxiqDesc: 'AI-powered chest X-ray abnormality detection system for improved healthcare diagnostics',
    smartAgricultureTitle: 'Smart Agriculture IoT Platform',
    smartAgricultureDesc: 'IoT solution for precision farming with real-time monitoring and automated irrigation',
    healthTechTitle: 'Health Tech Accessibility Platform',
    healthTechDesc: 'Digital health solution focused on accessibility and inclusion for underserved communities',
    
    // Skills Section
    skillsExpertise: 'Skills & Expertise',
    technologiesIWork: 'Technologies I work with',
    learnMoreAboutMe: 'Learn More About Me',
    
    // Footer
    allRightsReserved: 'All rights reserved.',
    builtWith: 'Built with',
    and: 'and'
  },
  sw: {
    // Navigation
    home: 'Nyumbani',
    about: 'Kuhusu',
    projects: 'Miradi',
    blog: 'Blogu',
    contact: 'Mawasiliano',
    portfolio: 'Kazi Zangu',
    language: 'Lugha',
    theme: 'Mandhari',
    
    // Hero Section
    heroTitle: 'Hujambo, Mimi ni Peter Muraya',
    heroSubtitle: 'Mtengenezaji wa Suluhisho za IoT na Cloud',
    heroTagline: 'Teknolojia kwa Maendeleo ya Kimataifa',
    heroDescription: 'Nina shauku ya kutumia teknolojia kwa maendeleo ya kimataifa, ujumuishaji, na uvumbuzi wa kidijitali. Nimefani katika kilimo cha akili, teknolojia ya afya, na masuluhisho ya AI.',
    viewMyWork: 'Angalia Kazi Zangu',
    getInTouch: 'Wasiliana Nami',
    
    // Features Section
    whyChooseInnovation: 'Kwa Nini Chagua Uvumbuzi',
    drivingTechnological: 'Kuendesha maendeleo ya kiteknolojia kupitia uvumbuzi wenye maana',
    aiInnovation: 'Uvumbuzi wa AI',
    aiInnovationDesc: 'Masuluhisho ya hali ya juu ya akili bandia kwa matatizo ya ulimwengu halisi',
    iotExcellence: 'Ubora wa IoT',
    iotExcellenceDesc: 'Mifumo ya akili iliyounganishwa inayounganisha ulimwengu wa kimwili na kidijitali',
    globalImpact: 'Athari za Kimataifa',
    globalImpactDesc: 'Masuluhisho ya teknolojia yanayolenga faida za kijamii na maendeleo endelevu',
    
    // Projects Section
    featuredProjects: 'Miradi Iliyoangaziwa',
    innovativeSolutions: 'Masuluhisho ya uvumbuzi katika AI, IoT, na teknolojia za wingu kwa athari za kijamii',
    viewAllProjects: 'Angalia Miradi Yote',
    
    // Project Titles and Descriptions
    thoraxiqTitle: 'ThoraxIQ - Uchambuzi wa AI wa X-ray ya Kifua',
    thoraxiqDesc: 'Mfumo wa kugundua ubongo wa X-ray ya kifua unaongozwa na AI kwa upimaji bora wa afya',
    smartAgricultureTitle: 'Jukwaa la IoT la Kilimo cha Akili',
    smartAgricultureDesc: 'Suluhisho la IoT kwa kilimo sahihi na ufuatiliaji wa muda halisi na umwagiliaji wa kiotomatiki',
    healthTechTitle: 'Jukwaa la Upatikanaji la Teknolojia ya Afya',
    healthTechDesc: 'Suluhisho la afya la kidijitali linalolenga upatikanaji na ujumuishaji kwa jamii zisizopata huduma za kutosha',
    
    // Skills Section
    skillsExpertise: 'Ujuzi na Utaalamu',
    technologiesIWork: 'Teknolojia ninazofanya kazi nazo',
    learnMoreAboutMe: 'Jifunze Zaidi Kunihusu',
    
    // Footer
    allRightsReserved: 'Haki zote zimehifadhiwa.',
    builtWith: 'Imejengwa na',
    and: 'na'
  },
  fr: {
    // Navigation
    home: 'Accueil',
    about: 'À propos',
    projects: 'Projets',
    blog: 'Blog',
    contact: 'Contact',
    portfolio: 'Portfolio',
    language: 'Langue',
    theme: 'Thème',
    
    // Hero Section
    heroTitle: 'Salut, je suis Peter Muraya',
    heroSubtitle: 'Développeur de Solutions IoT et Cloud',
    heroTagline: 'Technologie pour le Développement Global',
    heroDescription: 'Passionné par l\'exploitation de la technologie pour le développement mondial, l\'inclusion et l\'innovation numérique. Spécialisé dans l\'agriculture intelligente, la technologie de la santé et les solutions alimentées par l\'IA.',
    viewMyWork: 'Voir Mon Travail',
    getInTouch: 'Entrer en Contact',
    
    // Features Section
    whyChooseInnovation: 'Pourquoi Choisir l\'Innovation',
    drivingTechnological: 'Conduire l\'avancement technologique grâce à l\'innovation ciblée',
    aiInnovation: 'Innovation IA',
    aiInnovationDesc: 'Solutions d\'intelligence artificielle de pointe pour les problèmes du monde réel',
    iotExcellence: 'Excellence IoT',
    iotExcellenceDesc: 'Systèmes connectés intelligents qui font le pont entre les mondes physique et numérique',
    globalImpact: 'Impact Global',
    globalImpactDesc: 'Solutions technologiques axées sur le bien social et le développement durable',
    
    // Projects Section
    featuredProjects: 'Projets en Vedette',
    innovativeSolutions: 'Solutions innovantes en IA, IoT et technologies cloud pour l\'impact social',
    viewAllProjects: 'Voir Tous les Projets',
    
    // Project Titles and Descriptions
    thoraxiqTitle: 'ThoraxIQ - Analyse de Radiographie Thoracique par IA',
    thoraxiqDesc: 'Système de détection d\'anomalies de radiographie thoracique alimenté par l\'IA pour de meilleurs diagnostics de santé',
    smartAgricultureTitle: 'Plateforme IoT d\'Agriculture Intelligente',
    smartAgricultureDesc: 'Solution IoT pour l\'agriculture de précision avec surveillance en temps réel et irrigation automatisée',
    healthTechTitle: 'Plateforme d\'Accessibilité en Technologie de Santé',
    healthTechDesc: 'Solution de santé numérique axée sur l\'accessibilité et l\'inclusion pour les communautés mal desservies',
    
    // Skills Section
    skillsExpertise: 'Compétences et Expertise',
    technologiesIWork: 'Technologies avec lesquelles je travaille',
    learnMoreAboutMe: 'En Savoir Plus Sur Moi',
    
    // Footer
    allRightsReserved: 'Tous droits réservés.',
    builtWith: 'Construit avec',
    and: 'et'
  },
  hi: {
    // Navigation
    home: 'होम',
    about: 'के बारे में',
    projects: 'परियोजनाएं',
    blog: 'ब्लॉग',
    contact: 'संपर्क',
    portfolio: 'पोर्टफोलियो',
    language: 'भाषा',
    theme: 'थीम',
    
    // Hero Section
    heroTitle: 'नमस्ते, मैं पीटर मुराया हूं',
    heroSubtitle: 'IoT और क्लाउड समाधान डेवलपर',
    heroTagline: 'वैश्विक विकास के लिए तकनीक',
    heroDescription: 'वैश्विक विकास, समावेश और डिजिटल नवाचार के लिए प्रौद्योगिकी का लाभ उठाने के बारे में जुनूनी। स्मार्ट कृषि, स्वास्थ्य तकनीक, और AI-संचालित समाधानों में विशेषज्ञता।',
    viewMyWork: 'मेरा काम देखें',
    getInTouch: 'संपर्क में रहें',
    
    // Features Section
    whyChooseInnovation: 'नवाचार क्यों चुनें',
    drivingTechnological: 'उद्देश्यपूर्ण नवाचार के माध्यम से तकनीकी प्रगति को आगे बढ़ाना',
    aiInnovation: 'AI नवाचार',
    aiInnovationDesc: 'वास्तविक दुनिया की समस्याओं के लिए अत्याधुनिक कृत्रिम बुद्धिमत्ता समाधान',
    iotExcellence: 'IoT उत्कृष्टता',
    iotExcellenceDesc: 'स्मार्ट कनेक्टेड सिस्टम जो भौतिक और डिजिटल दुनिया को जोड़ते हैं',
    globalImpact: 'वैश्विक प्रभाव',
    globalImpactDesc: 'सामाजिक कल्याण और सतत विकास पर केंद्रित प्रौद्योगिकी समाधान',
    
    // Projects Section
    featuredProjects: 'विशेष परियोजनाएं',
    innovativeSolutions: 'सामाजिक प्रभाव के लिए AI, IoT, और क्लाउड प्रौद्योगिकियों में नवाचार समाधान',
    viewAllProjects: 'सभी परियोजनाएं देखें',
    
    // Project Titles and Descriptions
    thoraxiqTitle: 'ThoraxIQ - AI छाती X-ray विश्लेषण',
    thoraxiqDesc: 'बेहतर स्वास्थ्य निदान के लिए AI-संचालित छाती X-ray असामान्यता पहचान प्रणाली',
    smartAgricultureTitle: 'स्मार्ट कृषि IoT प्लेटफॉर्म',
    smartAgricultureDesc: 'वास्तविक समय निगरानी और स्वचालित सिंचाई के साथ सटीक खेती के लिए IoT समाधान',
    healthTechTitle: 'स्वास्थ्य तकनीक पहुंच प्लेटफॉर्म',
    healthTechDesc: 'कम सेवा वाले समुदायों के लिए पहुंच और समावेश पर केंद्रित डिजिटल स्वास्थ्य समाधान',
    
    // Skills Section
    skillsExpertise: 'कौशल और विशेषज्ञता',
    technologiesIWork: 'तकनीकें जिनके साथ मैं काम करता हूं',
    learnMoreAboutMe: 'मेरे बारे में और जानें',
    
    // Footer
    allRightsReserved: 'सभी अधिकार सुरक्षित।',
    builtWith: 'के साथ बनाया गया',
    and: 'और'
  },
  zh: {
    // Navigation
    home: '首页',
    about: '关于',
    projects: '项目',
    blog: '博客',
    contact: '联系',
    portfolio: '作品集',
    language: '语言',
    theme: '主题',
    
    // Hero Section
    heroTitle: '你好，我是彼得·穆拉亚',
    heroSubtitle: 'IoT和云解决方案开发者',
    heroTagline: '全球发展技术',
    heroDescription: '热衷于利用技术促进全球发展、包容性和数字创新。专注于智能农业、健康技术和AI驱动的解决方案。',
    viewMyWork: '查看我的作品',
    getInTouch: '联系我',
    
    // Features Section
    whyChooseInnovation: '为什么选择创新',
    drivingTechnological: '通过有目的的创新推动技术进步',
    aiInnovation: 'AI创新',
    aiInnovationDesc: '为现实世界问题提供尖端人工智能解决方案',
    iotExcellence: 'IoT卓越',
    iotExcellenceDesc: '连接物理和数字世界的智能连接系统',
    globalImpact: '全球影响',
    globalImpactDesc: '专注于社会公益和可持续发展的技术解决方案',
    
    // Projects Section
    featuredProjects: '精选项目',
    innovativeSolutions: 'AI、IoT和云技术的创新解决方案，产生社会影响',
    viewAllProjects: '查看所有项目',
    
    // Project Titles and Descriptions
    thoraxiqTitle: 'ThoraxIQ - AI胸部X光分析',
    thoraxiqDesc: 'AI驱动的胸部X光异常检测系统，改善医疗诊断',
    smartAgricultureTitle: '智能农业IoT平台',
    smartAgricultureDesc: '用于精准农业的IoT解决方案，具有实时监测和自动灌溉功能',
    healthTechTitle: '健康技术可及性平台',
    healthTechDesc: '专注于服务不足社区可及性和包容性的数字健康解决方案',
    
    // Skills Section
    skillsExpertise: '技能与专业知识',
    technologiesIWork: '我使用的技术',
    learnMoreAboutMe: '了解更多关于我',
    
    // Footer
    allRightsReserved: '版权所有。',
    builtWith: '构建于',
    and: '和'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
