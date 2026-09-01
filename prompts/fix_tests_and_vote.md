# 1. Résolution de l'Infinite Yield (CraftingClient)
Il manque le `RemoteEvent` nommé `CollectResourceEvent`. Le script serveur doit créer ce `RemoteEvent` et le placer dans `ReplicatedStorage.RemoteEvents` lors de l'initialisation pour que `CraftingClient` puisse s'y connecter sans bloquer l'interface de craft.

# 2. Correction des Tests (1 FAIL, 1 SKIP)
Dans le fichier de tests, analyse les résultats qui donnent actuellement "4 PASS, 1 FAIL, 1 SKIP".
- **Le SKIP (Crafting) :** Implémente le véritable test du système de craft pour qu'il retourne "PASS". N'oublie pas que le système utilise maintenant des clones depuis `ReplicatedStorage.Prefabs` (pas de génération procédurale).
- **Le FAIL :** Identifie la logique qui fait échouer ce test (vraisemblablement lié au cycle de jeu ou au GameTests:20) et corrige la logique serveur sous-jacente pour que tous les tests réussissent.

# 3. Logique du Cycle de Vote
Le vote ne doit pas se déclencher dès l'entrée en jeu. Modifie la boucle de jeu pour qu'elle passe obligatoirement par une première phase de Nuit complète avant d'autoriser le lancement de la première phase de Vote au Jour suivant.
