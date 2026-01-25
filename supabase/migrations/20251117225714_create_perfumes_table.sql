/*
  # Create Perfumes Table
  
  1. New Tables
    - `perfumes`
      - `id` (uuid, primary key) - Unique identifier for each perfume
      - `nome` (text) - Name of the perfume
      - `slug` (text, unique) - URL-friendly version of the name for routing
      - `essencia` (text) - Category: 'feminino', 'masculino', or 'kits-presentes'
      - `descricao_curta` (text) - Short description of the perfume
      - `imagem_principal` (text) - URL to the main product image
      - `preco` (numeric) - Price with decimal places (e.g., 1890.00)
      - `marca` (text) - Brand name
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
  
  2. Security
    - Enable RLS on `perfumes` table
    - Add policy for public read access (anyone can view perfumes)
    - Add policies for authenticated users to manage perfumes (insert, update, delete)
  
  3. Indexes
    - Index on `essencia` for fast filtering by category
    - Index on `slug` for quick lookups by URL
  
  4. Important Notes
    - The `essencia` field uses CHECK constraint to ensure only valid values
    - The `slug` field has UNIQUE constraint to prevent duplicate URLs
    - Prices are stored as NUMERIC(10,2) for precise decimal handling
*/

-- Create perfumes table
CREATE TABLE IF NOT EXISTS perfumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  slug text UNIQUE NOT NULL,
  essencia text NOT NULL CHECK (essencia IN ('feminino', 'masculino', 'kits-presentes')),
  descricao_curta text NOT NULL DEFAULT '',
  imagem_principal text NOT NULL,
  preco numeric(10,2) NOT NULL CHECK (preco >= 0),
  marca text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_perfumes_essencia ON perfumes(essencia);
CREATE INDEX IF NOT EXISTS idx_perfumes_slug ON perfumes(slug);

-- Enable Row Level Security
ALTER TABLE perfumes ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view perfumes (public access)
CREATE POLICY "Anyone can view perfumes"
  ON perfumes
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can insert perfumes
CREATE POLICY "Authenticated users can insert perfumes"
  ON perfumes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update perfumes
CREATE POLICY "Authenticated users can update perfumes"
  ON perfumes
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete perfumes
CREATE POLICY "Authenticated users can delete perfumes"
  ON perfumes
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_perfumes_updated_at
  BEFORE UPDATE ON perfumes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
