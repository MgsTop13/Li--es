import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jrficpfitnijttytrmwv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyZmljcGZpdG5panR0eXRybXd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjU4NzQwNywiZXhwIjoyMDcyMTYzNDA3fQ.0Qzb4lkguIFFYkRk8koG4RWJpZX95aWkdlt3e9t90-Y'

export const supabase = createClient(supabaseUrl, supabaseKey)
