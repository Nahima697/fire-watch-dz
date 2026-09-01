Jeu Roblox : "Village Maudit".
Type : Script serveur (chemin : src/ServerScriptService/Server/WorldBuilder.lua).

# Objectif
Créer le module `WorldBuilder.lua` pour générer un environnement riche et immersif au démarrage du serveur : un grand terrain, une forêt dense tout autour, et un vrai village central fortifié avec plusieurs maisons détaillées.

# Contraintes Techniques et Visuelles Strictes
- **Terrain & Sol** : Une plaque de base d'au moins 300x300 studs avec une texture herbe/sol visible.
- **Forêt Dense** : Au moins 200 à 250 arbres générés en cercle autour du centre (laissant un espace libre de 60 studs de rayon au milieu pour le village). Varier les hauteurs et échelles via `math.random`.
- **Bâtiments du Village** : 5 à 7 grands bâtiments en bois et pierre avec des murs épais, un sol, et des toits en pente (`WedgePart`). Disposer les bâtiments en cercle autour d'une place centrale.
- **Portes Fortifiées** : Créer 3 ou 4 murs d'enceinte ou portes nommées précisément `Door_North`, `Door_East`, `Door_West`, `Door_South` pour que le futur `SabotageSystem.lua` puisse les cibler.
- **Spawns de Monstres** : 6 points de spawn invisibles en lisière de forêt, tagués avec `CollectionService:AddTag(part, "MonsterSpawnPoint")` et nommés `MonsterSpawn_1`, etc.
- **Décorations de Place Centrale** : Ajouter un grand feu de camp central, des tonneaux, des caisses et des lampadaires/torches pour meubler la place.
- **Éclairage** : Configurer `Lighting` pour un démarrage en journée (`ClockTime = 12`).
- Fournir une fonction `WorldBuilder.Generate()` appelée au démarrage.
- Code en Luau pur, sans balise markdown ni texte superflu.

# Format de Sortie
Renvoie UNIQUEMENT le code Luau en texte brut. N'inclus aucune explication, et n'utilise AUCUNE balise markdown.
