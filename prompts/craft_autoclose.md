Dans src/client/CraftingClient.client.luau, écoute craftSuccessEvent.OnClientEvent(success, message).
Si success == true, ferme automatiquement craftFrame (craftFrame.Visible = false) après un
court délai (0.5s) pour laisser le joueur voir la confirmation, plutôt que de devoir
rappuyer sur C pour la fermer.
