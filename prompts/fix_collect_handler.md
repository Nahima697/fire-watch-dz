Dans src/server/CraftingSystem.server.luau, le handler collectResourceEvent.OnServerEvent
attend actuellement un paramètre "resourceType" (string), mais CraftingClient.client.luau
envoie en réalité la BasePart cliquée : CollectResourceEvent:FireServer(target).

Corrige le handler pour recevoir "targetPart" (une Instance). Ajoute
local CollectionService = game:GetService("CollectionService") en haut du fichier si absent.
Vérifie que targetPart existe, est une BasePart, et que
CollectionService:HasTag(targetPart, "ResourceNode") est vrai (sinon ignore silencieusement,
c'est un clic sur autre chose que du décor). Lis resourceType =
targetPart:GetAttribute("ResourceType"), puis garde la logique existante
(Wood -> +1 Bois, Stone -> +1 Pierre, cooldown 1s/joueur déjà en place) sans la dupliquer.
