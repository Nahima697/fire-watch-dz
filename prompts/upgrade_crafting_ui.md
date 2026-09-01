Tâche : Moderniser complètement le design de CraftingClient.client.luau et ajouter les Pièges.
Problème : L'interface actuelle est trop basique (fond gris uni, texte blanc brut) et il manque un objet de type Piège dans le craft.
Action :
1. **Design UI Moderne :**
   - Améliore l'encadré des ressources (`ResourceFrame`) et le menu de craft (`CraftFrame`) avec un design sombre élégant, des coins arrondis (`UICorner`), et des bordures subtiles ou un effet semi-transparent propre.
   - Améliore la typographie : utilise des polices nettes (ex: `Enum.Font.Gotham` ou `GothamBold`), des tailles de texte hiérarchisées, et des couleurs de texte contrastées (gris clair pour les descriptions, blanc pour les titres).
   - Rends les boutons de craft plus attrayants avec un retour visuel clair (vert quand on a les ressources, gris sombre quand il manque des composants).
2. **Ajout des Pièges :**
   - Ajoute une nouvelle recette dans `CRAFT_RECIPES` : `Piege` (Coût : 2 Bois, 3 Pierre, Description : "Piège au sol ralentissant les monstres").
Rendu : Réécris l'interface dans `CraftingClient.client.luau` en conservant impérativement toutes les connexions réseaux (`CollectResourceEvent`, `CraftItemEvent`, touche C, et clic de souris).
