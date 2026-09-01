# CONTRAT D'ARCHITECTURE ET RÈGLES STRICTES - "FIRE WATCH DZ"

⚠️ **À L'ATTENTION DE L'AGENT IA : Tu DOIS lire et respecter ces règles avant de proposer, modifier ou générer du code pour ce projet.** ⚠️

## 1. Stack technique
Next.js 14+ (App Router, TypeScript strict), Tailwind CSS, Leaflet (carte), Supabase (base de données + Realtime + Storage). PWA installable (manifest.json).

## 2. Architecture des fichiers
* Route Handlers API dans `app/api/<nom>/route.ts` (jamais `pages/api/`, on est en App Router).
* Composants React réutilisables dans `components/`. Un composant qui utilise Leaflet, geolocation, ou tout hook client DOIT avoir `"use client"` en première ligne et être importé dynamiquement (`dynamic(() => import(...), { ssr: false })`) s'il touche à `window`/`navigator`.
* Client Supabase centralisé dans `lib/supabaseClient.ts` — ne jamais créer un second client ailleurs.
* Types partagés (ex: `FireReport`, `SatelliteFire`) dans `lib/types.ts` — ne pas dupliquer une interface déjà définie.

## 3. Sécurité — règle absolue
* **Aucune clé secrète côté client.** `NASA_FIRMS_MAP_KEY`, la clé `service_role` Supabase, et toute clé OpenRouter ne doivent JAMAIS apparaître dans un fichier avec `"use client"`, ni être passées au navigateur. Elles vivent uniquement dans les Route Handlers serveur, lues via `process.env`.
* Toute écriture en base (INSERT/UPDATE) passe par les règles RLS Supabase définies dans le script SQL — ne jamais contourner RLS via la clé service_role depuis le client.

## 4. Communication entre composants
* L'état partagé en temps réel (nouveaux signalements, mise à jour de statut) passe par Supabase Realtime (`supabase.channel(...)`), pas par un état React global fait maison ni par polling manuel sauf si explicitement demandé.

## 5. Unicité des instructions
* Il ne doit y avoir qu'un seul fichier markdown par système dans le dossier `prompts/`. Si tu dois unifier un système, supprime l'ancien fichier de prompt pour éviter la duplication de contexte.
