
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Globe, Plus, Edit, Trash2, Mail, MessageSquare, Video, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuickLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  category: string;
}

const QuickAccessWidget = ({ widgetId }: { widgetId?: string }) => {
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newLink, setNewLink] = useState<Partial<QuickLink>>({
    category: 'work'
  });
  const { toast } = useToast();

  const defaultLinks: QuickLink[] = [
    { id: '1', name: 'Gmail', url: 'https://gmail.com', icon: 'Mail', category: 'communication' },
    { id: '2', name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'MessageSquare', category: 'ai' },
    { id: '3', name: 'YouTube', url: 'https://youtube.com', icon: 'Video', category: 'media' },
    { id: '4', name: 'Google', url: 'https://google.com', icon: 'Search', category: 'search' },
  ];

  useEffect(() => {
    loadQuickLinks();
  }, []);

  const loadQuickLinks = () => {
    const saved = localStorage.getItem('quick_access_links');
    if (saved) {
      setQuickLinks(JSON.parse(saved));
    } else {
      setQuickLinks(defaultLinks);
      localStorage.setItem('quick_access_links', JSON.stringify(defaultLinks));
    }
  };

  const saveQuickLinks = (links: QuickLink[]) => {
    setQuickLinks(links);
    localStorage.setItem('quick_access_links', JSON.stringify(links));
  };

  const addQuickLink = () => {
    if (!newLink.name || !newLink.url) {
      toast({
        title: "Missing Information",
        description: "Please enter name and URL",
        variant: "destructive",
      });
      return;
    }

    const link: QuickLink = {
      id: Date.now().toString(),
      name: newLink.name!,
      url: newLink.url!.startsWith('http') ? newLink.url! : `https://${newLink.url}`,
      icon: newLink.icon || 'Globe',
      category: newLink.category!
    };

    saveQuickLinks([...quickLinks, link]);
    setNewLink({ category: 'work' });
    setIsAdding(false);
    
    toast({
      title: "Link Added",
      description: `${link.name} added to quick access`,
    });
  };

  const deleteQuickLink = (linkId: string) => {
    saveQuickLinks(quickLinks.filter(l => l.id !== linkId));
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Globe, Mail, MessageSquare, Video, Search
    };
    return icons[iconName] || Globe;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      communication: 'text-blue-400',
      ai: 'text-purple-400',
      media: 'text-red-400',
      search: 'text-green-400',
      work: 'text-orange-400',
      personal: 'text-cyan-400'
    };
    return colors[category as keyof typeof colors] || 'text-gray-400';
  };

  if (isAdding) {
    return (
      <div className="space-y-3">
        <Input
          placeholder="Link name"
          value={newLink.name || ''}
          onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
          className="bg-[#21262d] border-[#30363d] text-white"
        />
        <Input
          placeholder="URL"
          value={newLink.url || ''}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          className="bg-[#21262d] border-[#30363d] text-white"
        />
        <select
          value={newLink.category}
          onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
          className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded text-white"
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="communication">Communication</option>
          <option value="ai">AI Tools</option>
          <option value="media">Media</option>
          <option value="search">Search</option>
        </select>
        <div className="flex gap-2">
          <Button onClick={addQuickLink} size="sm" className="bg-blue-600 hover:bg-blue-700">
            Add
          </Button>
          <Button onClick={() => setIsAdding(false)} size="sm" variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-medium flex items-center">
          <Globe className="w-4 h-4 mr-2" />
          Quick Access
        </h3>
        <Button
          onClick={() => setIsAdding(true)}
          size="sm"
          variant="ghost"
          className="text-blue-400 hover:text-blue-300"
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {quickLinks.slice(0, 8).map(link => {
          const Icon = getIcon(link.icon);
          return (
            <Button
              key={link.id}
              onClick={() => window.open(link.url, '_blank')}
              variant="ghost"
              size="sm"
              className="h-auto p-2 flex flex-col items-center gap-1 hover:bg-[#21262d] group"
            >
              <Icon className={`w-4 h-4 ${getCategoryColor(link.category)} group-hover:scale-110 transition-transform`} />
              <span className="text-xs text-white truncate w-full text-center">
                {link.name}
              </span>
            </Button>
          );
        })}
      </div>

      {quickLinks.length > 8 && (
        <p className="text-[#7d8590] text-xs text-center">
          +{quickLinks.length - 8} more links
        </p>
      )}
    </div>
  );
};

export default QuickAccessWidget;
