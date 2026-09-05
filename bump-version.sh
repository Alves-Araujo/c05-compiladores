#!/bin/sh
# Atualiza o ?v=... dos assets no index.html para forçar o navegador a
# baixar a versão nova depois de um deploy. Rode antes de commitar.
V=$(date +%Y%m%d%H%M)
perl -pi -e "s{((?:assets/(?:css|js)|data)/[a-z\-]+\.(?:css|js))\?v=\d+}{\$1?v=$V}g" index.html
echo "assets versionados como ?v=$V"
