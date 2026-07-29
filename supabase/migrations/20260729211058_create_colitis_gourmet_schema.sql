/*
# Colitis Gourmet — Full Database Schema

## Overview
This migration creates the complete database for the Colitis Gourmet meal planner app.
It is a single-tenant app (no sign-in), so all tables use anon+authenticated RLS policies
with `USING (true)` because the data is intentionally shared/public.

## New Tables
1. `foods` — Curated food database with UC safety info, nutrition, categories, tags.
   Mirrors the existing in-memory food list but persisted so it can be expanded.
2. `meal_plans` — User's planned meals (day, meal type, food name, calories, protein, notes).
3. `shopping_items` — Shopping list items with category and checked state.
4. `resources` — Educational content: NHS, Wikipedia, and specialist colitis info links/articles.
5. `faq_entries` — FAQ questions and answers for the Help/FAQ page.
6. `suggestions` — User feedback / feature ideas submitted from the app.
7. `app_settings` — Key-value store for user-adjustable app preferences.

## Security
- RLS enabled on every table.
- All policies scoped to `TO anon, authenticated` with `USING (true)` / `WITH CHECK (true)`
  because this is a single-tenant, no-auth app with intentionally shared data.
*/

-- ============ FOODS ============
CREATE TABLE IF NOT EXISTS foods (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  flare_safe boolean NOT NULL DEFAULT false,
  remission_safe boolean NOT NULL DEFAULT false,
  calories integer NOT NULL DEFAULT 0,
  protein numeric NOT NULL DEFAULT 0,
  fiber numeric NOT NULL DEFAULT 0,
  fat numeric NOT NULL DEFAULT 0,
  texture_note text,
  trigger_risk text,
  family_friendly boolean NOT NULL DEFAULT true,
  notes text,
  tags text[] NOT NULL DEFAULT '{}',
  source text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE foods ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_foods" ON foods;
CREATE POLICY "anon_select_foods" ON foods FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_foods" ON foods;
CREATE POLICY "anon_insert_foods" ON foods FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_foods" ON foods;
CREATE POLICY "anon_update_foods" ON foods FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_foods" ON foods;
CREATE POLICY "anon_delete_foods" ON foods FOR DELETE TO anon, authenticated USING (true);

-- ============ MEAL PLANS ============
CREATE TABLE IF NOT EXISTS meal_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day text NOT NULL,
  meal_type text NOT NULL,
  food_name text NOT NULL,
  calories integer NOT NULL DEFAULT 0,
  protein numeric NOT NULL DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_meal_plans" ON meal_plans;
CREATE POLICY "anon_select_meal_plans" ON meal_plans FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_meal_plans" ON meal_plans;
CREATE POLICY "anon_insert_meal_plans" ON meal_plans FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_meal_plans" ON meal_plans;
CREATE POLICY "anon_update_meal_plans" ON meal_plans FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_meal_plans" ON meal_plans;
CREATE POLICY "anon_delete_meal_plans" ON meal_plans FOR DELETE TO anon, authenticated USING (true);

-- ============ SHOPPING ITEMS ============
CREATE TABLE IF NOT EXISTS shopping_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  quantity text NOT NULL DEFAULT '1',
  category text NOT NULL DEFAULT 'Other',
  checked boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_shopping_items" ON shopping_items;
CREATE POLICY "anon_select_shopping_items" ON shopping_items FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_shopping_items" ON shopping_items;
CREATE POLICY "anon_insert_shopping_items" ON shopping_items FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_shopping_items" ON shopping_items;
CREATE POLICY "anon_update_shopping_items" ON shopping_items FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_shopping_items" ON shopping_items;
CREATE POLICY "anon_delete_shopping_items" ON shopping_items FOR DELETE TO anon, authenticated USING (true);

-- ============ RESOURCES ============
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text,
  url text,
  source text NOT NULL,
  body text,
  tags text[] NOT NULL DEFAULT '{}',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_resources" ON resources;
CREATE POLICY "anon_select_resources" ON resources FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_resources" ON resources;
CREATE POLICY "anon_insert_resources" ON resources FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_resources" ON resources;
CREATE POLICY "anon_update_resources" ON resources FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_resources" ON resources;
CREATE POLICY "anon_delete_resources" ON resources FOR DELETE TO anon, authenticated USING (true);

-- ============ FAQ ENTRIES ============
CREATE TABLE IF NOT EXISTS faq_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE faq_entries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_faq_entries" ON faq_entries;
CREATE POLICY "anon_select_faq_entries" ON faq_entries FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_faq_entries" ON faq_entries;
CREATE POLICY "anon_insert_faq_entries" ON faq_entries FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_faq_entries" ON faq_entries;
CREATE POLICY "anon_update_faq_entries" ON faq_entries FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_faq_entries" ON faq_entries;
CREATE POLICY "anon_delete_faq_entries" ON faq_entries FOR DELETE TO anon, authenticated USING (true);

-- ============ SUGGESTIONS ============
CREATE TABLE IF NOT EXISTS suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text,
  category text NOT NULL DEFAULT 'feature',
  status text NOT NULL DEFAULT 'new',
  contact text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_suggestions" ON suggestions;
CREATE POLICY "anon_select_suggestions" ON suggestions FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_suggestions" ON suggestions;
CREATE POLICY "anon_insert_suggestions" ON suggestions FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_suggestions" ON suggestions;
CREATE POLICY "anon_update_suggestions" ON suggestions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_suggestions" ON suggestions;
CREATE POLICY "anon_delete_suggestions" ON suggestions FOR DELETE TO anon, authenticated USING (true);

-- ============ APP SETTINGS ============
CREATE TABLE IF NOT EXISTS app_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_app_settings" ON app_settings;
CREATE POLICY "anon_select_app_settings" ON app_settings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_app_settings" ON app_settings;
CREATE POLICY "anon_insert_app_settings" ON app_settings FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_app_settings" ON app_settings;
CREATE POLICY "anon_update_app_settings" ON app_settings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_app_settings" ON app_settings;
CREATE POLICY "anon_delete_app_settings" ON app_settings FOR DELETE TO anon, authenticated USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_foods_category ON foods(category);
CREATE INDEX IF NOT EXISTS idx_meal_plans_day ON meal_plans(day);
CREATE INDEX IF NOT EXISTS idx_shopping_items_category ON shopping_items(category);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_faq_entries_category ON faq_entries(category);
