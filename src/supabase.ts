import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/supabase-types";

const SUPABASE_API_URL = process.env.SUPABASE_API_URL as string;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY as string;

const client = createClient<Database>(SUPABASE_API_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

const main = async () => {
  const postRequest = await client
    .from("post")
    .select("*, user (*), comment(*)")
    .eq("title", "New title");

  if (postRequest.error) {
    console.log("error:", postRequest.error);
    return;
  }

  console.log(postRequest.data);
};

main();
