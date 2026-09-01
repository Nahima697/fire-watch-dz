Tâche : Corriger la détection de clic dans CraftingClient.client.luau.
Problème : Le client bloque la récolte en exigeant que l'objet s'appelle exactement "TreeTrunk" ou "Rock" dans l'événement `mouse.Button1Down`.
Action : Modifie le bloc `mouse.Button1Down:Connect` à la fin du fichier. Il doit simplement vérifier que `target` existe et que c'est un `BasePart` (`target:IsA("BasePart")`), puis envoyer ce target au serveur via `CollectResourceEvent:FireServer(target)`. C'est le serveur qui gérera le filtrage.
Rendu : Réécris l'intégralité du script CraftingClient.client.luau avec cette correction.
