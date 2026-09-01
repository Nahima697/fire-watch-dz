Tu es un expert en développement Roblox Luau. Génère un script serveur complet pour `init.server.luau` qui gère un cycle jour/nuit fluide et immersif d'une durée totale de 5 minutes (réparties entre le jour, le crépuscule, la nuit noire et l'aube).

Exigences techniques :
- Utilise `Lighting` pour modifier dynamiquement les propriétés : `ClockTime`, `FogEnd`, `Brightness`, et la couleur de l'atmosphère si présente.
- Crée une boucle infinie (`while true do`) propre et optimisée avec `task.wait()`.
- Affiche des messages d'ambiance discrets dans la console (ou via des notifications si nécessaire) lorsque la nuit tombe ("La nuit commence à envelopper le village...") pour préparer le terrain aux mécaniques de survie.
- Le code doit être uniquement du code Luau propre, sans commentaires superflus, prêt à être exécuté.
