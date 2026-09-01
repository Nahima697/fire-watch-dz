# Objectif : Adapter WorldBuilder au dossier Prefabs plat
Tous les objets 3D (modules de bâtiments, portes, éléments de décor) sont stockés directement à la racine de `ReplicatedStorage.Prefabs`, sans sous-dossiers.

Tâches :
1. Modifie `WorldBuilder.server.luau` pour qu'il parcoure directement tous les enfants de `ReplicatedStorage.Prefabs`.
2. Utilise une analyse textuelle des noms d'objets pour les trier dynamiquement (ex: identifier les portes via "Door", les éléments de structure, etc.).
3. Corrige la génération pour que le village et les éléments se construisent correctement à partir de cette liste à plat.
4. Règle absolue : aucun script serveur ne doit se terminer par un `return`.
