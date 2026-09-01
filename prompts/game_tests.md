Jeu Roblox : "Village Maudit".
Type : Script serveur de test (chemin : src/server/GameTests.server.luau).

# Objectif
Créer un script de test automatique qui s'exécute au démarrage du serveur (en Play Test Studio) et vérifie que les systèmes suivants fonctionnent réellement, en affichant PASS ou FAIL pour chacun dans la console avec le préfixe "[TEST]".

# Tests à implémenter

1. **GameConfig chargé correctement**
   - require(ReplicatedStorage.Modules.GameConfig) ne doit pas renvoyer nil.
   - GameConfig.DAY_DURATION, VOTE_DURATION, NIGHT_DURATION doivent être des nombres > 0.

2. **Cycle jour/nuit (SharedData.CurrentPhase)**
   - Attendre (avec WaitForChild et un timeout de 5 secondes) que ReplicatedStorage.SharedData existe.
   - Vérifier qu'après un court délai (task.wait de quelques secondes), SharedData:GetAttribute("CurrentPhase") a une valeur parmi "DAY_PHASE", "VOTE_PHASE", "NIGHT_PHASE" (pas nil).

3. **Monde généré (WorldBuilder)**
   - Vérifier que workspace:FindFirstChild("Trees") existe et contient au moins 1 enfant.
   - Vérifier que workspace:FindFirstChild("Village") existe.
   - Vérifier que workspace.Village:FindFirstChild("Fortifications") existe et contient les 4 portes ("Door_North", "Door_East", "Door_West", "Door_South").
   - Vérifier que chaque porte a bien une Part "DoorPart" avec un attribut "Health" numérique.

4. **Monstres (MonsterSpawner)**
   - Vérifier que CollectionService:GetTagged("MonsterSpawnPoint") retourne au moins 1 résultat.
   - Ne pas attendre une vraie nuit complète (trop long) ; se contenter de vérifier que les points de spawn existent et sont bien tagués.

5. **Vote (VotingSystem)**
   - Vérifier que ReplicatedStorage.RemoteEvents:FindFirstChild("VoteEvent") et "VoteResultEvent" existent.

6. **Craft (CraftingSystem, si déjà présent)**
   - Vérifier que ReplicatedStorage.RemoteEvents:FindFirstChild("CollectResourceEvent") et "CraftItemEvent" existent. Si absents, marquer le test comme SKIP plutôt que FAIL (le système peut ne pas encore être branché).

# Contraintes Techniques Strictes
- Chaque test doit être encapsulé dans un pcall pour qu'une erreur dans un test n'empêche pas les autres de s'exécuter.
- Format d'affichage strict pour chaque test : "[TEST] <nom du test> : PASS" ou "[TEST] <nom du test> : FAIL - <raison>" ou "[TEST] <nom du test> : SKIP - <raison>".
- À la fin, afficher un résumé : "[TEST] Résumé : X PASS, Y FAIL, Z SKIP".
- Le script doit attendre task.wait(8) au tout début avant de lancer les tests, pour laisser le temps aux autres scripts serveur (GameManager, WorldBuilder, etc.) de s'initialiser.
- Ne modifie aucun système existant, ce script est uniquement en lecture/vérification.
- Code robuste, en Luau pur, commentaires en français.

# Format de Sortie
Renvoie UNIQUEMENT le code Luau en texte brut. N'inclus aucune explication, et n'utilise AUCUNE balise markdown.
