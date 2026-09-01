# 1. Correction de l'architecture
Le fichier `src/ServerScriptService/Server/WorldBuilder.lua` est au mauvais endroit. Déplace ou recrée toute la logique de génération procédurale dans `src/server/WorldBuilder.luau`. Supprime l'ancien emplacement pour éviter les conflits d'architecture.

# 2. Intégration stricte dans GameManager
Ouvre `src/server/GameManager.server.luau`. Tu dois importer ce module via `local WorldBuilder = require(script.Parent.WorldBuilder)` et appeler obligatoirement `WorldBuilder.Generate()` dans la séquence de démarrage du jeu, avant d'autoriser les joueurs à spawner.

# 3. Raycasting pour la hauteur (Smooth Terrain)
Le terrain de base est en relief. Dans le `WorldBuilder`, toutes les fonctions qui placent des structures (forêt, murs, village) doivent utiliser `workspace:Raycast()` depuis le ciel (ex: Y = 200) vers le bas pour trouver la position Y exacte du sol d'intersection. Ne hardcode plus la position Y, sinon les objets sont enterrés sous le terrain.

# 4. Nettoyage initial
Avant de générer le monde, la fonction `Generate()` doit chercher et détruire les anciens dossiers (`Campfires`, `Hazards`, `Rocks`, `Trees`, `Village`) s'ils existent déjà dans le workspace pour repartir sur une map propre.
