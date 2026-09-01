Jeu Roblox : "Village Maudit".
Type : Script serveur (chemin : src/ServerScriptService/RoleAssignment.lua).

# Objectif
Créer un module ou un script gérant l'attribution aléatoire et secrète des rôles (Villageois vs Traître) en utilisant `GameConfig`.

# Contraintes Techniques Strictes
- Fonction principale recevant une liste de joueurs (`Players:GetPlayers()`).
- Calcule le nombre de traîtres selon `GameConfig.TRAITOR_RATIO` (minimum 1 traître).
- Assigne aléatoirement les rôles et stocke-les dans une table sécurisée côté serveur (`private` ou inaccessible aux clients).
- Utilise un `RemoteEvent` nommé `RoleRevealEvent` (situé ou à créer dans ReplicatedStorage/RemoteEvents) pour envoyer à chaque joueur **uniquement** son propre rôle via `FireClient`. Ne jamais utiliser `FireAllClients` pour propager les rôles des autres.
- Le code doit être robuste, optimisé et en Luau pur, sans balise markdown ni texte superflu.

# Format de Sortie
Renvoie UNIQUEMENT le code Luau en texte brut. N'inclus aucune explication, et n'utilise AUCUNE balise markdown.
