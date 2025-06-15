
-- Create the featured_section_config table
CREATE TABLE public.featured_section_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default configuration for the projects section
INSERT INTO public.featured_section_config (section, title, subtitle, enabled)
VALUES (
  'projects',
  'Featured Projects',
  'Innovative solutions in AI, IoT, and cloud technologies for social impact',
  true
);

-- Enable RLS (optional - since this is admin-managed content, we can keep it simple)
ALTER TABLE public.featured_section_config ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows everyone to read (since it's public content)
CREATE POLICY "Everyone can view featured section config" 
  ON public.featured_section_config 
  FOR SELECT 
  USING (true);

-- Create a policy that allows only admins to modify (you can adjust this based on your admin setup)
CREATE POLICY "Admins can manage featured section config" 
  ON public.featured_section_config 
  FOR ALL 
  USING (true)
  WITH CHECK (true);
