Dans src/server/WorldBuilder.server.luau, ajoute une nouvelle fonction locale
generatePaths(), appelée dans la séquence principale juste après generateHouses() (ajoute
l'appel à la fin du fichier avec les autres, ne réorganise pas les appels existants).

Crée un Folder "Paths" dans workspace. Génère des segments de chemin en terre (Parts
plates, Material Ground ou Mud, Color3.fromRGB(90, 65, 45), Size Y = 0.3, légèrement
au-dessus du sol pour éviter le z-fighting) suivant ces tracés, avec la même technique que
generateRiver() (segments entre points consécutifs, orientés avec CFrame.lookAt) :

1. Chemin principal : de MapConfig.BRIDGE_POSITION vers MapConfig.VILLAGE_CENTER (largeur
   6), en passant par un point intermédiaire pour éviter une ligne parfaitement droite.
2. Pour chaque zone de MapConfig.HOUSE_ZONES, un chemin secondaire plus étroit (largeur 3)
   depuis MapConfig.VILLAGE_CENTER vers la Position de la maison.
3. Un chemin vers MapConfig.WORKSHOP_ZONE.Position (largeur 4).

Ne touche à aucune autre fonction de ce fichier.
