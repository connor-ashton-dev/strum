import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gkgqamfqzxvkzzsvbhzq.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZ3FhbWZxenh2a3p6c3ZiaHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc3MjkzMjgsImV4cCI6MTk5MzMwNTMyOH0.BJ89hMYqh-zjEaqJF1Q1DaDIVDfQVy6wLQxdKdaZApI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
