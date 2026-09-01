Dans src/server/WorldBuilder.server.luau, deux changements ciblés :

1. Fonction ensureBaseplate() : change bp.Color pour un vert terreux désaturé
   (Color3.fromRGB(70, 85, 50) au lieu du vert vif actuel), garde Material Grass.

2. Fonction generateSacredFire() : remplace le brasier actuel (un seul cylindre Neon) par
   quelque chose de plus impressionnant, sans changer le nom du Folder "SacredFire" ni la
   position (MapConfig.VILLAGE_CENTER) :
   - Un anneau de pierre autour (6-8 Parts cylindriques gris Material Slate/Rock disposés
     en cercle, formant un foyer en pierre).
   - Le bois qui brûle : quelques Parts fines marron (Material Wood) empilées en tas au
     centre de l'anneau.
   - Les flammes : garde un Part Material Neon orange par-dessus le bois, plus petit
     qu'avant.
   - Particules de braises : un ParticleEmitter (Color orange/rouge, petite taille, faible
     vitesse verticale) parenté à la part de flamme.
   - PointLight existant : augmente légèrement Brightness et Range pour que le feu soit
     visible depuis plus loin.
   - Garde un espace dégagé autour du foyer (rien d'autre à moins de 8 studs du centre).

Ne touche à aucune autre fonction du fichier (generateRiver, generateBridge, generateHouses,
etc. restent inchangées).
