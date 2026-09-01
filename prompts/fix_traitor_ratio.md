Dans src/server/GameManager.server.luau, la fonction d'assignation des rôles calcule
traitorCount = math.max(1, math.floor(playerCount * 0.25)), ce qui force TOUJOURS au
moins 1 traître même avec un seul joueur en test solo. Corrige : n'applique le minimum
de 1 traître que si playerCount >= 2 ; avec 1 seul joueur, traitorCount doit être 0
(Villageois). Utilise GameConfig.TRAITOR_RATIO au lieu de 0.25 codé en dur (ajoute cette
constante = 0.25 dans src/shared/GameConfig.luau si absente).

Remplace aussi le nom de rôle "Innocent" par "Villager" partout dans ce fichier, pour
rester cohérent avec RoleManager.server.luau et RoleDisplay.client.luau qui utilisent
déjà "Villager".
