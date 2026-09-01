Dans src/server/GameManager.server.luau, les fonctions setDayLighting() et setNightLighting()
existent déjà et gèrent Lighting.Atmosphere et Lighting.ColorCorrectionEffect. Affine-les sans
changer leur structure ni les appels existants (setPhase, task.wait, etc.) :

- Ajuste Lighting.OutdoorAmbient et Lighting.Ambient vers des tons naturels désaturés
  (bruns/verts sourds le jour, bleu-gris sombre la nuit), retire toute teinte vive/saturée.
- ColorCorrectionEffect : jour = Saturation légèrement réduite (-0.1), Contrast léger (+0.05),
  TintColor neutre chaud (255, 250, 240) ; nuit = Saturation -0.3, Contrast +0.1, TintColor
  bleu-gris froid (180, 190, 210).
- Atmosphere : renforce le contraste jour/nuit déjà en place (nuit plus dense/sombre, jour
  plus clair et dégagé).
- Ne touche à aucune autre fonction du fichier (setPhase, startGame, checkWinConditions, etc.).
