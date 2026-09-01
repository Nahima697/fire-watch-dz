RÔLE: Expert Roblox Luau.
RÈGLES: Respecte AI_CONTRACT.md. AUCUN FORMATAGE MARKDOWN (# ou ```) DANS TON CODE.

Tâche : Corriger GameManager.server.luau.
Problème : Le GameManager voit qu'il y a assez de joueurs, lance le décompte (5 secondes), et affiche "Démarrage de la partie...". Mais juste après, il affiche "Pas assez de joueurs après le délai d'attente." et annule le lancement.
Action : Corrige la fonction de boucle principale pour qu'une fois la phase passée à "DAY_PHASE" ou que le jeu est officiellement démarré, la condition qui vérifie le manque de joueurs ne s'active plus par erreur et laisse la partie se dérouler.
