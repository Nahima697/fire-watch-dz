# Objectif : Adapter MonsterSpawner et GameTests au nouveau WorldBuilder 3D
Le générateur de monde (WorldBuilder) instancie désormais le village à partir des prefabs 3D. Les scripts `MonsterSpawner` et `GameTests` échouent car ils cherchent des noms de dossiers ou de portes qui ont changé.

Tâches :
1. **MonsterSpawner :** Modifie la recherche des portes (`Door_North`, `Door_East`, `Door_West`, `Door_South`) pour qu'elles correspondent exactement aux noms ou balises générés par le nouveau `WorldBuilder.server.luau` (ou ajoute un mécanisme de recherche souple / par tag).
2. **GameTests :** Mets à jour le test du monde (`Monde généré : FAIL`) pour qu'il valide la présence des dossiers et des structures créés par le nouveau générateur 3D (comme `workspace.Village`, `workspace.Trees`, etc.).
3. **Sécurité :** Assure-toi qu'aucun de ces scripts ne se termine par un `return` interdit s'il s'agit de Server Scripts.
