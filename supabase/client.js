import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const sbAPIKey = process.env.SUPABASE_KEY;
const sbURI = process.env.SUPABASE_URI;

if (!sbAPIKey || !sbURI) {
  throw new Error("Missing SUPABASE_KEY or SUPABASE_URI in environment variables.");
}

export const client = createClient(sbURI, sbAPIKey);
