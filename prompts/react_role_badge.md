Le projet vient d'ajouter React (Wally, jsdotlua/react et jsdotlua/react-roblox, sous
ReplicatedStorage.Packages.React et .ReactRoblox). Luau pur, PAS de JSX : utilise
React.createElement(type, props, children). Voir prompts/AI_CONTRACT.md section 7.

Crée le ModuleScript src/client/Components/RoleBadge.luau : composant fonctionnel React
prenant en props { role: string }. Affiche un petit badge permanent (Frame ~140x40px) en
haut à droite de l'écran rappelant le rôle actuel ("Traître" en rouge ou "Villageois" en
vert, mêmes couleurs que RoleReveal).
