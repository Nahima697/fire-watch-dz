Crée le ModuleScript src/server/WorldGen/MapConfig.luau pour Village Maudit.

C'est un module de configuration PUR (que des constantes, aucune logique de création
d'instances), qui centralise tous les paramètres géométriques de la map pour qu'on puisse
les ajuster facilement sans régénérer tout le code. Retourne une table avec :

- VILLAGE_CENTER = Vector3 (position du brasier central, ex: Vector3.new(0, 0, 0))
- VILLAGE_RADIUS = number (rayon de la place centrale, ex: 25)
- RIVER_PATH = une liste de Vector3 formant le tracé de la rivière (asymétrique, pas une
  ligne droite parfaite, doit passer à environ 40-60 studs du centre d'un côté de la map)
- RIVER_WIDTH = number (ex: 12)
- BRIDGE_POSITION = Vector3 (là où le pont traverse la rivière, sur le chemin entre le
  village et la forêt)
- BRIDGE_WIDTH = number (ex: 10, assez large pour plusieurs joueurs et une attaque de
  monstres)
- HOUSE_ZONES = une liste d'au moins 8 tables {Position = Vector3, Size = Vector3,
  Rotation = number} pour des emplacements de maisons en blocs simples, disposés de façon
  ASYMÉTRIQUE autour de la place centrale (pas en cercle parfait, pas de grille), avec des
  tailles et rotations variées
- WORKSHOP_ZONE = {Position = Vector3, Size = Vector3} (zone atelier/craft, distincte des
  maisons)
- CEMETERY_ZONE = {Position = Vector3, Radius = number} (petite zone secondaire, à l'écart,
  au-delà de la rivière ou en bordure de forêt)
- FOREST_INNER_RADIUS = number (où commence la forêt dense, ex: VILLAGE_RADIUS + 40)
- FOREST_OUTER_RADIUS = number (où elle s'arrête, ex: FOREST_INNER_RADIUS + 60)

Pas de commentaires superflus, juste les valeurs avec un commentaire court par section.
