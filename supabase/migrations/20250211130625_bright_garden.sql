/*
  # Create issues table for chatbot

  1. New Tables
    - `issues`
      - `id` (uuid, primary key)
      - `description` (text)
      - `type` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `issues` table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  description text NOT NULL,
  type text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE issues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create issues"
  ON issues
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own issues"
  ON issues
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);