Dans src/server/MonsterSpawner.server.luau, fonction setupMonsterBehavior, la boucle
"for i = 2, math.min(#waypoints, 5)" appelle humanoid:MoveTo(waypoint.Position) puis
task.wait(0.5) fixe avant le waypoint suivant, sans attendre l'arrivée réelle du monstre
(WalkSpeed=80, WaypointSpacing=4 studs => trajet réel ~0.05s). Le monstre avance donc par
à-coups et semble lent. Remplace le task.wait(0.5) fixe par une attente sur l'event
humanoid.MoveToFinished (avec un timeout de sécurité de 1 seconde) pour enchaîner le
waypoint suivant dès que le monstre a réellement atteint le précédent.
