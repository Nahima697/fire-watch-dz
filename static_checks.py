#!/usr/bin/env python3
"""
static_checks.py — Vérifications rapides et déterministes sur les fichiers
.ts/.tsx du projet Fire Watch DZ, avant chaque commit.
"""

import re
import sys
import subprocess
from pathlib import Path

SRC_DIRS = [Path("app"), Path("components"), Path("lib")]
ERRORS = []


def check_file(path: Path):
    text = path.read_text(encoding="utf-8", errors="replace")

    if len(text.strip()) == 0:
        ERRORS.append(f"{path}: fichier VIDE")
        return

    if text.strip().startswith("```") or text.strip().startswith("# "):
        ERRORS.append(f"{path}: markdown collé en tête de fichier au lieu de code")
        return

    non_ascii = re.findall(r'[^\x00-\x7F]', text)
    if len(non_ascii) > 20:
        ERRORS.append(f"{path}: trop de caractères non-ASCII ({len(non_ascii)}), possible corruption")

    if text.count("{") != text.count("}"):
        ERRORS.append(f"{path}: accolades déséquilibrées ({text.count('{')} vs {text.count('}')})")


def main():
    files = []
    for d in SRC_DIRS:
        if d.exists():
            files.extend(d.rglob("*.ts"))
            files.extend(d.rglob("*.tsx"))

    for f in files:
        check_file(f)

    if ERRORS:
        print("❌ Problèmes détectés :")
        for e in ERRORS:
            print(f"  - {e}")
        sys.exit(1)

    tsconfig = Path("tsconfig.json")
    if tsconfig.exists():
        result = subprocess.run(
            ["npx", "tsc", "--noEmit"],
            capture_output=True, text=True
        )
        if result.returncode != 0:
            print("❌ Erreurs TypeScript :")
            print(result.stdout[-3000:])
            sys.exit(1)

    print(f"✅ {len(files)} fichier(s) TS/TSX vérifié(s), aucun problème détecté.")


if __name__ == "__main__":
    main()
