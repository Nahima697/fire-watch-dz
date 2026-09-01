RÈGLE ABSOLUE : RÉPONDS UNIQUEMENT AVEC LE CODE LUAU COMPLET. AUCUNE EXPLICATION. AUCUN TITRE MARKDOWN. AUCUN #. 

Tâche : Le `GameManager` DOIT créer le RemoteEvent "AssignRole" de manière synchrone, tout en haut du script, avant toute autre logique, fonction, ou `task.wait()`. 

Assure-toi que les 15 premières lignes de `GameManager.server.luau` ressemblent EXACTEMENT à cette logique :

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteEvents = ReplicatedStorage:FindFirstChild("RemoteEvents")
if not remoteEvents then
    remoteEvents = Instance.new("Folder")
    remoteEvents.Name = "RemoteEvents"
    remoteEvents.Parent = ReplicatedStorage
end

if not remoteEvents:FindFirstChild("AssignRole") then
    local assignRoleEvent = Instance.new("RemoteEvent")
    assignRoleEvent.Name = "AssignRole"
    assignRoleEvent.Parent = remoteEvents
end

-- Suite du code normal du GameManager...
