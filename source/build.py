"""Genera index.html y copia el motor a la raíz del repositorio.
Uso:  cd source && npm install && python3 build.py
"""
import re, shutil, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
NM = os.path.join(HERE, 'node_modules')
src = open(os.path.join(HERE, 'src.html'), encoding='utf-8').read()
css = open(os.path.join(NM, 'chessground/assets/chessground.cburnett.css'), encoding='utf-8').read()
T = {'pawn': 'p', 'knight': 'n', 'bishop': 'b', 'rook': 'r', 'queen': 'q', 'king': 'k'}
out = ['/* Piezas: set "cburnett" de Colin M.L. Burnett (GPLv2+/CC BY-SA), vía chessground */']
for t, col, url in re.findall(r"piece\.(\w+)\.(\w+)\s*\{\s*background-image:\s*url\('([^']+)'\)", css):
    out.append(".pc.%s%s{background-image:url('%s')}" % (col[0], T[t], url))
assert len(out) == 13
js = open(os.path.join(NM, 'chess.js/dist/cjs/chess.js'), encoding='utf-8').read()
html = src.replace('/*__PIECES__*/', '\n'.join(out)).replace('/*__CHESSJS__*/', js)
open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(html)
for f in ['stockfish.js', 'stockfish.wasm', 'stockfish.asm.js']:
    shutil.copy(os.path.join(NM, 'stockfish/src', f), os.path.join(ROOT, f))
print('index.html generado. Recuerda subir VERSION en sw.js para que los dispositivos se actualicen.')
