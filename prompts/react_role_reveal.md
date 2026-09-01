Le projet vient d'ajouter React (Wally, jsdotlua/react et jsdotlua/react-roblox, sous
ReplicatedStorage.Packages.React et .ReactRoblox). Luau pur, PAS de JSX : utilise
React.createElement(type, props, children). Voir prompts/AI_CONTRACT.md section 7.

Crée le ModuleScript src/client/Components/RoleReveal.luau : composant fonctionnel React
prenant en props { role: string, visible: boolean }. Affiche un overlay plein écran de
révélation de rôle : titre + sous-texte, rouge (Color3.fromRGB(200,30,30)) et texte
"Vous êtes un TRAÎTRE" / "Sabotez le village la nuit, sans vous faire démasquer." si
role == "Traitor", vert (Color3.fromRGB(80,200,120)) et "Vous êtes un VILLAGEOIS" /
"Survivez et démasquez le traître." si role == "Villager". N'affiche rien si visible == false.
