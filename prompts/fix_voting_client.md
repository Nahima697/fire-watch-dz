Crée un nouveau LocalScript src/client/VotingClient.client.luau pour Village Maudit.

Détection de phase (respecte la convention existante, n'invente rien) :
- Écoute ReplicatedStorage.SharedData:GetAttributeChangedSignal("CurrentPhase"), exactement
  comme le fait déjà src/server/VotingSystem.server.luau côté serveur.
- La phase de vote correspond à SharedData:GetAttribute("CurrentPhase") == "VOTE_PHASE".

RemoteEvents (déjà créés par VotingSystem.server.luau, utilise WaitForChild, n'en recrée aucun) :
- ReplicatedStorage.RemoteEvents.VoteEvent : FireServer(targetPlayer) où targetPlayer est
  une instance Player (pas un UserId, pas une string).
- ReplicatedStorage.RemoteEvents.VoteResultEvent : OnClientEvent(eliminatedPlayer) où
  eliminatedPlayer est soit une instance Player soit nil (nil = égalité ou personne éliminé).
  Ce n'est PAS une table de votes, juste le joueur éliminé ou nil.

Joueurs vivants : l'attribut IsAlive est posé sur l'instance Player elle-même, pas sur
Character. Utilise player:GetAttribute("IsAlive") == true (voir RoleManager.server.luau).

Comportement :
1. Quand CurrentPhase passe à "VOTE_PHASE" : ScreenGui "VotingUI" listant tous les Players
   avec IsAlive == true sauf le joueur local, un TextButton par joueur.
2. Clic sur un bouton : VoteEvent:FireServer(targetPlayer), désactive tous les boutons du
   panel (un seul vote autorisé).
3. Sur VoteResultEvent : affiche 5 secondes le nom du joueur éliminé (ou "Personne n'a été
   éliminé" si nil), puis ferme le panel.
4. Quand CurrentPhase quitte "VOTE_PHASE" alors que le panel est encore ouvert, ferme-le.
