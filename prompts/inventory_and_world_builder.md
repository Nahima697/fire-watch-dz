# 1. Scan et Inventaire Automatique des Préfabs
Écris un module ou une logique d'initialisation dans le script serveur qui parcourt récursivement le dossier `ReplicatedStorage.Prefabs` et ses sous-dossiers.
- Analyse le nom de chaque asset (MeshPart, Model, Part) pour le trier de façon exhaustive : Bâtiments/Maisons, Murs, Toits, Sols, Portes, Arbres, Rochers.
- Génère un fichier de rapport textuel ou Markdown (ex: `AssetInventory.md`) à la racine du projet listant clairement tous les prefabs détectés par catégorie pour consultation.

# 2. Refonte Intelligente du WorldBuilder
En te basant sur les assets réels trouvés dans le kit :
- **Village :** Génère un ensemble de bâtiments cohérents disposés autour du centre (en utilisant les vrais modèles de maisons ou d'éléments modulaires du kit).
- **Forêt & Environnement :** Déploie une forêt dense et des rochers tout autour en utilisant les assets de végétation du pack.
- **Positionnement par Raycast :** Chaque élément cloné doit impérativement utiliser un `Raycast` vertical (provenant du ciel vers le sol) combiné à `PivotTo()` pour se caler millimétriquement sur la surface du relief du terrain, évitant tout enfouissement ou décalage en hauteur.
- **Sécurisation :** Assure-toi que tous les sous-éléments des modèles clonés sont correctement ancrés (`Anchored = true`) et gardent leurs collisions.
