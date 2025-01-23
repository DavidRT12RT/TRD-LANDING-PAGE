import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Asegúrate de definirlo en .env.local
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Asegúrate de definirlo en .env.local

export const supabase = createClient(supabaseUrl, supabaseKey);
