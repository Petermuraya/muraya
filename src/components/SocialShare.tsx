
import { useState } from 'react';
import { Share2, Twitter, Linkedin, Facebook, Copy, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
}

const SocialShare = ({ 
  url = window.location.href,
  title = document.title,
  description = "Check out this amazing IoT & AI portfolio",
  hashtags = ["IoT", "AI", "React", "TypeScript", "TechInnovation"]
}: SocialShareProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const hashtagString = hashtags.map(tag => `#${tag}`).join(' ');

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtags.join(',')}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Copied!",
        description: "URL copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      });
    }
  };

  const openShare = (platform: keyof typeof socialLinks) => {
    window.open(socialLinks[platform], '_blank', 'width=600,height=400');
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-32 right-8 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
        title="Share this page"
      >
        <Share2 className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-36 right-8 z-40 p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-gray-900 dark:text-white">Share</span>
        <Button
          onClick={() => setIsOpen(false)}
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700 p-1"
        >
          ×
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => openShare('twitter')}
          variant="outline"
          size="sm"
          className="flex items-center justify-center space-x-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          <Twitter className="w-4 h-4 text-blue-500" />
          <span>Twitter</span>
        </Button>
        
        <Button
          onClick={() => openShare('linkedin')}
          variant="outline"
          size="sm"
          className="flex items-center justify-center space-x-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          <Linkedin className="w-4 h-4 text-blue-700" />
          <span>LinkedIn</span>
        </Button>
        
        <Button
          onClick={() => openShare('facebook')}
          variant="outline"
          size="sm"
          className="flex items-center justify-center space-x-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          <Facebook className="w-4 h-4 text-blue-600" />
          <span>Facebook</span>
        </Button>
        
        <Button
          onClick={() => openShare('email')}
          variant="outline"
          size="sm"
          className="flex items-center justify-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <Mail className="w-4 h-4 text-gray-600" />
          <span>Email</span>
        </Button>
      </div>
      
      <Button
        onClick={copyToClipboard}
        variant="outline"
        size="sm"
        className="w-full mt-2 flex items-center justify-center space-x-2"
      >
        <Copy className="w-4 h-4" />
        <span>Copy Link</span>
      </Button>
    </Card>
  );
};

export default SocialShare;
