-- Create Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    author text NOT NULL,
    comment text NOT NULL,
    rating integer NOT NULL DEFAULT 5,
    image text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS) for Reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.reviews;
CREATE POLICY "Enable read access for all users" ON public.reviews
    AS PERMISSIVE FOR SELECT
    TO public
    USING (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.reviews;
CREATE POLICY "Enable insert for authenticated users only" ON public.reviews
    AS PERMISSIVE FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.reviews;
CREATE POLICY "Enable delete for authenticated users only" ON public.reviews
    AS PERMISSIVE FOR DELETE
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.reviews;
CREATE POLICY "Enable update for authenticated users only" ON public.reviews
    AS PERMISSIVE FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create Offers Table
CREATE TABLE IF NOT EXISTS public.offers (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    price_text text NOT NULL,
    tag text NOT NULL,
    image text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS) for Offers
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.offers;
CREATE POLICY "Enable read access for all users" ON public.offers
    AS PERMISSIVE FOR SELECT
    TO public
    USING (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.offers;
CREATE POLICY "Enable insert for authenticated users only" ON public.offers
    AS PERMISSIVE FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.offers;
CREATE POLICY "Enable delete for authenticated users only" ON public.offers
    AS PERMISSIVE FOR DELETE
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.offers;
CREATE POLICY "Enable update for authenticated users only" ON public.offers
    AS PERMISSIVE FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create a Storage Bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Allow public read access
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Storage Policy: Allow authenticated uploads
DROP POLICY IF EXISTS "Auth Upload" ON storage.objects;
CREATE POLICY "Auth Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');

-- Storage Policy: Allow authenticated deletes
DROP POLICY IF EXISTS "Auth Delete" ON storage.objects;
CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'images');
