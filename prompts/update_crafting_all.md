Tâche globale : Moderniser l'interface de craft, ajouter les pièges et structurer proprement le système.
Actions requises :
1. **Côté Client (CraftingClient.client.luau) :**
   - Assurer un design UI moderne et sombre avec des coins arrondis (`UICorner`) et une police nette (`Gotham`).
   - Positionner l'encadré des ressources (`ResourceFrame`) en haut à gauche proprement pour ne pas chevaucher les icônes Roblox.
   - Intégrer la recette du "Piege" (2 Bois, 3 Pierre) dans la liste de craft interactive avec des boutons clairs (verts si les ressources sont suffisantes, grisés sinon).
   - Conserver impérativement les connexions pour la touche 'C', le clic de souris (`CollectResourceEvent`) et l'envoi du craft (`CraftItemEvent`).

2. **Côté Serveur (CraftingSystem.server.luau) :**
   - Ajouter `Piege = {Wood = 2, Stone = 3}` dans la table `CRAFT_RECIPES`.
   - Gérer la création de la pièce du piège au sol ("PlayerTrap") lorsque le joueur fabrique un piège.
