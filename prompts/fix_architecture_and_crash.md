# 1. Correction du Crash Critique (GameManager)
Le jeu plante à la ligne 172 de `src/server/GameManager.server.luau` avec l'erreur `attempt to call a nil value` dans la fonction `startDayPhase`. Identifie et répare cet appel de fonction ou de variable manquante pour restaurer immédiatement la boucle de jeu.

# 2. Changement d'architecture pour le Craft (Visuel et Outils)
Tu ne dois plus générer de modèles 3D avec `Instance.new("Part")`. Le code doit maintenant s'attendre à ce que les objets soient déjà créés par le développeur dans un dossier `ReplicatedStorage.Prefabs`.
- **Outils (Lance, Torche) :** Le script de craft serveur doit cloner le `Tool` correspondant depuis `ReplicatedStorage.Prefabs` vers le `Backpack` du joueur, puis appeler obligatoirement `Humanoid:EquipTool()` pour le placer dans sa main.
- **Structures (Piège, Fortification) :** Le système de placement client doit cloner le modèle depuis `ReplicatedStorage.Prefabs` pour s'en servir comme `GhostPart` (avec une transparence modifiée) qui suit le Raycast de la souris avant le clic de validation.

# 3. Logique UI
Ne génère plus l'UI dynamiquement via le script. Le code doit interagir avec une UI existante située dans `PlayerGui.CraftingGui`. Ajoute uniquement la logique pour masquer le menu (propriété `Visible = false`) et afficher un texte de succès lors du clic sur le bouton "Fabriquer".
