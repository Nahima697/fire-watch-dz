# RÔLE
Expert en développement Roblox Luau et UI/UX.

# RÈGLES STRICTES ET ARCHITECTURE
- Tu DOIS impérativement lire et respecter toutes les consignes du fichier `prompts/AI_CONTRACT.md`.
- Ne modifie sous aucun prétexte l'architecture globale du projet (Rojo, structure des dossiers).
- Ne touche PAS au fichier `src/server/WorldBuilder.server.luau` ni aux autres systèmes (GameManager, rôles, etc.).
- Tes interventions doivent se limiter STRICTEMENT à `src/client/CraftingClient.client.luau` et `src/server/CraftingSystem.server.luau`.

# CONTEXTE ET MISSIONS
Nous avons un système de craft fonctionnel, mais il nécessite deux améliorations majeures :

## 1. UI Dynamique (Fichier : CraftingClient.client.luau)
- Le bouton "Fabriquer" pour chaque recette dans le menu (touche C) doit réagir dynamiquement à l'inventaire du joueur (attributs "Wood" et "Stone").
- Si le joueur possède les ressources suffisantes : le bouton doit être vert et cliquable (`Interactable = true`).
- Si le joueur n'a pas les ressources : le bouton doit être grisé et désactivé (`Interactable = false`).
- Assure-toi que cet état se met à jour en temps réel dès que les ressources du joueur changent.

## 2. Équipement Physique (Fichier : CraftingSystem.server.luau)
- Actuellement, les armes et objets fabriqués (Lance, Torche) sont instanciés mais tombent sur le sol à côté du joueur.
- Modifie la logique de création pour que l'objet soit directement équipé en main.
- Positionne et soude l'objet (via un `Weld` ou un `Motor6D`) à la main droite du personnage (`RightHand` pour R15 ou `Right Arm` pour R6) pour que le joueur le porte visuellement.
