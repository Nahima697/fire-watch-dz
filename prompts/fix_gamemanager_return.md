Ce fichier src/server/GameManager.server.luau est un Script auto-exécutable (.server.luau),
PAS un ModuleScript. La génération précédente a laissé un "return ..." en toute fin de
fichier, ce qui est invalide pour ce type de script. Supprime UNIQUEMENT cette ligne
finale de return, sans rien changer d'autre au contenu ni à la logique.
