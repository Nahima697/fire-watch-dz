# 1. Module de génération 100% procédurale
Réécris intégralement `src/server/WorldBuilder.luau` pour qu'il soit un ModuleScript standard (`local WorldBuilder = {}` et `return WorldBuilder`).
Ne fais aucune référence à `ReplicatedStorage.Prefabs`. Tout l'environnement doit être généré uniquement avec des instances de base (`Instance.new("Part")`, `Instance.new("WedgePart")`, etc.).

# 2. Adaptation au terrain (Gestion de la hauteur)
Le terrain de base est en relief (Smooth Terrain). Tu dois créer une fonction utilitaire utilisant `workspace:Raycast()` (depuis `Y = 300` vers le bas) pour trouver l'altitude exacte du sol vert. Toutes les structures générées (maisons, arbres, murs) doivent utiliser ce raycast pour se positionner à la bonne hauteur et ne pas être enterrées.

# 3. Éléments à générer dans WorldBuilder.Generate()
- **Nettoyage :** Détruis les anciens dossiers de l'environnement s'ils existent (Village, Trees, etc.).
- **Feu central :** Un bloc avec un `Instance.new("Fire")` au centre.
- **Bâtiments :** Un cercle de maisons très simples (un bloc marron pour le mur, un `WedgePart` orange pour le toit).
- **Muraille :** Des blocs gris formant des portes ou des barricades aux points cardinaux.
- **Forêt dense :** Autour du village, génère de nombreux arbres constitués d'un tronc (bloc allongé) et de feuilles (une Part sphérique verte).
- **Spawns :** Place des points de spawn invisibles autour du feu pour les monstres ou les joueurs.
