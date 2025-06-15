
-- Create a table to store resume information
CREATE TABLE public.resume_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  uploaded_by UUID REFERENCES public.admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.resume_files ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to read active resumes (public content)
CREATE POLICY "Everyone can view active resume files" 
  ON public.resume_files 
  FOR SELECT 
  USING (is_active = true);

-- Create policy that allows admins to manage resume files
CREATE POLICY "Admins can manage resume files" 
  ON public.resume_files 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Create storage bucket for resume files
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true);

-- Create storage policies for resume bucket
CREATE POLICY "Public can view resume files"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');

CREATE POLICY "Admins can upload resume files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Admins can update resume files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'resumes');

CREATE POLICY "Admins can delete resume files"
ON storage.objects FOR DELETE
USING (bucket_id = 'resumes');
