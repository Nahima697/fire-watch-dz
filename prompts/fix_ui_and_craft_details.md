# Corrections critiques du système de Craft et d'UI

Le code actuel génère des comportements inacceptables en jeu. Tu dois modifier strictement les fichiers concernés en appliquant les consignes suivantes :

## 1. Interface Utilisateur (UI) du Craft
- **Position :** L'UI du craft est actuellement mal placée (collée au chat en haut). Il faut la repositionner proprement au centre de l'écran ou dans un panneau latéral dédié et visible, avec un fond semi-transparent correct.
- **Feedback :** Lorsque le joueur clique sur "Fabriquer", l'UI doit immédiatement se fermer ou afficher un indicateur clair de succès (ex: message "Objet crafté !") pour éviter l'effet "rien ne se passe".

## 2. Équipement des Outils (Lance, Torche)
- Lorsque l'item crafté est un outil (`Tool` comme la lance ou la torche), le serveur ne doit pas seulement le mettre dans le `Backpack`. Il doit *immédiatement* forcer l'équipement dans les mains du joueur via `humanoid:EquipTool(tool)` pour qu'il soit directement visible et utilisable.

## 3. Modélisation et Placement du Piège / Fortification
- **Visuel du Piège :** Une simple plaque en bois plane au sol ne suffit pas. Le piège doit avoir du volume, une vraie structure reconnaissable (ex: des piques cachées ou une cage/structure de piège survivaliste) et non un simple bloc plat.
- **Placement :** Utiliser un système de `Raycast` avec une pièce transparente (`GhostPart`) qui suit la souris au sol tant que le joueur n'a pas cliqué pour valider l'emplacement exact.
