#!/usr/bin/env python3
"""Gera dist/jotc.html: o site inteiro num arquivo só, com CSS e JS embutidos.
Serve para publicar em qualquer lugar que aceite um HTML avulso.
O site normal (index.html + assets/) continua sendo a versão principal."""
import io, os, re

base = os.path.dirname(os.path.abspath(__file__))
html = io.open(os.path.join(base, 'index.html'), encoding='utf-8').read()

def ler(rel):
    return io.open(os.path.join(base, rel.split('?')[0]), encoding='utf-8').read()

# CSS local -> <style>
def sub_css(m):
    href = m.group(1)
    if href.startswith('http'):
        return m.group(0)
    return '<style>\n' + ler(href) + '\n</style>'
html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', sub_css, html)

# JS local -> <script>
def sub_js(m):
    src = m.group(1)
    if src.startswith('http'):
        return m.group(0)
    return '<script>\n' + ler(src) + '\n</script>'
html = re.sub(r'<script src="([^"]+)"></script>', sub_js, html)

os.makedirs(os.path.join(base, 'dist'), exist_ok=True)
saida = os.path.join(base, 'dist', 'jotc.html')
io.open(saida, 'w', encoding='utf-8').write(html)
print('gerado:', saida, '(%.0f KB)' % (len(html.encode('utf-8')) / 1024))
