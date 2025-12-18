/*
  # HolidyHours MVP Database Schema

  1. New Tables
    - `businesses`
      - `id` (uuid, primary key) - Unique business identifier
      - `name` (text) - Business name (required)
      - `email` (text) - Contact email for magic links (required)
      - `phone` (text, optional) - Contact phone number
      - `address` (text, optional) - Business address
      - `type` (text, optional) - Business type (retail, restaurant, service, etc.)
      - `paystack_customer_id` (text, optional) - Paystack customer reference
      - `payment_status` (text) - Payment status: pending, paid, failed
      - `created_at` (timestamptz) - Creation timestamp
      - `last_edited` (timestamptz) - Last edit timestamp
    
    - `pages`
      - `id` (uuid, primary key) - Same as business_id for 1:1 relationship
      - `business_id` (uuid, foreign key) - Reference to businesses table
      - `holidays` (jsonb) - Array of holiday configurations
      - `regular_hours` (jsonb) - Regular business hours by day
      - `custom_css` (text, optional) - Custom styling for future features
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `analytics`
      - `id` (uuid, primary key) - Same as page_id for 1:1 relationship
      - `page_id` (uuid, foreign key) - Reference to pages table
      - `views` (integer) - Total view count
      - `last_viewed` (timestamptz) - Last view timestamp
      - `sources` (jsonb) - Array of traffic source data

  2. Security
    - Enable RLS on all tables
    - Public read access to pages and analytics (for viewing)
    - Authenticated access for business management (via magic link validation)
    - No direct user table - authentication handled via magic link tokens in backend
*/

-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  address text,
  type text,
  paystack_customer_id text,
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  last_edited timestamptz NOT NULL DEFAULT now()
);

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY,
  business_id uuid NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  holidays jsonb NOT NULL DEFAULT '[]'::jsonb,
  regular_hours jsonb NOT NULL DEFAULT '{}'::jsonb,
  custom_css text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pages_business_fk FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY,
  page_id uuid NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  views integer NOT NULL DEFAULT 0,
  last_viewed timestamptz,
  sources jsonb NOT NULL DEFAULT '[]'::jsonb,
  CONSTRAINT analytics_page_fk FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_businesses_email ON businesses(email);
CREATE INDEX IF NOT EXISTS idx_businesses_payment_status ON businesses(payment_status);
CREATE INDEX IF NOT EXISTS idx_pages_business_id ON pages(business_id);
CREATE INDEX IF NOT EXISTS idx_analytics_page_id ON analytics(page_id);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for businesses table
-- Allow public to create businesses (during signup)
CREATE POLICY "Allow public business creation"
  ON businesses FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow public to read businesses (for displaying business info)
CREATE POLICY "Allow public to read businesses"
  ON businesses FOR SELECT
  TO anon
  USING (true);

-- Allow service role (backend) to update businesses
CREATE POLICY "Allow service role to update businesses"
  ON businesses FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for pages table
-- Allow public to read pages (for viewing holiday hours)
CREATE POLICY "Allow public to read pages"
  ON pages FOR SELECT
  TO anon
  USING (true);

-- Allow public to insert pages (during creation)
CREATE POLICY "Allow public to insert pages"
  ON pages FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service role to update pages
CREATE POLICY "Allow service role to update pages"
  ON pages FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for analytics table
-- Allow public to read analytics (for dashboard)
CREATE POLICY "Allow public to read analytics"
  ON analytics FOR SELECT
  TO anon
  USING (true);

-- Allow public to insert analytics (during initial creation)
CREATE POLICY "Allow public to insert analytics"
  ON analytics FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow public to update analytics (for incrementing views)
CREATE POLICY "Allow public to update analytics"
  ON analytics FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Function to automatically update last_edited timestamp
CREATE OR REPLACE FUNCTION update_last_edited()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_edited = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update last_edited on businesses table
CREATE TRIGGER update_businesses_last_edited
  BEFORE UPDATE ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_last_edited();

-- Function to automatically update updated_at timestamp for pages
CREATE OR REPLACE FUNCTION update_pages_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on pages table
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_pages_timestamp();