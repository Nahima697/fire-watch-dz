Tâche : Corriger les noms des RemoteEvents dans CraftingClient.client.luau.
Problème : Le client subit un "Infinite yield" car il attend "CollectResource" à la ligne 10.
Action : Au début du script, modifie les `WaitForChild` pour qu'ils cherchent exactement les bons noms générés par le serveur, c'est-à-dire `"CollectResourceEvent"` et `"CraftItemEvent"`.
Rendu : Réécris l'intégralité du script CraftingClient.client.luau avec cette simple correction de nom, sans rien changer d'autre à la logique (garde bien la correction de la souris avec target:IsA("BasePart")).
