Crée le ModuleScript src/server/WorldGen/HouseGenerator.luau pour Village Maudit.

Objectif : remplacer les blocs briques actuels par de vraies petites maisons médiévales
stylisées low-poly (murs + toit en pente + porte + fenêtres, simples mais reconnaissables
comme des maisons, pas des rectangles).

Retourne une table avec une fonction HouseGenerator.Create(variantIndex, position, size,
rotation) qui construit et retourne un Model complet, PrimaryPart défini, à la Position/
Rotation données, dimensionné approximativement selon Size (X = largeur, Z = profondeur,
Y = hauteur des murs avant toit).

Crée 5 variantes distinctes (variantIndex de 1 à 5), chacune une fonction locale interne
(createVariant1House, etc.) :
1. Maison en pierre, toit à deux pentes (deux WedgePart symétriques), une porte marron,
   deux fenêtres, une cheminée (petit Part vertical sur le toit).
2. Maison en bois (colombages : Parts fines croisées sur murs clairs), toit à deux pentes,
   porte, une fenêtre.
3. Maison plus petite et basse, toit plat légèrement incliné (un seul WedgePart), porte,
   pas de cheminée, une petite clôture basse à l'avant (quelques Parts fines).
4. Maison en pierre avec un étage légèrement en surplomb (le haut du mur plus large que le
   bas, décalage simple), toit à deux pentes, cheminée, deux fenêtres.
5. Maison en bois avec petite terrasse couverte à l'avant (auvent = un WedgePart en
   extension), porte, une fenêtre.

Matériaux : Enum.Material.Wood pour les murs bois, Enum.Material.Brick ou Concrete pour la
pierre, Enum.Material.Slate pour les toits (couleurs sombres, pas de vert ni de couleurs
vives). Fenêtres = petits Parts semi-transparents (Transparency 0.5, couleur bleu-gris
pâle) ou simplement des inserts de couleur sombre sur le mur.

Toutes les parts de chaque maison doivent être Anchored = true, et regroupées dans le
Model retourné (utilise WeldConstraint ou laisse Anchored suffire, pas besoin de souder
puisque tout est ancré). Reste simple et performant : pas plus de 12-15 Parts par maison.

Le module ne crée rien tout seul au chargement (pas de code au niveau racine autre que la
définition de la table retournée), tout passe par HouseGenerator.Create(...).
