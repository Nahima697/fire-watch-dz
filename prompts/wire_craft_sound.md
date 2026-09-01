Dans src/client/CraftingClient.client.luau, écoute déjà craftSuccessEvent.OnClientEvent
pour fermer craftFrame automatiquement. Ajoute dans ce même handler : si success == true,
joue un son local one-shot avec SoundId = require(ReplicatedStorage.Modules.GameConfig).SOUNDS.CraftSuccess
(ajoute le require de GameConfig en haut si absent — vérifie d'abord qu'il n'existe pas déjà).
Crée le Sound une seule fois au chargement du script (pas à chaque craft), Volume 0.6,
parenté à SoundService, et appelle :Play() à chaque succès (pas besoin de le recréer,
juste relancer la lecture depuis le début si déjà en cours).
