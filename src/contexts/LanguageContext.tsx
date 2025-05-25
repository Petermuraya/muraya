
import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'sw' | 'fr' | 'hi' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    blog: 'Blog',
    contact: 'Contact',
    portfolio: 'Portfolio',
    language: 'Language',
    theme: 'Theme'
  },
  sw: {
    home: 'Nyumbani',
    about: 'Kuhusu',
    projects: 'Miradi',
    blog: 'Blogu',
    contact: 'Mawasiliano',
    portfolio: 'Kazi Zangu',
    language: 'Lugha',
    theme: 'Mandhari'
  },
  fr: {
    home: 'Accueil',
    about: 'À propos',
    projects: 'Projets',
    blog: 'Blog',
    contact: 'Contact',
    portfolio: 'Portfolio',
    language: 'Langue',
    theme: 'Thème'
  },
  hi: {
    home: 'होम',
    about: 'के बारे में',
    projects: 'परियोजनाएं',
    blog: 'ब्लॉग',
    contact: 'संपर्क',
    portfolio: 'पोर्टफोलियो',
    language: 'भाषा',
    theme: 'थीम'
  },
  zh: {
    home: '首页',
    about: '关于',
    projects: '项目',
    blog: '博客',
    contact: '联系',
    portfolio: '作品集',
    language: '语言',
    theme: '主题'
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
