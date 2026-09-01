Tâche : Transformer les objets craftés (Torche et Lance) en vrais Tools équipables dans les mains.
Problème actuel : Les objets sont créés dans le Workspace et tombent par terre aux pieds du joueur.
Action :
1. Pour la "Torche" et la "Lance", crée un objet de type `Tool` (avec un enfant nommé "Handle" qui est une `BasePart`).
2. Paramètre correctement le `Handle` (taille, couleur, matériau, et `CanCollide = false` pour éviter qu'il ne bloque le personnage).
3. Au lieu de mettre l'objet dans le `Workspace`, parent-le directement dans `player.Backpack` pour qu'il apparaisse dans l'inventaire du joueur et puisse être tenu en main.
4. Conserve la "Barricade" dans le Workspace (car c'est un objet qu'on pose au sol), mais mets la Lance et la Torche dans le Backpack.
Rendu : Mets à jour la logique de craft dans CraftingSystem.server.luau.
