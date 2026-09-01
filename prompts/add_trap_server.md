Tâche : Ajouter la logique de création du Piège dans CraftingSystem.server.luau.
Action :
1. Ajoute `Piege = {Wood = 2, Stone = 3}` dans la table `CRAFT_RECIPES`.
2. Dans la gestion du craft (`craftItemEvent.OnServerEvent`), ajoute la condition pour `itemName == "Piege"` :
   - Crée une pièce (`Part`) plate et discrète au sol devant le joueur (ex: une plaque sombre ou marron piégée).
   - Nomme-la "PlayerTrap".
   - Ajoute un script minimal ou un événement de contact (`Touched`) pour que si un monstre (ou un joueur ennemi/traître selon les règles) marche dessus, cela le ralentisse ou lui inflige des dégâts.
Rendu : Mets à jour CraftingSystem.server.luau en conservant l'architecture existante.
