# Problème persistant
L'agent a modifié `CraftingSystem.server.luau`, mais le problème persiste en jeu :
1. **Pour la Lance (Outil) :** Une fois craftée, elle est enregistrée par le serveur mais n'est pas mise dans la main du joueur. Il faut que le script serveur (ou un RemoteEvent dédié) force l'équipement en récupérant l'outil dans le ServerStorage/ReplicatedStorage, en l'ajoutant au Backpack du joueur, puis en appelant `Humanoid:EquipTool()`.
2. **Pour la Fortification (Placement) :** Le craft se déclenche, mais il n'y a aucune interactivité visuelle. Il faut créer un script côté client (`CraftingClient.client.luau`) ou un module de placement qui active un mode "placement" : lorsque le joueur clique sur "Fortification", un modèle fantôme transparent suit le curseur via un Raycast au sol, et un clic gauche valide la position finale en envoyant les coordonnées au serveur pour instancier la fortification pour de bon.

# Objectifs
Corriger l'interaction de bout en bout (Client -> Serveur) pour que les outils s'équipent et que les fortifications s'affichent avec une zone de placement au sol.
