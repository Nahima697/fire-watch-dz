Dans src/server/MonsterSpawner.server.luau, fonction createMonster(), après la création
du Humanoid et du HumanoidRootPart, ajoute un Sound enfant du Torso :
- SoundId = require(ReplicatedStorage.Modules.GameConfig).SOUNDS.MonsterGrowl
  (ajoute le require de GameConfig en haut du fichier s'il n'existe pas déjà — vérifie
  d'abord, ne le duplique pas).
- Looped = true, Volume = 0.4, RollOffMode = Enum.RollOffMode.InverseTapered,
  RollOffMaxDistance = 80 (son positionnel 3D, s'estompe avec la distance).
- Sound:Play() juste avant que la fonction retourne le monstre.
- Le Sound est un enfant du monstre donc il sera nettoyé automatiquement par
  monster:Destroy() dans cleanupMonsters(), pas besoin de logique supplémentaire.
