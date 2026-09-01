Tâche : Débugger le blocage silencieux de la fabrication dans CraftingSystem.server.luau.
Problème : Le joueur clique sur "Fabriquer", l'événement `CraftItemEvent` est reçu par le serveur, mais rien ne se passe et aucune erreur n'apparaît.
Action :
1. Dans `CraftItemEvent.OnServerEvent`, ajoute un `print("[CraftingSystem] Demande de craft reçue pour:", itemName)` tout au début.
2. Commente temporairement la vérification de la phase de jour (`if currentPhase ~= "DAY_PHASE" then return end`) pour autoriser le craft tout le temps lors de nos tests.
3. Avant CHAQUE `return` qui bloque l'exécution (recette introuvable, ressources insuffisantes, joueur/character introuvable), ajoute un `warn("[CraftingSystem] Craft annulé : Raison X")` pour qu'on sache exactement ce qui bloque.
Rendu : Mets à jour l'intégralité du script CraftingSystem.server.luau avec ces ajouts de debug.
