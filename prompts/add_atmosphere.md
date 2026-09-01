Dans src/server/GameManager.server.luau, les fonctions setDayLighting() et
setNightLighting() existent déjà et gèrent ClockTime/Brightness/Ambient/Fog. Étoffe-les
sans rien casser de leur comportement actuel :

1. Ajoute (ou récupère si déjà présent) un Lighting.Atmosphere (Instance "Atmosphere") :
   - Jour : Density ~0.3, Haze ~1, Color proche du blanc, Decay bleuté clair, Glare ~0.
   - Nuit : Density ~0.5, Haze ~3, Color bleu-gris sombre, Decay plus sombre, Glare ~0.2.
2. Ajoute (ou récupère si déjà présent) un Lighting.ColorCorrection (Instance
   "ColorCorrectionEffect") :
   - Jour : Saturation 0, Contrast 0 (neutre).
   - Nuit : Saturation -0.2 (légèrement désaturé), Contrast 0.1, TintColor légèrement bleuté.

Utilise Lighting:FindFirstChild(...) avant de créer chaque instance pour ne pas dupliquer
si le script redémarre. N'utilise aucun TweenService pour l'instant, applique juste les
valeurs directement dans setDayLighting/setNightLighting comme le reste de ces fonctions.
