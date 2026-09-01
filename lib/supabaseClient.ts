import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl === '') {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_URL est manquante ou vide. Vérifiez votre fichier .env.local'
  );
}

if (!supabaseAnonKey || supabaseAnonKey === '') {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_ANON_KEY est manquante ou vide. Vérifiez votre fichier .env.local'
  );
}

/**
 * Client Supabase unique partagé par toute l'application.
 * Pattern volontaire car Fire Watch DZ fonctionne en mode 100% public/anonyme
 * sans authentification utilisateur. Pas de session, pas de cookie, uniquement
 * la clé anon publique. Ce client sera réutilisé partout via
 * import { supabase } from '@/lib/supabaseClient'.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
