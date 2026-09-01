# Objectif : Mettre à jour GameTests pour valider proprement le monde 3D et le cycle jour/nuit
Les tests "Cycle jour/nuit" et "Monde généré (3D)" échouent en raison d'assertions trop strictes ou obsolètes dans `GameTests.server.luau`.

Tâches :
1. **Monde généré (3D) :** Assure-toi que le test valide simplement la présence des dossiers principaux dans l'Workspace (`Workspace.Village`, `Workspace.Trees`, `Workspace.Rocks`, `Workspace.MonsterSpawns`) créés par le nouveau `WorldBuilder`.
2. **Cycle jour/nuit :** Vérifie l'attribut `CurrentPhase` et `TimeRemaining` sur `ReplicatedStorage.SharedData` de manière souple et robuste.
3. **Sécurité :** Ne place aucun `return` à la fin de ce script serveur.
