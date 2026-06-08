-- Run this in your Supabase SQL editor

-- Table: stores AI-generated quiz questions per day+level (shared across all users)
CREATE TABLE IF NOT EXISTS daily_quiz (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  story_date  date NOT NULL,
  level       text NOT NULL,
  questions   jsonb NOT NULL,
  created_at  timestamptz DEFAULT now(),
  UNIQUE(story_date, level)
);

ALTER TABLE daily_quiz ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read"    ON daily_quiz FOR SELECT USING (true);
CREATE POLICY "service insert" ON daily_quiz FOR INSERT WITH CHECK (true);

-- Table: stores each user's answers for a quiz
CREATE TABLE IF NOT EXISTS quiz_completions (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_date   date NOT NULL,
  level       text NOT NULL,
  answers     jsonb NOT NULL,
  score       int  NOT NULL DEFAULT 0,
  xp_earned   int  NOT NULL DEFAULT 0,
  created_at  timestamptz DEFAULT now(),
  UNIQUE(user_id, quiz_date, level)
);

ALTER TABLE quiz_completions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own read"   ON quiz_completions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own insert" ON quiz_completions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own update" ON quiz_completions FOR UPDATE USING (auth.uid() = user_id);
