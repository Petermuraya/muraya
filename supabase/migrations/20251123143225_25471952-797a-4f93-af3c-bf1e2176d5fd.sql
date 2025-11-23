-- Add visible column to blog_ratings
ALTER TABLE public.blog_ratings ADD COLUMN visible BOOLEAN DEFAULT TRUE;