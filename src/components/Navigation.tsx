
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Languages, Menu, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import ThemeToggle from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('home'), path: '/', icon: '🏠' },
    { name: t('about'), path: '/about', icon: '👨‍💼' },
    { name: t('projects'), path: '/projects', icon: '🚀' },
    { name: t('blog'), path: '/blog', icon: '📝' },
    { name: t('contact'), path: '/contact', icon: '📡' },
  ];

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  return (
    <>
      {/* Futuristic Navigation Bar */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        scrolled 
          ? "bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_8px_32px_rgba(6,182,212,0.1)]" 
          : "bg-transparent backdrop-blur-sm"
      )}>
        {/* Animated border gradient */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
        
        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo section with holographic effect */}
            <Link to="/" className="flex items-center space-x-4 group relative">
              {/* Holographic glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <div className="relative">
                <img 
                  src="https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg" 
                  alt="Peter Muraya Ndung'u" 
                  className="w-12 h-12 rounded-xl object-cover border-2 border-cyan-400/40 group-hover:border-cyan-400/80 transition-all duration-500 group-hover:scale-110 shadow-lg group-hover:shadow-cyan-400/25"
                  loading="eager"
                  width="48"
                  height="48"
                />
                {/* Scanning line effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-xl" />
              </div>
              
              <div className="relative">
                <span className="text-xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-purple-400 transition-all duration-500">
                  Peter Muraya
                </span>
                <div className="text-xs text-cyan-400/70 font-medium tracking-wider">
                  IoT • AI • Innovation
                </div>
                {/* Typing cursor effect */}
                <div className="absolute -right-1 top-0 w-0.5 h-4 bg-cyan-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Navigation Items with futuristic design */}
              <div className="flex space-x-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "relative px-6 py-3 text-sm font-medium transition-all duration-300 rounded-lg group overflow-hidden",
                      "hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10",
                      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-400/0 before:via-cyan-400/20 before:to-cyan-400/0 before:translate-x-[-100%] before:transition-transform before:duration-500 hover:before:translate-x-[100%]",
                      location.pathname === item.path
                        ? "text-cyan-400 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30"
                        : "text-gray-300 hover:text-white border border-transparent hover:border-cyan-400/20"
                    )}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                    
                    {/* Active indicator with pulse effect */}
                    {location.pathname === item.path && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse" />
                      </div>
                    )}
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                ))}
              </div>

              {/* Control Panel */}
              <div className="flex items-center space-x-4 pl-4 border-l border-cyan-400/20">
                {/* Theme Toggle with enhanced design */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <ThemeToggle className="relative bg-gray-800/50 border-cyan-400/30 hover:border-cyan-400/60 hover:bg-cyan-500/10" />
                </div>

                {/* Language Selector with futuristic design */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative bg-gray-800/50 border border-cyan-400/30 hover:border-cyan-400/60 hover:bg-cyan-500/10 text-gray-300 hover:text-white transition-all duration-300 group"
                      title={t('language')}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Languages className="h-5 w-5 relative z-10" />
                      <Zap className="absolute top-1 right-1 h-2 w-2 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-48 bg-gray-900/95 backdrop-blur-xl border border-cyan-400/30 shadow-xl shadow-cyan-400/10"
                  >
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={cn(
                          "cursor-pointer transition-all duration-200 hover:bg-cyan-500/10 hover:text-cyan-200 group",
                          language === lang.code && "bg-cyan-500/20 text-cyan-300 border-l-2 border-cyan-400"
                        )}
                      >
                        <span className="mr-3 text-lg">{lang.flag}</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">{lang.name}</span>
                        {language === lang.code && (
                          <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Mobile menu button with enhanced design */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative p-3 text-gray-300 hover:text-white bg-gray-800/50 border border-cyan-400/30 hover:border-cyan-400/60 rounded-lg transition-all duration-300 group"
              aria-label="Toggle navigation menu"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 w-6 h-6">
                {isOpen ? (
                  <X className="w-6 h-6 transform transition-transform duration-300 rotate-0 group-hover:rotate-90" />
                ) : (
                  <Menu className="w-6 h-6 transform transition-transform duration-300 group-hover:scale-110" />
                )}
              </div>
            </button>
          </div>

          {/* Mobile Navigation with enhanced design */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-xl border border-cyan-400/20 rounded-xl mt-4 shadow-xl shadow-cyan-400/10">
                {/* Mobile nav items */}
                {navItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg group relative overflow-hidden",
                      "hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10",
                      "before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-cyan-400 before:to-blue-400 before:transform before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100",
                      location.pathname === item.path
                        ? "text-cyan-400 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30"
                        : "text-gray-300 hover:text-white border border-transparent hover:border-cyan-400/20"
                    )}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                    
                    {location.pathname === item.path && (
                      <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    )}
                  </Link>
                ))}
                
                {/* Mobile controls */}
                <div className="px-4 py-3 border-t border-cyan-400/20 mt-4">
                  <div className="flex items-center justify-between space-x-4">
                    <ThemeToggle className="bg-gray-800/50 border-cyan-400/30 hover:border-cyan-400/60" />
                    
                    {/* Mobile language selector */}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                        <Languages className="h-4 w-4 mr-2" />
                        {t('language')}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setIsOpen(false);
                            }}
                            className={cn(
                              "flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-all duration-200 border",
                              language === lang.code
                                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/40"
                                : "text-gray-400 hover:text-white hover:bg-gray-800/50 border-gray-700 hover:border-cyan-400/30"
                            )}
                          >
                            <span>{lang.flag}</span>
                            <span className="truncate">{lang.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-20" />
    </>
  );
};

export default Navigation;
