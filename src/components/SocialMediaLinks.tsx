
import { Github, Linkedin, Twitter, Globe, Mail, Instagram, Facebook, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  category: 'tech' | 'social' | 'professional' | 'contact';
  verified?: boolean;
}

const SocialMediaLinks = () => {
  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/petermuraya',
      icon: <Github className="w-5 h-5" />,
      color: 'hover:bg-gray-800 hover:text-white',
      category: 'tech',
      verified: true
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/peter-muraya-ndungu/',
      icon: <Linkedin className="w-5 h-5" />,
      color: 'hover:bg-blue-700 hover:text-white',
      category: 'professional',
      verified: true
    },
    {
      name: 'Twitter (X)',
      url: 'https://x.com/sammie1604',
      icon: <Twitter className="w-5 h-5" />,
      color: 'hover:bg-blue-500 hover:text-white',
      category: 'tech',
      verified: true
    },
    {
      name: 'Portfolio',
      url: 'https://petermuraya.lovable.app',
      icon: <Globe className="w-5 h-5" />,
      color: 'hover:bg-green-600 hover:text-white',
      category: 'professional'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/murayandungu/',
      icon: <Instagram className="w-5 h-5" />,
      color: 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white',
      category: 'social'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/sammy.wailer.319',
      icon: <Facebook className="w-5 h-5" />,
      color: 'hover:bg-blue-700 hover:text-white',
      category: 'social'
    }
  ];

  const prioritizedLinks = socialLinks.sort((a, b) => {
    // Prioritize tech and professional links
    const priority = { tech: 1, professional: 2, social: 3, contact: 4 };
    return priority[a.category] - priority[b.category];
  });

  const techLinks = prioritizedLinks.filter(link => link.category === 'tech');
  const professionalLinks = prioritizedLinks.filter(link => link.category === 'professional');
  const socialLinks_filtered = prioritizedLinks.filter(link => link.category === 'social');

  return (
    <div className="space-y-6">
      {/* Tech & Development (Highest Priority for SEO) */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tech & Development</h3>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            SEO Priority
          </Badge>
        </div>
        <div className="flex flex-wrap gap-3">
          {techLinks.map(link => (
            <Button
              key={link.name}
              asChild
              variant="outline"
              className={`relative transition-all duration-300 ${link.color} border-2 hover:border-current hover:scale-105 hover:shadow-lg`}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                {link.icon}
                <span>{link.name}</span>
                {link.verified && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </a>
            </Button>
          ))}
        </div>
      </div>

      {/* Professional Networks */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Professional</h3>
        <div className="flex flex-wrap gap-3">
          {professionalLinks.map(link => (
            <Button
              key={link.name}
              asChild
              variant="outline"
              className={`relative transition-all duration-300 ${link.color} border-2 hover:border-current hover:scale-105 hover:shadow-lg`}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                {link.icon}
                <span>{link.name}</span>
                {link.verified && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </a>
            </Button>
          ))}
        </div>
      </div>

      {/* Social Media */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Social Media</h3>
        <div className="flex flex-wrap gap-3">
          {socialLinks_filtered.map(link => (
            <Button
              key={link.name}
              asChild
              variant="outline"
              className={`transition-all duration-300 ${link.color} border-2 hover:border-current hover:scale-105 hover:shadow-lg`}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            </Button>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h3>
        <div className="space-y-3">
          <Button
            asChild
            variant="outline"
            className="w-full justify-start bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-800/30 dark:hover:to-cyan-800/30"
          >
            <a
              href="mailto:sammypeter1944@gmail.com"
              className="flex items-center space-x-3 text-blue-700 dark:text-blue-300"
            >
              <Mail className="w-5 h-5" />
              <span>sammypeter1944@gmail.com</span>
            </a>
          </Button>
          
          <Button
            asChild
            variant="outline"
            className="w-full justify-start bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700 hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/30 dark:hover:to-emerald-800/30"
          >
            <a
              href="tel:+254700471113"
              className="flex items-center space-x-3 text-green-700 dark:text-green-300"
            >
              <Phone className="w-5 h-5" />
              <span>+254 700 471113</span>
            </a>
          </Button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <a
            href="mailto:sammypeter1944@gmail.com"
            className="flex items-center justify-center space-x-2"
          >
            <Mail className="w-5 h-5" />
            <span>Get in Touch for IoT Collaborations</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
