Jeu Roblox : "Village Maudit".
Type : Script serveur (chemin : src/server/GameManager.server.luau).

# Contexte du projet existant (à respecter strictement, ne rien redéfinir en double)
- RoleManager.server.luau existe déjà et expose une table globale locale (pas un module require-able actuellement). Il contient RoleManager.StartGame() qui assigne les rôles (Villager/Traitor) via attributs joueur "Role" et "IsAlive", et gère déjà le sabotage via un RemoteEvent "TraitorSabotage". Il lit workspace:GetAttribute("IsNight") pour savoir s'il est nuit.
- MonsterSpawner.server.luau existe déjà et attend un changement d'attribut sur ReplicatedStorage.SharedData:GetAttribute("CurrentPhase"), avec les valeurs possibles "DAY_PHASE" et "NIGHT_PHASE". Il gère lui-même le spawn/despawn des monstres, ne pas dupliquer cette logique.
- VotingSystem.server.luau existe déjà (vérifier son mécanisme de déclenchement, probablement aussi basé sur un attribut ou un RemoteEvent - si le script actuel n'a pas de mécanisme clair, ce nouveau GameManager doit simplement écrire ReplicatedStorage.SharedData:SetAttribute("CurrentPhase", "VOTE_PHASE") au bon moment, en plus de DAY_PHASE/NIGHT_PHASE).
- GameConfig.lua existe dans ReplicatedStorage/Modules avec les constantes DAY_DURATION, VOTE_DURATION, NIGHT_DURATION, MIN_PLAYERS, NIGHTS_TO_SURVIVE (utiliser ces valeurs, ne pas en redéfinir de nouvelles en dur).

# Objectif
Créer LE script central et unique qui pilote tout le cycle de partie. C'est la seule source de vérité pour l'état du jeu. Aucun autre script ne doit gérer sa propre boucle de cycle jour/nuit.

# Responsabilités strictes de ce script
1. Détecter quand assez de joueurs sont présents (GameConfig.MIN_PLAYERS) et démarrer automatiquement une partie après un court délai d'attente.
2. Appeler RoleManager.StartGame() au lancement de la partie (via _G ou en exposant RoleManager comme un vrai module - adapter RoleManager.server.luau en ModuleScript si nécessaire n'est PAS demandé ici, донc utiliser une approche simple : convertir uniquement l'appel nécessaire, par exemple en écoutant un BindableEvent "StartGameEvent" que RoleManager.server.luau devra écouter - créer ce BindableEvent dans ReplicatedStorage s'il n'existe pas, nommé "StartGameSignal").
3. Gérer la boucle de phases : DAY_PHASE (GameConfig.DAY_DURATION secondes) -> VOTE_PHASE (GameConfig.VOTE_DURATION secondes) -> NIGHT_PHASE (GameConfig.NIGHT_DURATION secondes) -> retour à DAY_PHASE, en boucle.
4. À CHAQUE changement de phase, écrire ReplicatedStorage.SharedData:SetAttribute("CurrentPhase", <nom de la phase>) (créer le Folder "SharedData" dans ReplicatedStorage s'il n'existe pas).
5. À CHAQUE passage en NIGHT_PHASE, incrémenter un compteur de nuits et l'écrire dans ReplicatedStorage.SharedData:SetAttribute("NightCount", <nombre>).
6. À CHAQUE changement de phase, écrire aussi workspace:SetAttribute("IsNight", true ou false) pour rester compatible avec RoleManager.server.luau qui lit déjà cet attribut.
7. Gérer les transitions d'éclairage directement dans ce script avec TweenService (pas de script séparé) : jour = ambiance claire (Brightness 2, OutdoorAmbient clair, FogEnd élevé), nuit = ambiance sombre (Brightness bas, FogEnd réduit, teinte violette/sombre). Transition douce sur 3 secondes.
8. Vérifier les conditions de victoire à chaque fin de NIGHT_PHASE : si le nombre de nuits survécues atteint GameConfig.NIGHTS_TO_SURVIVE, ou si tous les traîtres sont éliminés (lire les attributs joueur "Role" et "IsAlive"), déclarer la victoire des villageois. Si le nombre de traîtres vivants est supérieur ou égal au nombre de villageois vivants, déclarer la victoire des traîtres. Dans les deux cas, arrêter la boucle de cycle et afficher le résultat via print() et un attribut ReplicatedStorage.SharedData:SetAttribute("GameResult", <"Villagers" ou "Traitors">).
9. Fournir une fonction pour retirer un joueur de la partie (mort, banni) qui met à jour son attribut "IsAlive" à false, appelable par d'autres scripts via un BindableFunction ou BindableEvent nommé "RemovePlayerFromGame" (créer dans ReplicatedStorage s'il n'existe pas).

# Contraintes Techniques Strictes
- Un seul script, aucune boucle de cycle jour/nuit concurrente ailleurs (ce script est la seule source de vérité).
- Code défensif : ne jamais crasher si RoleManager, MonsterSpawner ou VotingSystem ne sont pas encore chargés (utiliser WaitForChild avec timeout raisonnable, pcall si nécessaire).
- Code robuste, optimisé et en Luau pur, sans balise markdown ni texte superflu.
- Commentaires en français.

# Format de Sortie
Renvoie UNIQUEMENT le code Luau en texte brut. N'inclus aucune explication, et n'utilise AUCUNE balise markdown.
