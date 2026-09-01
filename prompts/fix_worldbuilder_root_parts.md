# Objectif : Corriger le contenu des dossiers générés (Building_1, etc.) pour qu'ils affichent des MeshParts visibles
Sur la capture, les dossiers `Building_1` à `Building_6` sont bien créés dans l'Workspace, mais ils apparaissent vides ou ne contiennent pas de MeshParts instanciés avec des dimensions valides, ce qui fait que rien ne s'affiche visuellement.

Tâches :
1. **Inspection et instanciation profonde :** Dans `WorldBuilder.server.luau`, lorsque le script génère les bâtiments, la forêt ou les rochers, assure-toi qu'il clone réellement les MeshParts des prefabs à l'intérieur de chaque `Building_N` (par exemple en cherchant les MeshParts dans `ReplicatedStorage.Prefabs` et en les clonant sous le dossier du bâtiment avec une `CFrame` relative ou absolue correcte).
2. **Propriétés physiques :** Assure-toi que chaque MeshPart cloné a `Size` non nulle, `Anchored = true`, `Transparency = 0`, et qu'il est bien enfant du dossier cible dans l'Workspace.
3. **Sécurité :** Ne place aucun `return` à la fin de ce script serveur.
