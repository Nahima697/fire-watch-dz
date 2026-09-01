# Contexte du problème
Le système de craft de "Village Maudit" valide correctement la logique d'obtention des objets, mais il y a un problème de rendu visuel et d'interaction en jeu :
1. **Les outils craftés ne s'équipent pas dans la main :** Lorsqu'un joueur crafte un outil, il reste dans son `Backpack` et ne passe pas dans son `Character` pour devenir l'objet actif. Il faut forcer l'équipement via `Humanoid:EquipTool()` et s'assurer que l'item est bien un `Tool` avec une `Handle`.
2. **Les fortifications et les pièges n'ont pas de zone de placement visuel :** Lorsqu'un joueur crafte une structure défensive ou un piège, il n'y a pas de prévisualisation (Ghost Part) ni de Raycast au sol pour choisir l'emplacement avant la pose, ce qui fait qu'ils n'apparaissent nulle part de manière visible.

# Objectifs de correction
- Mettre à jour la logique de craft/équipement pour que les outils se mettent automatiquement dans la main du joueur.
- Implémenter un système simple de prévisualisation (Raycast + Part transparente) pour le placement des pièges et fortifications avant validation finale sur la map.
