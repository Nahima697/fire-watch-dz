Crée un nouveau LocalScript src/client/AmbianceSound.client.luau pour Village Maudit.

Utilise require(ReplicatedStorage.Modules.GameConfig).SOUNDS.DayAmbient et .NightAmbient
(deux rbxassetid, potentiellement des placeholders invalides pour l'instant — le script
doit rester silencieux sans erreur si le son ne charge pas, ne pas planter dessus).

Comportement :
- Crée deux Sound (SoundId = DayAmbient / NightAmbient) en boucle (Looped = true),
  Volume = 0 au départ, parentées à SoundService.
- Écoute ReplicatedStorage.SharedData:GetAttributeChangedSignal("CurrentPhase").
- Sur "DAY_PHASE" : joue daySound s'il n'est pas déjà en train de jouer, fondu (TweenService,
  ~2 secondes) de son volume vers 0.5, fondu de nightSound vers 0 puis Stop().
- Sur "NIGHT_PHASE" : l'inverse (fondu vers nightSound à 0.5, fondu daySound vers 0).
- Autres phases (VOTE_PHASE, etc.) : ne change rien, garde l'ambiance en cours.

N'utilise aucun RemoteEvent, uniquement SharedData déjà répliqué.
