
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Github, 
  Facebook, 
  Globe,
  Edit,
  Save,
  X,
  ExternalLink
} from 'lucide-react';

interface SocialLink {
  platform: string;
  url: string;
  username: string;
  icon: React.ReactNode;
  color: string;
}

const SocialLinksManager = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      platform: 'GitHub',
      url: 'https://github.com/petermuraya',
      username: 'petermuraya',
      icon: <Github className="w-5 h-5" />,
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/peter-muraya-ndungu/',
      username: 'peter-muraya-ndungu',
      icon: <Linkedin className="w-5 h-5" />,
      color: 'hover:text-blue-600'
    },
    {
      platform: 'Twitter',
      url: 'https://x.com/sammie1604',
      username: '@sammie1604',
      icon: <Twitter className="w-5 h-5" />,
      color: 'hover:text-blue-400'
    },
    {
      platform: 'Instagram',
      url: 'https://instagram.com/murayandungu',
      username: '@murayandungu',
      icon: <Instagram className="w-5 h-5" />,
      color: 'hover:text-pink-500'
    },
    {
      platform: 'Facebook',
      url: '',
      username: '',
      icon: <Facebook className="w-5 h-5" />,
      color: 'hover:text-blue-700'
    },
    {
      platform: 'Dev.to',
      url: '',
      username: '',
      icon: <Globe className="w-5 h-5" />,
      color: 'hover:text-green-600'
    }
  ]);
  const [editedLinks, setEditedLinks] = useState<SocialLink[]>(socialLinks);

  useEffect(() => {
    const savedLinks = localStorage.getItem('socialLinks');
    if (savedLinks) {
      const parsed = JSON.parse(savedLinks);
      // Merge with default structure to maintain icons and colors
      const mergedLinks = socialLinks.map(defaultLink => {
        const savedLink = parsed.find((link: SocialLink) => link.platform === defaultLink.platform);
        return savedLink ? { ...defaultLink, ...savedLink } : defaultLink;
      });
      setSocialLinks(mergedLinks);
      setEditedLinks(mergedLinks);
    }
  }, []);

  const handleSave = () => {
    setSocialLinks(editedLinks);
    localStorage.setItem('socialLinks', JSON.stringify(editedLinks));
    setIsEditing(false);
    toast({
      title: "Social Links Updated",
      description: "Your social media links have been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditedLinks(socialLinks);
    setIsEditing(false);
  };

  const updateLink = (index: number, field: 'url' | 'username', value: string) => {
    const updated = [...editedLinks];
    updated[index] = { ...updated[index], [field]: value };
    setEditedLinks(updated);
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Social Media Links</span>
          </CardTitle>
          <div className="flex space-x-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Links
              </Button>
            ) : (
              <>
                <Button onClick={handleSave} size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(isEditing ? editedLinks : socialLinks).map((link, index) => (
            <div key={link.platform} className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className={`${link.color} transition-colors`}>
                  {link.icon}
                </span>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {link.platform}
                </h3>
              </div>
              
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    placeholder={`${link.platform} URL`}
                    value={link.url}
                    onChange={(e) => updateLink(index, 'url', e.target.value)}
                  />
                  <Input
                    placeholder={`${link.platform} username`}
                    value={link.username}
                    onChange={(e) => updateLink(index, 'username', e.target.value)}
                  />
                </div>
              ) : (
                <>
                  {link.url ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 text-gray-600 dark:text-gray-300 ${link.color} transition-colors group`}
                    >
                      <span>{link.username || link.url}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <p className="text-gray-400 dark:text-gray-500 text-sm">
                      Not configured
                    </p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialLinksManager;
