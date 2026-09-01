Erreur détectée par le guardrail : le fichier `src/server/WorldBuilder.server.luau` se termine par un `return`.
C'est un Server Script autonome, pas un ModuleScript. 

Tâche :
1. Retire le `return` à la toute fin du fichier.
2. À la place de ce `return`, appelle directement ta fonction de génération (par exemple `generateWorld()`) pour que le village et la forêt se construisent tout seuls au démarrage du serveur.
