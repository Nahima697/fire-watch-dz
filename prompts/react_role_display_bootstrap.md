Le projet vient d'ajouter React (Wally, jsdotlua/react et jsdotlua/react-roblox, sous
ReplicatedStorage.Packages.React et .ReactRoblox). Voir prompts/AI_CONTRACT.md section 7.

Réécris src/client/RoleDisplay.client.luau en point d'entrée React :
- require(ReplicatedStorage.Packages.React) et require(ReplicatedStorage.Packages.ReactRoblox)
- require(script.Parent.Components.RoleReveal) et require(script.Parent.Components.RoleBadge)
  (ces deux ModuleScripts existent déjà dans src/client/Components/, ne les recrée pas).
  RoleReveal prend en props { role, visible }. RoleBadge prend en props { role }.
- Écoute ReplicatedStorage.RemoteEvents.AssignRole.OnClientEvent(role) exactement comme
  avant : ne change pas la source de données.
- Utilise React.useState pour piloter role et visible (visible = true à la réception du
  rôle, repasse à false après 5 secondes).
- Monte l'arbre via ReactRoblox.createRoot(playerGui):render(React.createElement(...))
  combinant RoleReveal et RoleBadge.
- Comportement fonctionnel identique à l'ancienne version : ne change aucune règle
  (durée, couleurs, texte).
