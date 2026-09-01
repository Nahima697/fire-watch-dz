# Objectif : Mettre à jour GameTests pour valider fidèlement les attributs et dossiers actuels
Les tests "Cycle jour/nuit" et "Monde généré (3D)" échouent uniquement à cause d'assertions trop rigides dans `GameTests.server.luau` alors que les systèmes s'initialisent correctement.

Tâches :
1. **Cycle jour/nuit :** Assure-toi que le test écoute l'attribut `CurrentPhase` présent sur `ReplicatedStorage.SharedData` (ou s'adapte à son nom exact) sans renvoyer `false`.
2. **Monde généré (3D) :** Valide la présence effective des dossiers clés dans l'Workspace (`Workspace.Village`, `Workspace.Trees`, `Workspace.Rocks`, `Workspace.MonsterSpawns`) sans exiger des noms de sous-éléments obsolètes.
3. **Sécurité :** Ne place aucun `return` à la fin de ce script serveur.
