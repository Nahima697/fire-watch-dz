# Objectif : Mettre à jour GameTests pour valider le nouveau WorldBuilder 3D et le GameManager
Les tests automatisés `GameTests.server.luau` échouent sur "Cycle jour/nuit" et "Monde généré" en raison des changements structurels apportés au WorldBuilder 3D et au GameManager.

Tâches :
1. **Monde généré :** Adapte la vérification pour qu'elle valide la présence de l'objet ou du dossier généré dans l'Workspace par le nouveau `WorldBuilder` (comme `Workspace.Village`, `Workspace.Trees`, etc.).
2. **Cycle jour/nuit :** Mets à jour le test pour qu'il écoute correctement les états ou variables de phase du `GameManager` (ou `SharedData.CurrentPhase`) sans provoquer d'erreur inconnue.
3. **Sécurité :** Ne place aucun `return` à la fin de ce script serveur.
