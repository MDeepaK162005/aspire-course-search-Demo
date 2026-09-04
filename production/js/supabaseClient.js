/**
 * Aspire Rise Ventures - Supabase Client Setup
 * Uses standard @supabase/supabase-js library from CDN
 */

(function () {
  let client = null;

  try {
    if (
      window.supabase &&
      window.CONFIG &&
      window.CONFIG.SUPABASE_URL &&
      !window.CONFIG.SUPABASE_URL.includes("your-supabase-project")
    ) {
      client = window.supabase.createClient(
        window.CONFIG.SUPABASE_URL,
        window.CONFIG.SUPABASE_PUBLISHABLE_KEY
      );
      console.log("✅ Supabase Client initialized successfully.");
    } else {
      console.warn(
        "ℹ️ Supabase credentials not set or invalid. Portal will operate seamlessly using local verified database (MOCK_DATA)."
      );
    }
  } catch (err) {
    console.error("❌ Failed to initialize Supabase client:", err);
  }

  window.supabaseClient = client;
})();
