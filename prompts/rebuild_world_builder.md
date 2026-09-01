
1. Refonte complète du World Builder
Tu dois réécrire intégralement le module de génération d'environnement depuis le début. L'objectif est de générer procéduralement un environnement riche qui respecte strictement les contraintes techniques établies.

2. Éléments de l'environnement à générer obligatoirement
Zone de démarrage (Serveur) : Le script doit créer le centre du village (feu central) et définir correctement les points de spawn initiaux pour les joueurs au démarrage.

Barricades et Défenses : Génère un quadrillage ou un système de murs/portes fortifiées pour délimiter le village.

Forêt Dense : Tout autour du village, génère une forêt dense et oppressante.

Système d'Inventaire : Intègre les bases, tags ou attributs nécessaires sur la map pour que le système d'inventaire et de craft puisse interagir avec l'environnement.

3. Contraintes Techniques
Reste dans le pur scripting Luau avec Instance.new() pour la génération procédurale du terrain, sans dépendre d'assets externes pour la topographie de base.

Le module doit retourner une table avec une fonction Generate() claire et propre.
