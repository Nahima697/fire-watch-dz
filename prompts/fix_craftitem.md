Tâche : Résoudre l'erreur "Infinite yield" sur l'événement CraftItem.
Contexte : Le client CraftingClient cherche `ReplicatedStorage.RemoteEvents:WaitForChild("CraftItem")` mais il n'existe pas.
Action : Conformément aux règles de l'AI_CONTRACT.md, le `GameManager` doit instancier de manière synchrone tous les RemoteEvents globaux au démarrage. 
Mets à jour le code du GameManager pour créer l'événement `CraftItem` dans le dossier `RemoteEvents` de `ReplicatedStorage`.
Génère le code complet et corrigé pour GameManager.server.luau.
