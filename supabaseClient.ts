
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fnfybutkvsozbvvacomo.supabase.co';
const supabaseAnonKey = 'sb_publishable_ohA5AxCEbp8GYVjJU3Xk0g_c_oQvW04';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
