
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Settings } from 'lucide-react';

interface SectionConfig {
  id?: string;
  section: string;
  title: string;
  subtitle: string;
  enabled: boolean;
}

const FeaturedSectionManager = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<SectionConfig>({
    section: 'projects',
    title: 'Featured Projects',
    subtitle: 'Innovative solutions in AI, IoT, and cloud technologies for social impact',
    enabled: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('featured_section_config')
        .select('*')
        .eq('section', 'projects')
        .single();

      if (error) {
        console.log('No existing config found, using defaults');
      } else if (data) {
        setConfig(data);
      }
    } catch (error) {
      console.error('Error fetching config:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('featured_section_config')
        .upsert({
          section: 'projects',
          title: config.title,
          subtitle: config.subtitle,
          enabled: config.enabled
        }, { onConflict: 'section' });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save configuration",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Featured section configuration saved successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save configuration",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-[#161b22] border-[#30363d]">
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#161b22] border-[#30363d]">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Featured Projects Section</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="enabled"
            checked={config.enabled}
            onCheckedChange={(checked) => setConfig({ ...config, enabled: checked })}
          />
          <Label htmlFor="enabled" className="text-white">
            Enable Featured Projects Section
          </Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title" className="text-white">Section Title</Label>
          <Input
            id="title"
            placeholder="Featured Projects"
            value={config.title}
            onChange={(e) => setConfig({ ...config, title: e.target.value })}
            className="bg-[#0d1117] border-[#30363d] text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle" className="text-white">Section Subtitle</Label>
          <Textarea
            id="subtitle"
            placeholder="Innovative solutions in AI, IoT, and cloud technologies for social impact"
            value={config.subtitle}
            onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
            className="bg-[#0d1117] border-[#30363d] text-white"
            rows={3}
          />
        </div>

        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="w-full"
        >
          {isSaving ? 'Saving...' : 'Save Configuration'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeaturedSectionManager;
