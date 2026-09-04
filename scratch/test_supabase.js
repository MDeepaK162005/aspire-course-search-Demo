const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://tktdjpueoxdqoeznljdz.supabase.co";
const SUPABASE_KEY = "sb_publishable_UhYiuUpTjMgk9K4HPqWh6Q_vlCCP54m";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function runAudit() {
  console.log('--- SUPABASE AUDIT ---');
  
  // Institutions Count
  const { count: instCount, error: instErr } = await supabase
    .from('institutions')
    .select('*', { count: 'exact', head: true });
  
  console.log('Institutions Count:', instCount, 'Err:', instErr);

  // Courses Count
  const { count: courseCount, error: courseErr } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true });
  
  console.log('Courses Count:', courseCount, 'Err:', courseErr);
}

runAudit();
