import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase anon key must be the JWT (starts with "eyJ..."). Do NOT use the "publishable" key (sb_publishable_...).
// Get the correct key: Supabase Dashboard → Project Settings → API → "anon" "public" key.
const validKey =
  supabaseUrl &&
  supabaseAnonKey &&
  typeof supabaseAnonKey === "string" &&
  supabaseAnonKey.startsWith("eyJ");

export const supabase =
  validKey ? createClient(supabaseUrl!, supabaseAnonKey!) : null;

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
