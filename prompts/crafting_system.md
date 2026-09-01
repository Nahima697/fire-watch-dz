Jeu Roblox : "Village Maudit".
Type : Script serveur (chemin : src/server/CraftingSystem.server.luau) + RemoteEvents nécessaires + LocalScript client minimal pour l'UI de craft.

# Contexte du projet existant (à respecter strictement)
- GameConfig.lua existe dans ReplicatedStorage/Modules (require depuis là).
- SharedData (Folder dans ReplicatedStorage) contient l'attribut "CurrentPhase" (DAY_PHASE / VOTE_PHASE / NIGHT_PHASE), écrit par GameManager.server.luau. Le craft n'est autorisé qu'en DAY_PHASE.
- Les portes fortifiées existent : Model nommés "Door_North", "Door_East", "Door_West", "Door_South" dans workspace.Village.Fortifications, chacun avec une Part "DoorPart" possédant un attribut "Health" (défini par MonsterSpawner.server.luau, valeur max 500).
- Les arbres existent dans workspace.Trees (Part nommées "TreeTrunk" et "TreeLeaves").
- Les rochers/décorations n'existent pas encore de façon distincte, considérer que la "pierre" se ramasse sur des Parts nommées "Rock" à ajouter séparément (ne pas les générer dans ce script, juste prévoir le nom "Rock" en dur pour la collecte).

# Objectif
Système de collecte de ressources (bois, pierre) et de craft d'objets utiles pour la survie du village :
1. Fortification de porte (répare Health d'une porte fortifiée, +100 points, coût : 3 bois + 2 pierre).
2. Barricade temporaire (Part solide bloquant un point de spawn de monstre pendant un temps limité, coût : 5 bois).
3. Torche portable (augmente légèrement la vitesse de déplacement du joueur la nuit et éclaire autour de lui, coût : 2 bois + 1 pierre).
4. Lance rudimentaire (arme simple infligeant des dégâts à un monstre au contact, coût : 4 bois + 1 pierre).

# Contraintes Techniques Strictes
- Système d'inventaire simple par joueur, stocké en attributs joueur ("Wood" et "Stone", entiers, valeur par défaut 0).
- Collecte de ressources : le joueur clique/interagit avec un arbre (TreeTrunk) ou un rocher (Rock) via un RemoteEvent "CollectResourceEvent" ; incrémente Wood ou Stone de 1 côté serveur, avec un cooldown de 2 secondes par joueur pour éviter le spam. Détruire ou réduire la Part source n'est pas nécessaire pour cette version, juste incrémenter la ressource.
- Craft : RemoteEvent "CraftItemEvent" recevant le nom de l'objet à crafter ; vérifier côté serveur que le joueur a bien les ressources ET que la phase actuelle est DAY_PHASE (lire SharedData:GetAttribute("CurrentPhase")), sinon ignorer silencieusement. Déduire les ressources et appliquer l'effet.
- Toute la logique de validation (ressources suffisantes, phase correcte, cooldown) doit être strictement côté serveur ; le client ne fait qu'envoyer la demande et afficher le résultat.
- LocalScript minimal : afficher les quantités de Wood/Stone du joueur (via GetAttributeChangedSignal sur le joueur), et un petit menu avec les 4 objets crafables et leur coût, avec un bouton "Fabriquer" par objet (désactivé visuellement si ressources insuffisantes).
- Code défensif : ne jamais crasher si une porte, un arbre ou un point de spawn n'existe pas au moment du craft (vérifications avec FindFirstChild, warn() plutôt que crash).
- Fournir les fichiers séparément avec un séparateur clair "-- FICHIER: CraftingSystem.server.luau" et "-- FICHIER: CraftingClient.client.luau".
- Code robuste, optimisé, en Luau pur, commentaires en français.

# Format de Sortie
Renvoie UNIQUEMENT le code Luau des deux fichiers, séparés comme indiqué, en texte brut. N'inclus aucune explication, et n'utilise AUCUNE balise markdown.
