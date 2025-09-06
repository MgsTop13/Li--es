import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qptqrwdupuztgadgpjve.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwdHFyd2R1cHV6dGdhZGdwanZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxOTQyMzAsImV4cCI6MjA3Mjc3MDIzMH0.cYSOZu3mTP-uiyevsZe51Wh56vmIFq1LcpRNnsb9-YI'

export const supabase = createClient(supabaseUrl, supabaseKey)
