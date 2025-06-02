const SUPABASE_URL = 'https://akiguwpghrmsqnhmrtlo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFraWd1d3BnaHJtc3FuaG1ydGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NDExMzIsImV4cCI6MjA2NDExNzEzMn0.0Uxqlf7M4S6TkI4L42QD4yIj15aPitpo6m739jAla7I';
const { createClient } = supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);