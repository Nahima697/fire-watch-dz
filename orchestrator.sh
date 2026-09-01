#!/bin/bash
FEATURE="$1"
if [ -z "$FEATURE" ]; then
    echo "Usage: ./orchestrator.sh \"description de la fonctionnalité\""
    exit 1
fi

HERMES_PYTHON="$HOME/hermes/venv/bin/python3"
PLAN_FILE="/tmp/orchestrator_plan.txt"

echo "🎨 [GAME DESIGNER] Conception..."
GD_ROLE=$(cat agents/game_designer/agent.md)
echo "$GD_ROLE

Fonctionnalité demandée : $FEATURE" > /tmp/gd_prompt.md
"$HERMES_PYTHON" ~/hermes/agent.py /tmp/gd_prompt.md "$PLAN_FILE"
echo "📋 Plan de design :"
cat "$PLAN_FILE"
echo ""

MODIFIED_FILES=""

while IFS= read -r line || [ -n "$line" ]; do
    FILE=$(echo "$line" | sed -n 's/.*FILE: *\([^|]*\).*/\1/p' | xargs)
    TASK=$(echo "$line" | sed -n 's/.*TASK: *\(.*\)/\1/p')
    [ -z "$FILE" ] || [ -z "$TASK" ] && continue

    echo "👨‍💻 [DEVELOPER] $FILE..."
    DEV_ROLE=$(cat agents/developer/agent.md)
    CONTRACT=$(cat prompts/AI_CONTRACT.md 2>/dev/null)
    STRUCTURE=$(find src/ -type f | sed 's/^/ - /')
    CURRENT=$(cat "$FILE" 2>/dev/null || echo "Nouveau fichier.")
    echo "$DEV_ROLE

[CONTRAT] $CONTRACT

[ARBORESCENCE] $STRUCTURE

[FICHIER ACTUEL] $CURRENT

[TÂCHE] $TASK" > /tmp/dev_prompt.md

    "$HERMES_PYTHON" ~/hermes/agent.py /tmp/dev_prompt.md "$FILE"
    if [ $? -ne 0 ]; then
        echo "❌ Échec sur $FILE, arrêt."
        exit 1
    fi
    MODIFIED_FILES="$MODIFIED_FILES $FILE"
done < "$PLAN_FILE"

if [ -z "$MODIFIED_FILES" ]; then
    echo "⚠️ Aucune tâche exploitable. Vérifie $PLAN_FILE"
    exit 1
fi

echo ""
echo "🏛️ [TECH LEAD] Vérification architecture..."
TL_ROLE=$(cat agents/tech_lead/agent.md)
TL_FAILED=0
STRUCTURE=$(find src/ -type f | sed 's/^/ - /')
for f in $MODIFIED_FILES; do
    CONTENT=$(cat "$f")
    echo "$TL_ROLE

[ARBORESCENCE RÉELLE ET COMPLÈTE DU PROJET — ne suppose JAMAIS qu'un fichier existe s'il n'est pas dans cette liste]
$STRUCTURE

[FICHIER À VÉRIFIER] $f
[CONTENU]
$CONTENT" > /tmp/tl_prompt_$$.md
    "$HERMES_PYTHON" ~/hermes/agent.py /tmp/tl_prompt_$$.md /tmp/tl_result_$$.txt
    cat /tmp/tl_result_$$.txt
    grep -q "VERDICT: PASS" /tmp/tl_result_$$.txt || TL_FAILED=1
done

if [ $TL_FAILED -eq 1 ]; then
    echo "❌ Tech Lead a rejeté au moins un fichier."
    echo "🧹 Nettoyage des fichiers générés non approuvés..."
    for f in $MODIFIED_FILES; do
        git checkout -- "$f" 2>/dev/null || rm -f "$f"
    done
    echo "   Fichiers restaurés à leur état précédent (ou supprimés s'ils étaient nouveaux)."
    exit 1
fi

echo ""
echo "🔎 [REVIEWER] Revue qualité..."
REVIEW_FAILED=0
for f in $MODIFIED_FILES; do
    "$HERMES_PYTHON" ~/hermes/reviewer.py <(echo "$FEATURE") "$f"
    [ $? -ne 0 ] && REVIEW_FAILED=1
done

if [ $REVIEW_FAILED -eq 1 ]; then
    echo "❌ Reviewer a rejeté au moins un fichier."
    echo "🧹 Nettoyage des fichiers générés non approuvés..."
    for f in $MODIFIED_FILES; do
        git checkout -- "$f" 2>/dev/null || rm -f "$f"
    done
    exit 1
fi

echo ""
echo "🧪 [QA] Checklist de test..."
QA_ROLE=$(cat agents/qa/agent.md)
echo "$QA_ROLE

Fonctionnalité : $FEATURE
Fichiers :$MODIFIED_FILES" > /tmp/qa_prompt.md
"$HERMES_PYTHON" ~/hermes/agent.py /tmp/qa_prompt.md /tmp/qa_checklist.md
cat /tmp/qa_checklist.md

echo ""
python3 static_checks.py
[ $? -ne 0 ] && { echo "❌ Vérifications statiques échouées."; exit 1; }

./agent_commit.sh "[Team] $FEATURE"
