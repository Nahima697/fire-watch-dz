Dans src/server/WorldBuilder.server.luau, réécris uniquement la fonction generateForest()
(garde le même nom, le même Folder "CursedForest", gardée compatible avec
MapConfig.FOREST_INNER_RADIUS et FOREST_OUTER_RADIUS). Ne touche à aucune autre fonction.

Remplace la génération actuelle (densité uniforme aléatoire) par 3 bandes concentriques
entre FOREST_INNER_RADIUS et FOREST_OUTER_RADIUS :
1. Bord (premier tiers, le plus proche du village) : arbres espacés (spacing minimum ~14
   studs), tailles normales, quelques touffes d'herbe (petits Parts plats verts).
2. Forêt intermédiaire (deuxième tiers) : arbres plus nombreux (spacing minimum ~8), ajoute
   des rochers (Parts Material Rock/Slate, formes irrégulières) et des buissons (petites
   Parts sphériques vert foncé, Material Grass).
3. Forêt profonde (dernier tiers) : très dense (spacing minimum ~5), arbres plus grands et
   plus sombres (Color plus foncée, Material Slate ou Basalt pour certains troncs), quelques
   troncs légèrement inclinés (Orientation avec un angle X/Z aléatoire entre -10 et 10
   degrés) pour casser la régularité.

Garde l'algorithme de placement par tentatives avec espacement minimum déjà présent (ne pas
utiliser de grille). Position aléatoire (angle + distance dans la bande), pas de grille
régulière.
