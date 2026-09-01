# Objectif : Forcer WorldBuilder à instancier correctement les MeshParts de ReplicatedStorage.Prefabs
Le `WorldBuilder` actuel ne parvient pas à afficher les éléments car il cherche des structures de `Model` complexes alors que les prefabs sont des `MeshParts` directs.

Tâches :
1. **Gestion des MeshParts :** Modifie la fonction de génération/clonage de `WorldBuilder.server.luau` pour qu'elle gère nativement les objets de type `MeshPart` (en vérifiant `if prefab:IsA("MeshPart")` ou `BasePart`).
2. **Attribution de position et d'ancrage :** Assure-toi que chaque clone se voit attribuer une `CFrame` correcte sur le terrain (au-dessus de la BasePlate) et qu'il est bien défini sur `Anchored = true` pour ne pas tomber à travers le sol.
3. **Parenting Workspace :** Rattachons chaque objet cloné directement à un dossier dans l'Workspace (`Workspace.Village`, `Workspace.Trees`, etc.) pour qu'ils soient immédiatement visibles dans le viewport.
4. **Sécurité :** Ne place aucun `return` à la fin de ce script serveur.
