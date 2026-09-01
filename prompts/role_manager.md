Jeu Roblox : "Village Maudit" (Déduction sociale et horreur).
Type : Nouveau script serveur (chemin : src/server/RoleManager.server.luau).

# Objectif
Implémenter un système d'attribution des rôles (Villageois vs Traître) au début de la partie et gérer les capacités de sabotage nocturne du traître.

# Contraintes Techniques Strictes
1. À l'initialisation de la partie, répartir aléatoirement les rôles (ex: 1 traître pour 4 ou 5 joueurs) en stockant l'état dans un attribut ou une table sécurisée côté serveur (`player.UserId` -> rôle).
2. Envoyer un message discret ou une interface minimale (ou une notification dans la chatbox) au joueur concerné pour l'informer s'il est Traître ou Villageois.
3. Si le joueur est Traître, lui offrir une action de sabotage nocturne (par exemple, interagir avec une porte pour l'ouvrir à distance) via un `RemoteEvent`.
4. Le code doit être robuste, optimisé et en Luau pur, sans balise markdown.

# Format de Sortie
Renvoie UNIQUEMENT le code Luau en texte brut. N'inclus aucune explication, et n'utilise AUCUNE balise markdown.
