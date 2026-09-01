Tâche : Corriger un "Infinite yield" au démarrage entre GameManager et RoleManager.
Logs : `Infinite yield possible on 'ReplicatedStorage.RemoteEvents:WaitForChild("AssignRole")'`
Action : Le GameManager DOIT être le garant de la création des événements. Au tout début de GameManager.server.luau, assure-toi que le dossier `RemoteEvents` est créé DANS `ReplicatedStorage` (s'il n'existe pas déjà), puis instancie explicitement un `RemoteEvent` nommé `AssignRole` et place-le dans ce dossier. Fais-le de manière synchrone en haut du fichier.
