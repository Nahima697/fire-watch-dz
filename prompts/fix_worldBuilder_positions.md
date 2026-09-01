# Objectif : Corriger le positionnement et l'assemblage 3D des éléments dans WorldBuilder
Les modèles (`Building_1`, `Door`, `Floor`, `Roof`) sont bien créés dans l'Workspace, mais leurs MeshParts enfants se superforcent ou n'ont pas de position relative correcte.

Tâches :
1. **Espacement et CFrame relative :** Modifie la logique de construction des bâtiments dans `WorldBuilder.server.luau` pour que chaque composant d'un bâtiment (`Door`, `Floor`, `Roof`, murs) reçoive une `CFrame` décalée par rapport à l'origine du bâtiment (par exemple en espaçant les pièces selon un axe X/Z ou en définissant une `PrimaryPart` pour chaque modèle).
2. **Propriétés visuelles forcées :** S'assure que chaque MeshPart a `Transparency = 0`, `CanCollide = true`, `Anchored = true`, et une `Size` non nulle (récupérée de l'asset d'origine).
3. **Sécurité :** Ne place aucun `return` à la fin de ce script serveur.
