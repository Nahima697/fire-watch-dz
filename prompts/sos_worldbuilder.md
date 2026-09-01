# Objectif de sauvetage : Génération du monde brut
La développeuse est bloquée par la complexité des textures et des 150 éléments du kit. Nous allons faire une pause sur le texturing manuel.

# Tâche pour l'Agent
Modifie `WorldBuilder.server.luau` pour qu'il fasse EXACTEMENT ceci de manière autonome :
1. Parcourt `ReplicatedStorage.Prefabs`.
2. Utilise ta logique pour identifier ce qui ressemble à des murs, des toits et de la végétation d'après leurs noms (ex: contient "Wall", "Corner", "Roof", "Bush", "Grass").
3. Construis un village basique (assemble quelques structures simples) au centre de la map.
4. Génère la forêt autour avec les arbres et buissons.
5. NE GÈRE PAS les textures complexes (SurfaceAppearance) pour le moment. L'objectif est d'avoir des volumes, une carte jouable avec les nouveaux modèles 3D, et de conserver les ProximityPrompts sur les ressources.
