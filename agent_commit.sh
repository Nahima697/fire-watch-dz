#!/bin/bash
# Usage: ./agent_commit.sh "message" [fichier1 fichier2 ...]
# Si aucun fichier n'est précisé, committe tout (comportement historique).

COMMIT_MSG="${1:-[Auto-Agent] Mise à jour}"
shift
FILES_TO_ADD="$@"

if [[ -z $(git status -s) ]]; then
  echo "⚠️  Aucune modification à committer."
  exit 0
fi

echo "🛡️  Exécution des garde-fous..."
python3 static_checks.py
if [ $? -ne 0 ]; then
  echo "❌ Vérifications échouées. Commit annulé."
  exit 1
fi

if [ -n "$FILES_TO_ADD" ]; then
  git add $FILES_TO_ADD
else
  git add .
fi

git commit -m "$COMMIT_MSG"
git push origin master
if [ $? -ne 0 ]; then
  echo "⚠️  Commit local OK, mais le push a échoué."
  exit 1
fi

echo "🚀 Modifications commitées et poussées avec succès !"
