# Objectif : Génération du monde brut avec les Prefabs (SANS ERREUR DE SYNTAXE)
Le précédent essai a été annulé par le guardrail car le script contenait un `return` à la fin, ce qui fait planter un .server.luau.

# Tâche pour l'Agent
RÉÉCRIS ENTIÈREMENT le script `WorldBuilder.server.luau` pour utiliser les modèles 3D de `ReplicatedStorage.Prefabs` :
1. Supprime l'ancienne génération procédurale par `Part`.
2. Parcourt `ReplicatedStorage.Prefabs` et utilise les `Model` pour construire un village basique et une forêt autour.
3. NE GÈRE PAS les textures complexes (SurfaceAppearance) pour le moment, clone juste les modèles tels quels.
4. Conserve la logique d'interaction (les ProximityPrompts sur les ressources clonées).
5. CRUCIAL : Ce fichier est un Server Script. Ne mets AUCUN `return` à la fin. Termine le fichier en appelant directement ta fonction principale, par exemple : `generateWorld()`
