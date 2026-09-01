# Prompt : Monstres Nocturnes - "Village Maudit"

Génère un script serveur complet `MonsterSpawner.server.luau` (destiné à
`src/server/`) pour le jeu "Village Maudit".

## Contexte
- Les points de spawn existent déjà dans le monde : des Parts invisibles
  nommées "MonsterSpawn_1" à "MonsterSpawn_6", taguées "MonsterSpawnPoint"
  via CollectionService (générées par WorldBuilder.server.luau).
- Les portes fortifiées existent : Model nommés "Door_North", "Door_East",
  "Door_West", "Door_South" dans workspace.Village.Fortifications, chacun
  contenant une Part "DoorPart".
- Le cycle jour/nuit gère les états via DayNightCycle (NIGHT_PHASE, DAY_PHASE).

## Ce que le script doit faire
1. Écouter le passage en NIGHT_PHASE (via un BindableEvent ou en observant
   un attribut partagé - choisis la méthode la plus simple et documente-la).
2. Faire apparaître des monstres (NPC humanoïdes basiques en primitives,
   pas de mesh externe) à chaque point taggé "MonsterSpawnPoint".
3. Nombre de monstres = BASE_MONSTER_COUNT + (NightCount - 1) *
   MONSTER_COUNT_INCREASE_PER_NIGHT, plafonné à MONSTER_MAX_COUNT
   (ces constantes existent déjà dans ReplicatedStorage.Modules.GameConfig).
4. Chaque monstre utilise PathfindingService pour se déplacer vers la porte
   fortifiée la plus proche. Une fois arrivé à la porte, il attaque
   (réduit une valeur "Health" sur la porte, détruit ou ouvre la porte
   si Health <= 0).
5. Si un joueur passe à portée (rayon ~15 studs) d'un monstre en dehors
   de la SafeZone, le monstre change de cible et attaque le joueur
   (dégâts sur Humanoid.Health, avec cooldown entre chaque attaque).
6. Au retour en DAY_PHASE, détruire tous les monstres restants (Debris ou
   Destroy direct), et nettoyer proprement les connexions/évènements.
7. Gérer les erreurs de pathfinding proprement (pcall autour de
   ComputeAsync, fallback simple si le chemin échoue).

## Contraintes techniques
- Utiliser des primitives simples (Part/MeshPart basique, forme humanoïde
  très simplifiée façon "bonhomme block") - pas de dépendance à un asset
  externe non fourni.
- Code commenté en français, cohérent avec le style des scripts existants.
- Pas d'erreur si aucun point de spawn ou aucune porte n'est trouvé au
  chargement (vérifications défensives, warn() plutôt que crash).

## Format de sortie
Un seul fichier Luau complet, prêt à coller, sans texte autour - juste le code.
