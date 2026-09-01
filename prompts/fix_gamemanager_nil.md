Tâche : Résoudre l'erreur "attempt to compare nil <= number" dans GameManager.server.luau.
Problème : À la ligne 218 (ou aux alentours, probablement dans la boucle de jeu, la gestion du temps ou la vérification des joueurs), une variable `nil` est comparée à un nombre, ce qui fait planter le serveur.
Action : 
1. Trouve la comparaison mathématique problématique (ex: `<= 0` ou `<=` un autre nombre).
2. Ajoute une sécurisation pour garantir que la variable n'est jamais `nil` (ex: `local variable = maVariable or 0`).
3. Assure-toi que toutes les variables de temps ou de configuration (comme la durée des phases) sont bien initialisées au démarrage.
Rendu : Réécris l'intégralité du script GameManager.server.luau en conservant scrupuleusement toute l'architecture réseau actuelle exigée par l'AI_CONTRACT.
