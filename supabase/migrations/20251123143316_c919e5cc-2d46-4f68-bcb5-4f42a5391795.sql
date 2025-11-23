-- Add category column to admin_projects for better organization
ALTER TABLE public.admin_projects ADD COLUMN category TEXT DEFAULT 'General';