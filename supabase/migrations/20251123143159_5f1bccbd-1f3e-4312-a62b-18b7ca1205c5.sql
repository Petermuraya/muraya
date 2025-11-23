-- Create resume_files table
CREATE TABLE public.resume_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.resume_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies for resume_files
CREATE POLICY "Resume files are viewable by everyone"
ON public.resume_files FOR SELECT
USING (is_active = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Admins can insert resume files"
ON public.resume_files FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update resume files"
ON public.resume_files FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete resume files"
ON public.resume_files FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));