Dans src/server/MonsterSpawner.server.luau, fonction createMonster(), remplace
humanoid.DisplayDistanceType = Enum.HumanoidDisplayDistanceType.None
par
humanoid.DisplayDistanceType = Enum.HumanoidDisplayDistanceType.Subject
pour que la barre de vie native Roblox s'affiche au-dessus du monstre quand un joueur le
vise ou lui inflige des dégâts. Ne change rien d'autre dans cette fonction.
