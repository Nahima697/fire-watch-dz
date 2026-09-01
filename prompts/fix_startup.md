Tâche : Corriger deux erreurs bloquantes au démarrage.

ERREUR 1 : CraftingClient.client.luau
Logs : `CraftingClient:80: Expected <eof>, got 'local'`
Action : Vérifie impérativement l'indentation et la fermeture de toutes tes fonctions et boucles. Il manque un `end` (ou il y en a un en trop) autour de la ligne 80 qui casse le parsing. Répare la syntaxe.

ERREUR 2 : GameManager.server.luau & RoleManager.server.luau
Logs : `Infinite yield possible on 'ReplicatedStorage.RemoteEvents:WaitForChild("AssignRole")'`
Action : Le GameManager DOIT être le garant de la création des événements. Au tout début de `GameManager.server.luau`, assure-toi que le dossier `RemoteEvents` est créé DANS `ReplicatedStorage`, puis instancie explicitement un `RemoteEvent` nommé `AssignRole` et place-le dans ce dossier. Fais-le de manière synchrone avant le reste de la logique.
