import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://keorcxgqzldncdhehszr.supabase.co";
const supabaseAnonKey = "sb_publishable_jkNimL-ZPuRgPAXo3mp7aw_5rEhVHJz";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);