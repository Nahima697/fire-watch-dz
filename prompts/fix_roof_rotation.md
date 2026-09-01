Dans src/server/WorldGen/HouseGenerator.luau, les pentes de toit sont actuellement créées
avec createWedge(...) et une rotation composée CFrame.Angles(0, ±math.pi/2, ±math.pi/2), ce
qui fait que le panneau s'affiche vertical (comme un mur) au lieu d'incliné (comme un toit).

Remplace CHAQUE paire de pentes de toit (les 4 occurrences, une par variante 1/2/4/5, la
partie "-- Pente gauche" / "-- Pente droite" ou équivalent juste avant "-- Cheminée" ou la
fin de chaque fonction de variante) par des Parts plates simples inclinées sur UN SEUL axe,
au lieu de WedgePart :

Pour chaque côté du toit :
- Instance.new("Part"), Size = Vector3.new(depth + 1, 0.4, width/2 + 1) (panneau plat fin).
- CFrame = baseCFrame * CFrame.new(offsetX, roofHeight, 0) * CFrame.Angles(0, 0, angle)
  où offsetX = -width/4 pour le côté gauche (angle = math.rad(30)) et +width/4 pour le
  côté droit (angle = -math.rad(30)). Ajuste le signe de l'angle si besoin après test pour
  que les deux pans forment bien un "toit en V inversé" (/\\) vu de face, pas un creux (\\/).
- Material = Enum.Material.Slate, Color = la couleur de toit déjà utilisée dans chaque
  variante (roofColor), Anchored = true.

Garde roofHeight et roofSlope existants pour le positionnement vertical de base (tu peux
ajuster légèrement si nécessaire pour que les deux pans se rejoignent visuellement au
centre). Ne touche à rien d'autre dans le fichier (murs, portes, fenêtres, cheminées,
clôtures, terrasses restent inchangés).
