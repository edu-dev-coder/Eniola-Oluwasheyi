/**
 * Supabase Cloud Database Configuration
 * 
 * Paste your Supabase Project URL and Anon/Public Key below.
 * Once set, all guest wishes, prayers, and RSVPs will automatically
 * sync to your Supabase database in real time!
 */
export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};
