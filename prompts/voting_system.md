Jeu Roblox : "Village Maudit".
Type : Script serveur (chemin : src/server/VotingSystem.server.luau).

# Objectif
Créer le module gérant la phase de vote matinale (collecte des votes, validation côté serveur, calcul du joueur le plus voté et son élimination).

# Contraintes Techniques Strictes
- Écouter ou recevoir les votes via un RemoteEvent nommé VoteEvent (situé dans ReplicatedStorage/RemoteEvents, à créer s'il n'existe pas).
- Valider strictement chaque vote côté serveur (le votant et la cible doivent être en vie et présents dans la partie).
- Permettre à un joueur de changer son vote tant que le temps imparti n'est pas écoulé.
- À la fin de la phase de vote, compter les voix, déterminer le joueur éliminé (en cas d'égalité stricte entre plusieurs joueurs, personne n'est éliminé).
- Une fois le joueur éliminé déterminé, appeler GameManager.RemovePlayer(player) pour notifier le reste du système (ce module existe déjà dans src/server/GameManager.server.luau).
- Réinitialiser l'état des votes au début de chaque nouvelle phase de vote.
- Envoyer le résultat final à tous les clients via un second RemoteEvent nommé VoteResultEvent (nom du joueur éliminé ou nil).
- Le code doit être robuste, optimisé et en Luau pur, sans balise markdown ni texte superflu.

# Format de Sortie
Renvoie UNIQUEMENT le code Luau en texte brut. N'inclus aucune explication, et n'utilise AUCUNE balise markdown.
