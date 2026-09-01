Crée un nouveau LocalScript src/client/PlacementClient.client.luau pour Village Maudit.

Contexte : CraftingSystem.server.luau déclenche déjà
ReplicatedStorage.RemoteEvents.StartPlacementEvent:FireClient(player, itemName) pour
Barricade/Piege/Fortification, et attend
ReplicatedStorage.RemoteEvents.ConfirmPlacementEvent:FireServer(position) (Vector3) pour
créer réellement la structure. Rien ne le fait actuellement côté client.

Comportement :
1. StartPlacementEvent.OnClientEvent(itemName) : entre en mode placement. À chaque frame
   (RunService.RenderStepped), raycast depuis la souris vers le sol (mouse.Hit) et déplace
   un aperçu semi-transparent (Part simple, Transparency 0.5, CanCollide false, Anchored
   true) à la position visée.
2. Clic gauche (UserInputService.InputBegan, MouseButton1) en mode placement : envoie
   ConfirmPlacementEvent:FireServer(previewPart.Position), détruit l'aperçu, sort du mode.
3. Touche Echap en mode placement : détruit juste l'aperçu sans appeler le serveur
   (annulation locale seulement — les ressources déjà consommées au craft ne sont pas
   remboursées, c'est un comportement existant, ne l'invente pas différemment).

N'utilise que les RemoteEvents déjà créés par CraftingSystem.server.luau (StartPlacementEvent,
ConfirmPlacementEvent), n'en crée aucun.
