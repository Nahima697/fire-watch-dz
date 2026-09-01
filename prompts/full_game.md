Tu es l'architecte technique principal du jeu de survie horrifique "Village Maudit" sur Roblox. Rédige un document de synthèse ou un script de configuration global qui vérifie l'intégration des trois piliers fondamentaux du jeu :
1. L'initialisation du monde (`WorldBuilder.server.luau`) : Génération procédurale de la zone de sécurité, des barricades et des points d'intérêt.
2. Le cycle temporel (`init.server.luau`) : Gestion du temps, de la luminosité et des phases de transition jour/nuit (5 minutes par cycle).
3. Les mécaniques de survie nocturne (`NightMechanics.server.luau`) : Gestion du brouillard dense, apparition progressive des entités hostiles et activation des pièges lorsque la nuit tombe.

Assure-toi que les scripts communiquent proprement via des `BindableEvents` ou des vérifications d'état globales si nécessaire. Fournis les directives ou le code d'orchestration requis.
