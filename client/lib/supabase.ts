import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials are missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface WaitlistEntry {
  id?: string;
  full_name: string;
  phone_number: string;
  created_at?: string;
}

export async function addToWaitlist(entry: WaitlistEntry) {
  const { data, error } = await supabase
    .from("waitlist")
    .insert([entry])
    .select();

  if (error) throw error;
  return data;
}
