Crée un nouveau LocalScript src/client/RoleDisplay.client.luau pour Village Maudit.

Source de la donnée (respecte la convention de sécurité existante, ne PAS lire
player:GetAttribute("Role") qui est un attribut public visible par tous les clients —
utilise uniquement le RemoteEvent privé) :
- ReplicatedStorage.RemoteEvents.AssignRole (déjà créé par GameManager.server.luau et
  utilisé par RoleManager.server.luau via AssignRoleEvent:FireClient(player, role)).
- Utilise RemoteEvents:WaitForChild("AssignRole"), n'en crée pas de nouveau.
- Le payload reçu sur OnClientEvent est une simple string : "Traitor" ou "Villager".

Comportement :
1. À la connexion de AssignRoleEvent.OnClientEvent(role) :
   - Affiche un ScreenGui plein écran "RoleRevealUI" pendant 5 secondes avec un texte
     centré assez gros (TextSize ~36, GothamBold) :
     - role == "Traitor" -> texte "Vous êtes un TRAÎTRE" en rouge (Color3.fromRGB(200,30,30))
       sur fond sombre semi-transparent, avec un sous-texte "Sabotez le village la nuit,
       sans vous faire démasquer."
     - role == "Villager" -> texte "Vous êtes un VILLAGEOIS" en vert/blanc
       (Color3.fromRGB(80,200,120)) sur fond sombre semi-transparent, avec un sous-texte
       "Survivez et démasquez le traître."
   - Anime une disparition en fondu (TweenService, BackgroundTransparency et
     TextTransparency vers 1) après les 5 secondes plutôt qu'une disparition brutale.
2. Après la disparition de l'overlay, laisse un petit badge permanent en haut à droite de
   l'écran (Frame ~140x40px) rappelant le rôle actuel du joueur ("Traître" ou "Villageois"),
   toujours visible tant que le joueur est en jeu, avec la même couleur que l'overlay initial.
3. Le script doit gérer le cas où AssignRoleEvent se déclenche plusieurs fois dans la même
   session (ex: relance de partie) en recréant proprement l'UI sans dupliquer les ScreenGui.

Ne modifie aucun fichier serveur, ne crée aucun RemoteEvent — AssignRole existe déjà.
