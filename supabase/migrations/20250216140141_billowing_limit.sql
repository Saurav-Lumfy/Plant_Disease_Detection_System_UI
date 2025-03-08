/*
  # Fix chat queries table

  1. Changes
    - Add insert policy for chat_queries table
    - Insert initial record for query counter
    
  2. Security
    - Add policy for authenticated users to insert records
*/

-- Add insert policy for chat_queries
CREATE POLICY "Everyone can insert chat queries"
  ON chat_queries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert initial record if none exists
INSERT INTO chat_queries (id, count, last_reset)
SELECT gen_random_uuid(), 0, now()
WHERE NOT EXISTS (SELECT 1 FROM chat_queries LIMIT 1);