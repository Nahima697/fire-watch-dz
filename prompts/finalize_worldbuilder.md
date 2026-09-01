# Finalisation de WorldBuilder.server.luau
En te basant sur la logique de scan et de catégorisation que l'on vient de valider :
- Réécris complètement `src/server/WorldBuilder.server.luau`.
- Le script doit intégrer la fonction de scan récursif de `ReplicatedStorage.Prefabs` et le tri par catégories (Buildings, Walls, Roofs, Floors, Trees, Rocks, etc.) au démarrage.
- Il doit ensuite utiliser cet inventaire pour générer :
  1. Un **village** circulaire avec les bâtiments/modules trouvés.
  2. Une **forêt** dense et des **rochers** répartis en anneau autour du village.
- **Raycast et PivotTo :** Chaque asset cloné doit impérativement utiliser un Raycast vertical pour coller précisément à la surface du relief, combiné à `PivotTo()` et à un ancrage strict (`Anchored = true`) pour éviter tout bug de physique ou de positionnement.
