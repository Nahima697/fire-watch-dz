# RÔLE ET CONSIGNES STRICTES
- Lis et respecte IMPÉRATIVEMENT `prompts/AI_CONTRACT.md`.
- NE GÉNÈRE AUCUN MARKDOWN dans les fichiers de code. Les fichiers `.luau` doivent contenir UNIQUEMENT du code Luau valide (les commentaires s'écrivent avec `--`, pas avec `#`).

# BUGS À CORRIGER ABSOLUMENT

## 1. Erreur de syntaxe critique dans CraftingClient.client.luau
**Erreur :** `CraftingClient:1: Expected identifier when parsing expression, got '#'`
**Cause :** Tu as inséré du texte Markdown ou un caractère `#` à la ligne 1 du fichier.
**Action :** Nettoie immédiatement `src/client/CraftingClient.client.luau`. Assure-toi que c'est du code Luau pur et fonctionnel. Supprime toutes les balises Markdown.

## 2. Conflit logique dans GameManager.server.luau
**Logs :**
`00:34:49.038 [GameManager] Nombre de joueurs suffisant ( 1 / 1 ). Démarrage dans 5 secondes...`
`00:34:54.041 [GameManager] Démarrage de la partie...`
`00:34:55.024 [GameManager] Pas assez de joueurs après le délai d'attente.`
**Cause :** Le compte à rebours se lance correctement car le joueur est présent, mais la boucle d'attente ou la vérification post-démarrage s'exécute à tort juste après et annule le démarrage.
**Action :** Corrige la logique d'état et de vérification des joueurs dans `src/server/GameManager.server.luau`. Assure-toi qu'une fois le statut passé à "Démarrage", il ne re-déclenche pas une erreur de manque de joueurs.
