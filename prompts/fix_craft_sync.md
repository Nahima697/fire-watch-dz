Dans src/server/CraftingSystem.server.luau : les ressources du joueur sont stockées
dans playerInventories mais jamais synchronisées vers des attributs Instance, alors que
CraftingClient.client.luau lit player:GetAttribute("Wood") et player:GetAttribute("Stone")
pour afficher les compteurs et activer les boutons. Ajoute une fonction syncResourceAttributes(player)
qui fait player:SetAttribute("Wood", inventory.Bois) et player:SetAttribute("Stone", inventory.Pierre),
appelée dans initializePlayer et juste après consumeResources.

Ajoute aussi un handler CollectResourceEvent.OnServerEvent (l'event existe déjà, créé par
GameManager.server.luau) qui donne +1 Bois ou +1 Pierre au joueur selon la part visée,
avec un cooldown 1s/joueur anti-spam, puis appelle syncResourceAttributes.
