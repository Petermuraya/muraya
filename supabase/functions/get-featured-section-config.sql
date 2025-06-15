
-- Create a function to get featured section config
CREATE OR REPLACE FUNCTION public.get_featured_section_config(section_name text)
RETURNS TABLE(
  id uuid,
  section text,
  title text,
  subtitle text,
  enabled boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT * FROM public.featured_section_config WHERE section = section_name;
$$;
