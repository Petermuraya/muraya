
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const useChatbotHelpers = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentPageInfo = useCallback(() => {
    switch (location.pathname) {
      case '/':
        return {
          page: 'Home',
          description: 'Main landing page with hero section, featured projects, and skills overview',
          suggestions: ['Learn more about Peter', 'View projects', 'See skills and expertise']
        };
      case '/about':
        return {
          page: 'About',
          description: 'Detailed information about Peter\'s background, experience, and certifications',
          suggestions: ['View experience', 'See certifications', 'Learn about values']
        };
      case '/projects':
        return {
          page: 'Projects',
          description: 'Portfolio showcasing Peter\'s completed projects and technical work',
          suggestions: ['Filter projects', 'View project details', 'See technologies used']
        };
      case '/contact':
        return {
          page: 'Contact',
          description: 'Get in touch with Peter for collaborations and opportunities',
          suggestions: ['Send a message', 'View contact information', 'Connect on social media']
        };
      case '/blog':
        return {
          page: 'Blog',
          description: 'Technical articles, insights, and thoughts on development',
          suggestions: ['Read recent posts', 'Browse categories', 'Search articles']
        };
      default:
        return {
          page: 'Unknown',
          description: 'Current page information not available',
          suggestions: ['Go to home page', 'Navigate to about', 'View projects']
        };
    }
  }, [location.pathname]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return true;
    }
    return false;
  }, []);

  const navigateWithFeedback = useCallback((path: string) => {
    navigate(path);
    return `Navigating to ${path}...`;
  }, [navigate]);

  const getCommonQuestions = useCallback(() => {
    const currentPage = getCurrentPageInfo();
    
    const globalQuestions = [
      "What does Peter specialize in?",
      "How can I contact Peter?",
      "What projects has Peter worked on?",
      "What are Peter's technical skills?",
      "Is Peter available for freelance work?",
      "Where is Peter located?",
      "What is Peter's experience in IoT?",
      "How can I hire Peter?"
    ];

    const pageSpecificQuestions: { [key: string]: string[] } = {
      '/': [
        "Tell me about the featured projects",
        "What services does Peter offer?",
        "Show me Peter's skills"
      ],
      '/about': [
        "What is Peter's educational background?",
        "What certifications does Peter have?",
        "What are Peter's core values?"
      ],
      '/projects': [
        "What technologies does Peter use?",
        "Show me IoT projects",
        "What's Peter's latest project?"
      ],
      '/contact': [
        "What's the best way to reach Peter?",
        "How quickly does Peter respond?",
        "What information should I include in my message?"
      ],
      '/blog': [
        "What topics does Peter write about?",
        "Show me recent articles",
        "Does Peter write about IoT?"
      ]
    };

    return [
      ...globalQuestions,
      ...(pageSpecificQuestions[location.pathname] || [])
    ];
  }, [location.pathname, getCurrentPageInfo]);

  return {
    getCurrentPageInfo,
    scrollToSection,
    navigateWithFeedback,
    getCommonQuestions
  };
};

export default useChatbotHelpers;
