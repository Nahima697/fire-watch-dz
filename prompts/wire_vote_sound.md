Dans src/client/VotingClient.client.luau, au moment où le joueur clique un bouton pour
voter (juste avant ou juste après VoteEvent:FireServer(targetPlayer)), joue un son local
one-shot avec SoundId = require(ReplicatedStorage.Modules.GameConfig).SOUNDS.VoteCast
(ajoute le require de GameConfig en haut si absent — vérifie d'abord qu'il n'existe pas déjà).
Crée le Sound une seule fois au chargement du script, Volume 0.6, parenté à SoundService,
et relance sa lecture à chaque vote soumis.
