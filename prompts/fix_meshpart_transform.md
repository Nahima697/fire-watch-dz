# Objectif : Corriger le positionnement et l'affichage des MeshParts dans WorldBuilder
Le script crée bien les dossiers dans l'Workspace, mais les MeshParts clonés ne s'affichent pas visuellement car leur taille ou leur position CFrame pose problème lors de l'instanciation.

Tâches :
1. **Validation de la taille (Size) :** Lors de l'instanciation de chaque MeshPart depuis `ReplicatedStorage.Prefabs`, vérifie si sa taille (`Size`) est valide. Si elle est nulle ou trop petite, applique une taille par défaut (ex: `Vector3.new(4, 4, 4)` ou conserve la taille native du mesh).
2. **Positionnement explicite :** Assure-toi que chaque objet reçoit une `CFrame` valide basée sur la grille du village, de la forêt ou des rochers, avec une hauteur suffisante pour reposer sur le sol (au-dessus de la BasePlate / du terrain).
3. **Propriétés de rendu :** Force `Anchored = true`, `CanCollide = true`, et assure-toi que le parent est bien le dossier de l'Workspace correspondant (`Workspace.Village`, `Workspace.Trees`, etc.).
4. **Sécurité :** Ne place aucun `return` à la fin de ce script serveur.
