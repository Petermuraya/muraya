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
    
    // About Page
    aboutPageTitle: 'About Peter Muraya',
    aboutPageDescription: 'Learn more about my background, experience, and passion for technology',
    aboutMeTitle: 'About Me',
    background: 'Background',
    education: 'Education',
    experience: 'Experience',
    skills: 'Skills',
    certifications: 'Certifications',
    
    // Projects Page
    projectsPageTitle: 'My Projects',
    projectsPageDescription: 'Explore my portfolio of innovative technology solutions',
    allProjects: 'All Projects',
    technologiesUsed: 'Technologies Used',
    
    // Blog Page
    blogPageTitle: 'Peter Muraya Blog',
    blogPageDescription: 'Insights, tutorials, and thoughts on technology and innovation',
    readMore: 'Read More',
    publishedOn: 'Published on',
    
    // Contact Page
    contactPageTitle: 'Contact Peter Muraya',
    contactPageDescription: 'Get in touch for collaborations, opportunities, or just to say hello',
    getInTouchTitle: 'Get In Touch',
    sendMessage: 'Send Message',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    phone: 'Phone',
    location: 'Location',
    
    // 404 Page
    pageNotFound: 'Page Not Found',
    oopsPageNotFound: 'Oops! Page not found',
    returnToHome: 'Return to Home',
    
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
    
    // Voice Assistant
    voiceAssistant: 'Voice Assistant',
    listening: 'Listening...',
    speaking: 'Speaking...',
    readyToHelp: 'Ready to help',
    voiceInputReceived: 'Voice input received',
    voiceRecognitionError: 'Voice recognition error',
    voiceRecognitionNotSupported: 'Voice recognition not supported in this browser',
    listeningForVoiceInput: 'Listening for voice input',
    navigatingTo: 'Navigating to',
    textToSpeechEnabled: 'Text to speech enabled',
    textToSpeechDisabled: 'Text to speech disabled',
    
    // Accessibility
    screenReaderMode: 'Screen Reader Enhanced',
    highContrast: 'High Contrast',
    fontSize: 'Font Size',
    voiceAssistance: 'Voice Assistant',
    accessibilityOptions: 'Accessibility Options',
    closeAccessibilityToolbar: 'Close accessibility toolbar',
    openAccessibilityToolbar: 'Open accessibility toolbar',
    accessibilityToolbarOpened: 'Accessibility toolbar opened',
    accessibilityToolbarClosed: 'Accessibility toolbar closed',
    screenReaderModeEnabled: 'Screen reader mode enabled',
    screenReaderModeDisabled: 'Screen reader mode disabled',
    highContrastEnabled: 'High contrast enabled',
    highContrastDisabled: 'High contrast disabled',
    fontSizeChangedTo: 'Font size changed to',
    voiceAssistanceEnabled: 'Voice assistance enabled',
    voiceAssistanceDisabled: 'Voice assistance disabled',
    keyboardNavigation: 'Press Tab to navigate, Enter to activate',
    skipToMainContent: 'Skip to main content',
    
    // Footer
    allRightsReserved: 'All rights reserved.',
    builtWith: 'Built with',
    and: 'and',
    
    // Admin
    adminAccess: 'Admin Access',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signingIn: 'Signing in...',
    loginSuccessful: 'Login Successful',
    loginFailed: 'Login Failed',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    secretCode: 'Secret Code',
    createAccount: 'Create Account',
    needAdminAccess: 'Need admin access? Register here',
    alreadyHaveAccount: 'Already have an account? Login here'
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
    
    // About Page
    aboutPageTitle: 'Kuhusu Peter Muraya',
    aboutPageDescription: 'Jifunze zaidi kuhusu mazingira yangu, uzoefu, na shauku ya teknolojia',
    aboutMeTitle: 'Kunihusu',
    background: 'Mazingira',
    education: 'Elimu',
    experience: 'Uzoefu',
    skills: 'Ujuzi',
    certifications: 'Vyeti',
    
    // Projects Page
    projectsPageTitle: 'Miradi Yangu',
    projectsPageDescription: 'Chunguza kazi zangu za masuluhisho ya teknolojia ya uvumbuzi',
    allProjects: 'Miradi Yote',
    technologiesUsed: 'Teknolojia Zilizotumika',
    
    // Blog Page
    blogPageTitle: 'Blogu ya Peter Muraya',
    blogPageDescription: 'Maarifa, mafunzo, na mawazo kuhusu teknolojia na uvumbuzi',
    readMore: 'Soma Zaidi',
    publishedOn: 'Imechapishwa mnamo',
    
    // Contact Page
    contactPageTitle: 'Wasiliana na Peter Muraya',
    contactPageDescription: 'Wasiliana kwa ushirikiano, fursa, au kusema hujambo tu',
    getInTouchTitle: 'Wasiliana Nami',
    sendMessage: 'Tuma Ujumbe',
    name: 'Jina',
    email: 'Barua Pepe',
    message: 'Ujumbe',
    phone: 'Simu',
    location: 'Mahali',
    
    // 404 Page
    pageNotFound: 'Ukurasa Haujapatikana',
    oopsPageNotFound: 'Pole! Ukurasa haujapatikana',
    returnToHome: 'Rudi Nyumbani',
    
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
    
    // Voice Assistant
    voiceAssistant: 'Msaidizi wa Sauti',
    listening: 'Sikiliza...',
    speaking: 'Ninazungumza...',
    readyToHelp: 'Tayari kusaidia',
    voiceInputReceived: 'Ingizo la sauti limepokelewa',
    voiceRecognitionError: 'Hitilafu ya utambuzi wa sauti',
    voiceRecognitionNotSupported: 'Utambuzi wa sauti hauungwi mkono katika kivinjari hiki',
    listeningForVoiceInput: 'Sikiliza ingizo la sauti',
    navigatingTo: 'Kusonga kwa',
    textToSpeechEnabled: 'Maandishi hadi sauti yamewezeshwa',
    textToSpeechDisabled: 'Maandishi hadi sauti yamezimwa',
    
    // Accessibility
    screenReaderMode: 'Hali ya Msomaji wa Skrini Imeboreshwa',
    highContrast: 'Utofauti wa Juu',
    fontSize: 'Ukubwa wa Herufi',
    voiceAssistance: 'Msaidizi wa Sauti',
    accessibilityOptions: 'Chaguo za Upatikanaji',
    closeAccessibilityToolbar: 'Funga zana za upatikanaji',
    openAccessibilityToolbar: 'Fungua chaguo za upatikanaji',
    accessibilityToolbarOpened: 'Zana za upatikanaji zimefunguliwa',
    accessibilityToolbarClosed: 'Zana za upatikanaji zimefungwa',
    screenReaderModeEnabled: 'Hali ya msomaji wa skrini imewezeshwa',
    screenReaderModeDisabled: 'Hali ya msomaji wa skrini imezimwa',
    highContrastEnabled: 'Utofauti wa juu umewezeshwa',
    highContrastDisabled: 'Utofauti wa juu umezimwa',
    fontSizeChangedTo: 'Ukubwa wa herufi umebadilishwa hadi',
    voiceAssistanceEnabled: 'Msaidizi wa sauti umewezeshwa',
    voiceAssistanceDisabled: 'Msaidizi wa sauti umezimwa',
    keyboardNavigation: 'Bonyeza Tab kupitia, Enter kuamilisha',
    skipToMainContent: 'Ruka hadi maudhui makuu',
    
    // Footer
    allRightsReserved: 'Haki zote zimehifadhiwa.',
    builtWith: 'Imejengwa na',
    and: 'na',
    
    // Admin
    adminAccess: 'Ufikiaji wa Msimamizi',
    signIn: 'Ingia',
    signUp: 'Jisajili',
    signingIn: 'Kuingia...',
    loginSuccessful: 'Kuingia Kumefanikiwa',
    loginFailed: 'Kuingia Kumeshindwa',
    password: 'Nenosiri',
    confirmPassword: 'Thibitisha Nenosiri',
    secretCode: 'Msimbo wa Siri',
    createAccount: 'Tengeneza Akaunti',
    needAdminAccess: 'Unahitaji ufikiaji wa msimamizi? Jisajili hapa',
    alreadyHaveAccount: 'Una akaunti tayari? Ingia hapa'
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
    
    // About Page
    aboutPageTitle: 'À propos de Peter Muraya',
    aboutPageDescription: 'En savoir plus sur mon parcours, mon expérience et ma passion pour la technologie',
    aboutMeTitle: 'À Propos de Moi',
    background: 'Contexte',
    education: 'Éducation',
    experience: 'Expérience',
    skills: 'Compétences',
    certifications: 'Certifications',
    
    // Projects Page
    projectsPageTitle: 'Mes Projets',
    projectsPageDescription: 'Explorez mon portfolio de solutions technologiques innovantes',
    allProjects: 'Tous les Projets',
    technologiesUsed: 'Technologies Utilisées',
    
    // Blog Page
    blogPageTitle: 'Blog de Peter Muraya',
    blogPageDescription: 'Insights, tutoriels et réflexions sur la technologie et l\'innovation',
    readMore: 'Lire Plus',
    publishedOn: 'Publié le',
    
    // Contact Page
    contactPageTitle: 'Contacter Peter Muraya',
    contactPageDescription: 'Entrez en contact pour des collaborations, des opportunités ou juste pour dire bonjour',
    getInTouchTitle: 'Entrer en Contact',
    sendMessage: 'Envoyer un Message',
    name: 'Nom',
    email: 'Email',
    message: 'Message',
    phone: 'Téléphone',
    location: 'Lieu',
    
    // 404 Page
    pageNotFound: 'Page Non Trouvée',
    oopsPageNotFound: 'Oops! Page non trouvée',
    returnToHome: 'Retour à l\'Accueil',
    
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
    
    // Voice Assistant
    voiceAssistant: 'Assistant Vocal',
    listening: 'Écoute...',
    speaking: 'Parle...',
    readyToHelp: 'Prêt à aider',
    voiceInputReceived: 'Entrée vocale reçue',
    voiceRecognitionError: 'Erreur de reconnaissance vocale',
    voiceRecognitionNotSupported: 'Reconnaissance vocale non supportée dans ce navigateur',
    listeningForVoiceInput: 'Écoute de l\'entrée vocale',
    navigatingTo: 'Navigation vers',
    textToSpeechEnabled: 'Synthèse vocale activée',
    textToSpeechDisabled: 'Synthèse vocale désactivée',
    
    // Accessibility
    screenReaderMode: 'Mode Lecteur d\'Écran Amélioré',
    highContrast: 'Contraste Élevé',
    fontSize: 'Taille de Police',
    voiceAssistance: 'Assistant Vocal',
    accessibilityOptions: 'Options d\'Accessibilité',
    closeAccessibilityToolbar: 'Fermer la barre d\'outils d\'accessibilité',
    openAccessibilityToolbar: 'Ouvrir les options d\'accessibilité',
    accessibilityToolbarOpened: 'Barre d\'outils d\'accessibilité ouverte',
    accessibilityToolbarClosed: 'Barre d\'outils d\'accessibilité fermée',
    screenReaderModeEnabled: 'Mode lecteur d\'écran activé',
    screenReaderModeDisabled: 'Mode lecteur d\'écran désactivé',
    highContrastEnabled: 'Contraste élevé activé',
    highContrastDisabled: 'Contraste élevé désactivé',
    fontSizeChangedTo: 'Taille de police changée pour',
    voiceAssistanceEnabled: 'Assistant vocal activé',
    voiceAssistanceDisabled: 'Assistant vocal désactivé',
    keyboardNavigation: 'Appuyez sur Tab pour naviguer, Entrée pour activer',
    skipToMainContent: 'Aller au contenu principal',
    
    // Footer
    allRightsReserved: 'Tous droits réservés.',
    builtWith: 'Construit avec',
    and: 'et',
    
    // Admin
    adminAccess: 'Accès Administrateur',
    signIn: 'Se Connecter',
    signUp: 'S\'Inscrire',
    signingIn: 'Connexion...',
    loginSuccessful: 'Connexion Réussie',
    loginFailed: 'Connexion Échouée',
    password: 'Mot de Passe',
    confirmPassword: 'Confirmer le Mot de Passe',
    secretCode: 'Code Secret',
    createAccount: 'Créer un Compte',
    needAdminAccess: 'Besoin d\'un accès admin? S\'inscrire ici',
    alreadyHaveAccount: 'Vous avez déjà un compte? Se connecter ici'
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
    
    // About Page
    aboutPageTitle: 'पीटर मुराया के बारे में',
    aboutPageDescription: 'मेरी पृष्ठभूमि, अनुभव और तकनीक के लिए जुनून के बारे में और जानें',
    aboutMeTitle: 'मेरे बारे में',
    background: 'पृष्ठभूमि',
    education: 'शिक्षा',
    experience: 'अनुभव',
    skills: 'कौशल',
    certifications: 'प्रमाणपत्र',
    
    // Projects Page
    projectsPageTitle: 'मेरी परियोजनाएं',
    projectsPageDescription: 'अभिनव प्रौद्योगिकी समाधानों के मेरे पोर्टफोलियो का अन्वेषण करें',
    allProjects: 'सभी परियोजनाएं',
    technologiesUsed: 'उपयोग की गई तकनीकें',
    
    // Blog Page
    blogPageTitle: 'पीटर मुराया ब्लॉग',
    blogPageDescription: 'तकनीक और नवाचार पर अंतर्दृष्टि, ट्यूटोरियल और विचार',
    readMore: 'और पढ़ें',
    publishedOn: 'प्रकाशित',
    
    // Contact Page
    contactPageTitle: 'पीटर मुराया से संपर्क करें',
    contactPageDescription: 'सहयोग, अवसरों के लिए या बस हैलो कहने के लिए संपर्क करें',
    getInTouchTitle: 'संपर्क में रहें',
    sendMessage: 'संदेश भेजें',
    name: 'नाम',
    email: 'ईमेल',
    message: 'संदेश',
    phone: 'फोन',
    location: 'स्थान',
    
    // 404 Page
    pageNotFound: 'पृष्ठ नहीं मिला',
    oopsPageNotFound: 'ओह! पृष्ठ नहीं मिला',
    returnToHome: 'होम पर वापस जाएं',
    
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
    
    // Voice Assistant
    voiceAssistant: 'वॉयस असिस्टेंट',
    listening: 'सुन रहा है...',
    speaking: 'बोल रहा है...',
    readyToHelp: 'मदद के लिए तैयार',
    voiceInputReceived: 'वॉयस इनपुट प्राप्त हुआ',
    voiceRecognitionError: 'वॉयस पहचान त्रुटि',
    voiceRecognitionNotSupported: 'इस ब्राउज़र में वॉयस पहचान समर्थित नहीं है',
    listeningForVoiceInput: 'वॉयस इनपुट के लिए सुन रहा है',
    navigatingTo: 'नेविगेट कर रहा है',
    textToSpeechEnabled: 'टेक्स्ट टू स्पीच सक्षम',
    textToSpeechDisabled: 'टेक्स्ट टू स्पीच अक्षम',
    
    // Accessibility
    screenReaderMode: 'स्क्रीन रीडर मोड बेहतर',
    highContrast: 'उच्च कंट्रास्ट',
    fontSize: 'फ़ॉन्ट आकार',
    voiceAssistance: 'वॉयस असिस्टेंस',
    accessibilityOptions: 'पहुंच विकल्प',
    closeAccessibilityToolbar: 'पहुंच टूलबार बंद करें',
    openAccessibilityToolbar: 'पहुंच विकल्प खोलें',
    accessibilityToolbarOpened: 'पहुंच टूलबार खोला गया',
    accessibilityToolbarClosed: 'पहुंच टूलबार बंद किया गया',
    screenReaderModeEnabled: 'स्क्रीन रीडर मोड सक्षम',
    screenReaderModeDisabled: 'स्क्रीन रीडर मोड अक्षम',
    highContrastEnabled: 'उच्च कंट्रास्ट सक्षम',
    highContrastDisabled: 'उच्च कंट्रास्ट अक्षम',
    fontSizeChangedTo: 'फ़ॉन्ट आकार बदला गया',
    voiceAssistanceEnabled: 'वॉयस असिस्टेंस सक्षम',
    voiceAssistanceDisabled: 'वॉयस असिस्टेंस अक्षम',
    keyboardNavigation: 'नेविगेट करने के लिए Tab दबाएं, सक्रिय करने के लिए Enter',
    skipToMainContent: 'मुख्य सामग्री पर जाएं',
    
    // Footer
    allRightsReserved: 'सभी अधिकार सुरक्षित।',
    builtWith: 'के साथ बनाया गया',
    and: 'और',
    
    // Admin
    adminAccess: 'एडमिन एक्सेस',
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    signingIn: 'साइन इन हो रहे हैं...',
    loginSuccessful: 'लॉगिन सफल',
    loginFailed: 'लॉगिन विफल',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    secretCode: 'गुप्त कोड',
    createAccount: 'खाता बनाएं',
    needAdminAccess: 'एडमिन एक्सेस चाहिए? यहां रजिस्टर करें',
    alreadyHaveAccount: 'पहले से खाता है? यहां लॉगिन करें'
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
    
    // About Page
    aboutPageTitle: '关于彼得·穆拉亚',
    aboutPageDescription: '了解更多关于我的背景、经验和对技术的热情',
    aboutMeTitle: '关于我',
    background: '背景',
    education: '教育',
    experience: '经验',
    skills: '技能',
    certifications: '认证',
    
    // Projects Page
    projectsPageTitle: '我的项目',
    projectsPageDescription: '探索我的创新技术解决方案组合',
    allProjects: '所有项目',
    technologiesUsed: '使用的技术',
    
    // Blog Page
    blogPageTitle: '彼得·穆拉亚博客',
    blogPageDescription: '关于技术和创新的见解、教程和思考',
    readMore: '阅读更多',
    publishedOn: '发布于',
    
    // Contact Page
    contactPageTitle: '联系彼得·穆拉亚',
    contactPageDescription: '联系合作、机会或只是打个招呼',
    getInTouchTitle: '联系我',
    sendMessage: '发送消息',
    name: '姓名',
    email: '邮箱',
    message: '消息',
    phone: '电话',
    location: '位置',
    
    // 404 Page
    pageNotFound: '页面未找到',
    oopsPageNotFound: '哎呀！页面未找到',
    returnToHome: '返回首页',
    
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
    
    // Voice Assistant
    voiceAssistant: '语音助手',
    listening: '正在聆听...',
    speaking: '正在说话...',
    readyToHelp: '准备提供帮助',
    voiceInputReceived: '语音输入已接收',
    voiceRecognitionError: '语音识别错误',
    voiceRecognitionNotSupported: '此浏览器不支持语音识别',
    listeningForVoiceInput: '正在聆听语音输入',
    navigatingTo: '导航到',
    textToSpeechEnabled: '文字转语音已启用',
    textToSpeechDisabled: '文字转语音已禁用',
    
    // Accessibility
    screenReaderMode: '屏幕阅读器增强模式',
    highContrast: '高对比度',
    fontSize: '字体大小',
    voiceAssistance: '语音辅助',
    accessibilityOptions: '无障碍选项',
    closeAccessibilityToolbar: '关闭无障碍工具栏',
    openAccessibilityToolbar: '打开无障碍选项',
    accessibilityToolbarOpened: '无障碍工具栏已打开',
    accessibilityToolbarClosed: '无障碍工具栏已关闭',
    screenReaderModeEnabled: '屏幕阅读器模式已启用',
    screenReaderModeDisabled: '屏幕阅读器模式已禁用',
    highContrastEnabled: '高对比度已启用',
    highContrastDisabled: '高对比度已禁用',
    fontSizeChangedTo: '字体大小已更改为',
    voiceAssistanceEnabled: '语音辅助已启用',
    voiceAssistanceDisabled: '语音辅助已禁用',
    keyboardNavigation: '按Tab键导航，按Enter键激活',
    skipToMainContent: '跳转到主要内容',
    
    // Footer
    allRightsReserved: '版权所有。',
    builtWith: '构建于',
    and: '和',
    
    // Admin
    adminAccess: '管理员访问',
    signIn: '登录',
    signUp: '注册',
    signingIn: '正在登录...',
    loginSuccessful: '登录成功',
    loginFailed: '登录失败',
    password: '密码',
    confirmPassword: '确认密码',
    secretCode: '密码',
    createAccount: '创建账户',
    needAdminAccess: '需要管理员访问权限？在此注册',
    alreadyHaveAccount: '已有账户？在此登录'
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
