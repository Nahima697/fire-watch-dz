Dans src/server/RoleManager.server.luau, assignRoles(), shuffleTable, RoleManager.StartGame,
RoleManager.EndGame, RoleManager.PlayerRoles et le bloc StartGameSignal ne sont jamais
exécutés (rien ne Fire() StartGameSignal dans le projet ; GameManager.server.luau assigne
réellement les rôles de son côté). Supprime entièrement ce système mort et dupliqué.

Puis corrige la logique de sabotage restante pour qu'elle lise le vrai état posé par
GameManager.server.luau au lieu de son ancienne table interne morte :
1. isTraitor(player) doit lire player:GetAttribute("Role") == "Traitor".
2. Dans handleSabotage, remplace la vérification de RoleManager.IsGameStarted par
   ReplicatedStorage.SharedData:GetAttribute("GameActive") == true.
3. Remplace workspace:GetAttribute("IsNight") par
   ReplicatedStorage.SharedData:GetAttribute("CurrentPhase") == "NIGHT_PHASE" (convention
   déjà utilisée par MonsterSpawner.server.luau et VotingSystem.server.luau).

Garde TraitorSabotageEvent et le reste de handleSabotage (logique de porte) intacts.
