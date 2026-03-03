import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only initialize if we have credentials
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface WaitlistEntry {
  id?: string;
  full_name: string;
  phone_number: string;
  created_at?: string;
}

export async function addToWaitlist(entry: WaitlistEntry) {
  if (!supabase) {
    console.warn("Supabase credentials are missing. Simulating successful submission for development.");
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [{ success: true }];
  }

  const { data, error } = await supabase
    .from("waitlist")
    .insert([entry])
    .select();

  if (error) throw error;
  return data;
}
