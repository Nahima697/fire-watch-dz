Dans src/server/WorldBuilder.server.luau, ajoute une nouvelle fonction locale
generateRuins(), appelée juste après generateCemetery() dans la séquence principale
(ajoute l'appel à la fin avec les autres, ne réorganise rien d'existant).

Crée un Folder "Ruins" dans workspace, positionné à proximité de MapConfig.CEMETERY_ZONE
(à environ 10-15 studs de son centre). Génère 4-6 éléments de ruine simples : quelques
Parts représentant des murs de pierre effondrés (rectangles fins et bas, Material Slate,
Color gris sombre, certains inclinés/couchés au sol), un ou deux arbres morts (tronc fin
sans feuillage, Material Wood, Color gris-brun terne, quelques branches = Parts fines qui
dépassent à des angles irréguliers), et 2-3 pierres tombales supplémentaires ou pierres
gravées étranges (petits Parts avec des formes simples, Material Slate). Ambiance
inquiétante mais pas gore : pas de sang, pas de squelettes explicites.

Ne touche à aucune autre fonction de ce fichier.
