import { createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

const supabaseUrl = "https://vwmzkhnaaenikhvryzmu.supabase.co";
const supabaseKey = process.env.SUPABASE_API_KEY || "";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
