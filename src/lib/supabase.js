import { createClient } from '@supabase/supabase-js';

// Replace these with YOUR actual values from Supabase dashboard
const supabaseUrl = 'https://nsiagqieokcvuesunatb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaWFncWllb2tjdnVlc3VuYXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNTEwMjQsImV4cCI6MjA4NTcyNzAyNH0.dbJwckPoHz4ZqkVKWrinJLnb3P1ae68QoLN9yFyxSGE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);