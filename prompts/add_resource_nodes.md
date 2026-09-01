Dans src/server/WorldBuilder.server.luau, ajoute une fonction generateResourceNodes()
appelée juste après generateMonsterSpawns() (même style que cette fonction) :

- Détruit un éventuel dossier "ResourceNodes" existant dans workspace, puis en recrée un.
- Génère 10 "arbres" : Part Anchored=true, CanCollide=true, Size ~(2,8,2),
  Material=Enum.Material.Wood, BrickColor marron, répartis aléatoirement dans un anneau
  entre CONFIG.VILLAGE_RADIUS et CONFIG.VILLAGE_RADIUS + 60 autour de l'origine, Y ajusté
  pour reposer sur le sol. Tag CollectionService:AddTag(part, "ResourceNode") et
  part:SetAttribute("ResourceType", "Wood").
- Génère 6 "rochers" : Part Anchored=true, CanCollide=true, Size ~(3,2,3),
  Material=Enum.Material.Slate, BrickColor gris, même zone. Tag "ResourceNode" et
  ResourceType = "Stone".

Respecte le style du fichier existant (CONFIG en haut, fonctions locales, appel ajouté
en bas à côté des appels existants).
