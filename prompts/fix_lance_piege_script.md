Dans src/server/CraftingSystem.server.luau, les fonctions createLance() et createPiege()
créent chacune un Instance.new("Script") puis lui assignent script.Source = [[ ... ]] à
l'exécution. Roblox interdit désormais l'écriture de Script.Source à l'exécution (erreur
"lacking capability PluginOrOpenCloud"), ce qui fait planter ces deux fonctions avant leur
return et empêche tout craft de Lance ou de Piège d'aboutir.

Corrige les deux fonctions en supprimant complètement la création du Script enfant et en
connectant la logique directement en Luau serveur dans CraftingSystem.server.luau :

- createLance() : au lieu du Script embarqué, fait
  lance.Activated:Connect(function() ... end) directement après la création du Tool, avec
  exactement la même logique que l'ancien script (raycast de 10 studs depuis le
  HumanoidRootPart du personnage porteur, dégâts de 20 sur le premier Humanoid touché qui
  n'est pas celui du porteur).

- createPiege(position) : au lieu du Script embarqué, fait
  base.Touched:Connect(function(hit) ... end) directement après la création de la part
  "Base", avec la même logique (30 dégâts, debounce par joueur de 2 secondes via
  task.delay, pas de wait() bloquant).

Ne change rien d'autre (géométrie, recettes, RemoteEvents inchangés).
