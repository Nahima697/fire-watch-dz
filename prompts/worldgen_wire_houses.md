Dans src/server/WorldBuilder.server.luau, la fonction generateHouses() crée actuellement
un simple Part rectangulaire brique par maison. Remplace ça pour utiliser le nouveau
module src/server/WorldGen/HouseGenerator.luau (require en haut du fichier à côté du
require de MapConfig existant, ne duplique pas le require de MapConfig).

generateHouses() doit maintenant, pour chaque entrée de MapConfig.HOUSE_ZONES (index i,
zone) : appeler HouseGenerator.Create(((i - 1) % 5) + 1, zone.Position, zone.Size,
zone.Rotation) pour faire varier les modèles (1 à 5 en boucle), parenter le Model retourné
au Folder "Houses" existant (garde le nom du Folder identique).

Ne touche à aucune autre fonction de ce fichier (generateRiver, generateBridge,
generateCentralSquare, generateSacredFire, generateWorkshop, generateCemetery,
generateForest, generateMonsterSpawns, ensureBaseplate, clearExistingWorld restent
inchangées, ainsi que la séquence d'appels à la fin du fichier).
