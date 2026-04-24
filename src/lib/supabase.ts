import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pyotfmkosyrehtrcurue.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5b3RmbWtvc3lyZWh0cmN1cnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NDY2MDYsImV4cCI6MjA5MDUyMjYwNn0.jWHhqvQQgX7hSZK0z97U1lxUOBbBUO6P-v5eJZF9udw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
