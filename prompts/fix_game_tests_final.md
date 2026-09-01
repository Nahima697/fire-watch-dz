# Objectif : Corriger les assertions de GameTests pour le Monde 3D et le Cycle Jour/Nuit
Le script `GameTests.server.luau` échoue sur deux tests précis :
1. **Monde généré (3D) :** L'assertion cherche un dossier/objet avec un nom ou une structure obsolète. Assure-toi qu'il vérifie correctement la présence de `Workspace.Village` ou des dossiers créés par le nouveau `WorldBuilder`.
2. **Cycle jour/nuit :** Le test échoue avec une "Erreur inconnue" car il interroge un événement ou une variable de phase mal ciblé. Fais en sorte qu'il valide l'état du cycle via le `GameManager` ou la variable globale partagée sans planter.
3. **Règle absolue :** Aucun script serveur ne doit se terminer par un `return`.
