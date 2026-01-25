import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Perfume {
  id: string;
  nome: string;
  slug: string;
  essencia: 'feminino' | 'masculino' | 'kits-presentes';
  descricao_curta: string;
  imagem_principal: string;
  preco: number;
  marca: string;
  created_at: string;
  updated_at: string;
}
