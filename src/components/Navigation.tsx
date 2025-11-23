import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code, Home, Info, Briefcase, Mail, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState<string>("/");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keep activePath in sync with route changes
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  // Scroll-spy: when on homepage, observe sections with ids and update active nav
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));
    if (sections.length === 0) return;

    const idToPath = (id: string) => {
      // map common section ids to nav paths
      const map: Record<string, string> = {
        home: '/',
        about: '/about',
        projects: '/projects',
        work: '/projects',
        contact: '/contact'
      };
      return map[id] || '/';
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id') || '';
            setActivePath(idToPath(id));
          }
        });
      },
      { root: null, threshold: 0.25, rootMargin: '0px 0px -40% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Work', path: '/projects', icon: Briefcase },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  const { language, setLanguage, t } = useLanguage();
  const [showLang, setShowLang] = useState(false);
  const languages: { label: string; code: string }[] = [
    { label: 'EN', code: 'en' },
    { label: 'SW', code: 'sw' },
    { label: 'FR', code: 'fr' },
    { label: 'HI', code: 'hi' },
    { label: 'ZH', code: 'zh' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
      scrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Code className="w-6 h-6 text-accent group-hover:opacity-80 transition-smooth" />
            <span className="font-semibold text-base text-foreground">
              Peter Muraya
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activePath === item.path;
              const baseClasses = "flex items-center space-x-1 min-h-[44px] px-4 py-2 rounded-md text-sm font-medium transition-smooth";
              const activeClasses = active
                ? 'bg-accent text-accent-foreground'
                : 'text-foreground/80 hover:text-foreground hover:bg-secondary';
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${baseClasses} ${activeClasses}`}
                  aria-current={active ? 'page' : undefined}
                  aria-label={item.name}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-2 relative">
            <ThemeToggle />
            {/* Language switcher (desktop) */}
            <div className="hidden md:block relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLang((s) => !s)}
                aria-haspopup="menu"
                aria-expanded={showLang}
                aria-label={t('language') || 'Language'}
              >
                {language.toUpperCase()}
              </Button>
              {showLang && (
                <div className="absolute right-0 mt-2 w-36 bg-card border border-border rounded-md shadow-md z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary ${language === l.code ? 'font-semibold' : ''}`}
                      onClick={() => {
                        setLanguage(l.code as any);
                        setShowLang(false);
                      }}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div id="mobile-nav" className="px-2 pt-2 pb-3 space-y-1 bg-card border-b border-border rounded-lg mt-2 shadow-sm" role="menu" aria-label="Mobile navigation">
              {/* language options in mobile menu */}
              <div className="px-3 py-2 border-b border-border">
                <div className="text-xs text-secondary mb-2">{t('language') || 'Language'}</div>
                <div className="flex space-x-2">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLanguage(l.code as any)}
                      className={`px-2 py-1 rounded-md text-sm ${language === l.code ? 'bg-accent text-accent-foreground' : 'text-foreground/80 hover:bg-secondary'}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = activePath === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 min-h-[44px] px-3 py-2 rounded-md text-base font-medium transition-smooth ${
                      active
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground/80 hover:text-foreground hover:bg-secondary'
                    }`}
                    onClick={() => setIsOpen(false)}
                    role="menuitem"
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
