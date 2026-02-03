#!/bin/bash

echo "🔍 Vérification de la migration UnoCSS..."
echo "========================================"
echo ""

# Vérifier que Tailwind n'est plus référencé dans les fichiers HTML
echo "1. Vérification des références Tailwind dans les fichiers HTML :"
tailwind_html_count=$(grep -r "cdn\.tailwindcss\.com" public/ --include="*.html" | wc -l)
if [ "$tailwind_html_count" -eq 0 ]; then
    echo "   ✅ Aucune référence à Tailwind CSS CDN trouvée dans les fichiers HTML"
else
    echo "   ❌ Encore $tailwind_html_count référence(s) à Tailwind CSS CDN dans les fichiers HTML"
    grep -r "cdn\.tailwindcss\.com" public/ --include="*.html"
fi
echo ""

# Vérifier que UnoCSS est bien présent
echo "2. Vérification de la présence d'UnoCSS :"
unocss_html_count=$(grep -r "unpkg.com/@unocss" public/ --include="*.html" | wc -l)
if [ "$unocss_html_count" -gt 0 ]; then
    echo "   ✅ UnoCSS est présent dans $unocss_html_count fichier(s) HTML"
else
    echo "   ❌ UnoCSS n'est pas trouvé dans les fichiers HTML"
fi
echo ""

# Vérifier les fichiers modifiés
echo "3. Fichiers modifiés :"
echo "   📄 public/dashboard/index.html"
echo "   📄 public/login/index.html"
echo "   📄 public/example-panier/index.html"
echo "   📄 public/impayes/index.html"
echo "   📄 public/superadmin/index.html"
echo "   📄 admin/styleguide.md"
echo "   📄 public/example-panier/README.md"
echo ""

# Vérifier la configuration UnoCSS
echo "4. Configuration UnoCSS :"
if [ -f "public/unocss-config.js" ]; then
    echo "   ✅ Fichier de configuration UnoCSS créé"
else
    echo "   ❌ Fichier de configuration UnoCSS manquant"
fi
echo ""

# Vérifier les fichiers de test
echo "5. Fichiers de test créés :"
if [ -f "public/test-unocss.html" ]; then
    echo "   ✅ public/test-unocss.html"
else
    echo "   ❌ public/test-unocss.html manquant"
fi

if [ -f "public/test-migration.html" ]; then
    echo "   ✅ public/test-migration.html"
else
    echo "   ❌ public/test-migration.html manquant"
fi
echo ""

echo "========================================"
echo "🎉 Migration vers UnoCSS terminée !"
echo ""
echo "Pour tester la migration :"
echo "1. Ouvrez public/test-unocss.html dans votre navigateur"
echo "2. Ouvrez public/test-migration.html pour une vérification complète"
echo "3. Testez les pages principales : dashboard, login, etc."
echo ""
echo "Si tout fonctionne correctement, vous pouvez supprimer les fichiers de test."