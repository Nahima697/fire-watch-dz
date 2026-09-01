RÈGLE ABSOLUE : RÉPONDS UNIQUEMENT AVEC LE CODE LUAU COMPLET. AUCUNE EXPLICATION. AUCUN TEXTE. ZÉRO MARKDOWN (pas de ```luau).

Tâche : Corriger GameManager.server.luau pour le mode test.

1. NOMBRE DE JOUEURS : Cherche la variable qui définit le nombre de joueurs minimum pour lancer la partie (ex: MIN_PLAYERS) et règle-la IMPÉRATIVEMENT sur 1. Le jeu est en phase de test solo.
2. ÉVÉNEMENTS GLOBAUX : Le script DOIT instancier TOUS les événements requis par les autres scripts, pas seulement un seul. 

Tout en haut du script, juste après les "game:GetService", mets EXACTEMENT ce code pour créer le dossier et les événements :

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteEvents = ReplicatedStorage:FindFirstChild("RemoteEvents") or Instance.new("Folder")
remoteEvents.Name = "RemoteEvents"
remoteEvents.Parent = ReplicatedStorage

local eventsToCreate = {"AssignRole", "TraitorSabotage"}
for _, eventName in ipairs(eventsToCreate) do
    if not remoteEvents:FindFirstChild(eventName) then
        local ev = Instance.new("RemoteEvent")
        ev.Name = eventName
        ev.Parent = remoteEvents
    end
end

-- Assure-toi que la suite du code permet bien à la partie de démarrer avec 1 joueur.
