#!/usr/bin/env bash
set -e

# —————— Configuración ——————
REPO_NAME="zen-pilates-app"
GITHUB_USER="TU_USUARIO"   # ← Cambia esto por tu usuario de GitHub
VISIBILITY="public"        # o "private"
# ——————————————————————————

# 1. Crear carpeta y entrar
mkdir -p $REPO_NAME
cd $REPO_NAME

# 2. Copiar archivos del template
cp ../index.html .
cp ../styles.css .
cp ../app.js .
cp ../README.md .
cp ../vercel.json .

# 3. Git: init, commit
git init
git add .
git commit -m "Primer commit: estructura básica de Zen Pilates App"

# 4. GitHub CLI: crear repo y push
gh repo create $GITHUB_USER/$REPO_NAME \
  --$VISIBILITY \
  --source=. \
  --remote=origin \
  --push

# 5. Vercel CLI: deploy
vercel --prod --confirm

echo
echo "✅ ¡Listo! Tu app está en:"
echo "   • GitHub: https://github.com/$GITHUB_USER/$REPO_NAME"
echo "   • Vercel: https://$REPO_NAME.vercel.app"
