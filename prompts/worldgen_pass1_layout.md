Réécris entièrement src/server/WorldBuilder.server.luau pour générer un PREMIER JET
GRAYBOX (blocs simples, pas de décoration détaillée) de la map de Village Maudit, en
remplaçant l'ancien mode "placement 100% manuel".

Utilise require(ReplicatedStorage.Modules... non, require du ModuleScript
src/server/WorldGen/MapConfig.luau (chemin réel : script.Parent.WorldGen.MapConfig,
vérifie le chemin exact selon l'arborescence réelle) pour toutes les positions/tailles.

CONTRAINTES D'INTÉGRATION STRICTES (ne pas casser l'existant) :
1. À la toute fin du script, garde workspace:SetAttribute("WorldReady", true) — MonsterSpawner
   et VotingSystem attendent ce signal.
2. Garde la génération des points de spawn de monstres via CollectionService:AddTag(part,
   "MonsterSpawnPoint"), positionnés dans la forêt (au-delà de FOREST_INNER_RADIUS), au moins
   6 points répartis.
3. Crée une porte/barrière au bout du pont côté village : un Model ou BasePart, tagué
   CollectionService:AddTag(door, "Door"), avec :SetAttribute("Health", 500) et
   :SetAttribute("MaxHealth", 500) — c'est ce que MonsterSpawner cherche pour cibler les
   attaques de monstres. Sans ça les monstres n'ont plus de cible.
4. Ne touche PAS aux nœuds de ressources (ResourceNode déjà générés séparément), ne les
   duplique pas, ne les supprime pas.
5. Garde ensureBaseplate() ou équivalent pour le sol.

GÉNÉRATION GRAYBOX (blocs simples uniquement, pas de détails) :
- Sol : garde le baseplate existant.
- Rivière : suite de Parts plates bleu foncé suivant MapConfig.RIVER_PATH, largeur
  MapConfig.RIVER_WIDTH, dans un Folder "River".
- Pont : Part(s) en bois traversant la rivière à MapConfig.BRIDGE_POSITION, largeur
  MapConfig.BRIDGE_WIDTH, dans un Folder "OldBridge", avec la porte/barrière décrite au
  point 3 à son extrémité côté village.
- Place centrale : cercle de Parts plates (ou un seul gros Part cylindrique) autour de
  MapConfig.VILLAGE_CENTER, rayon MapConfig.VILLAGE_RADIUS, dans un Folder "CentralSquare".
- Brasier central : un Part cylindrique + PointLight orange/rouge à MapConfig.VILLAGE_CENTER,
  nommé "SacredFire", visible depuis la place.
- Maisons : pour chaque entrée de MapConfig.HOUSE_ZONES, un simple Part rectangulaire gris
  (pas de toit détaillé, pas de fenêtres) aux Position/Size/Rotation fournis, dans un Folder
  "Houses", nommés "House_1", "House_2", etc.
- Atelier : un Part simple à MapConfig.WORKSHOP_ZONE, Folder "Workshop".
- Cimetière : quelques Parts fines verticales (stèles simplifiées) autour de
  MapConfig.CEMETERY_ZONE, Folder "Cemetery".
- Forêt : entre FOREST_INNER_RADIUS et FOREST_OUTER_RADIUS autour du centre, génère des
  arbres simples (réutilise le style déjà utilisé pour les nœuds de ressources : Part
  cylindrique + Part sphérique, Material Wood/Leafy), densité suffisante pour cacher des
  silhouettes sans mur visuel impénétrable (espacement aléatoire, pas une grille), Folder
  "CursedForest".

Architecture : découpe la logique en fonctions locales claires (generateRiver,
generateBridge, generateCentralSquare, generateHouses, generateForest, etc.), appelées en
séquence à la fin du fichier. Reste dans CE SEUL fichier pour l'instant (pas de nouveaux
ModuleScripts de génération, on modularisera en Pass 2 si besoin).
