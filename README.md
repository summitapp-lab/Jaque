# Jaque ♞ — Juega y aprende ajedrez

App de ajedrez en español que funciona en el navegador y **sin conexión** una vez instalada.

## Qué incluye
- **Jugar contra bots** de 7 niveles (de 250 a 2800), con motor Stockfish.
- **Revisión del entrenador** al final de cada partida: precisión, clasificación de cada jugada (brillante, mejor, error grave…), explicación de por qué y lecciones de la partida.
- **Partida con pistas** en tres pasos (pieza → jugada → razonamiento) y valoración al momento.
- **Abogado del diablo**: te muestra la mejor jugada y las amenazas de tu rival.
- **Aperturas**: 10 aperturas con lección guiada, práctica sin ayuda y análisis de fortalezas y debilidades.
- **Voz del entrenador** (voces del propio dispositivo) y sonidos de madera.

## Instalarla en el iPhone o iPad
1. Abre la web de la app en **Safari**.
2. Pulsa **Compartir** → **Añadir a pantalla de inicio**.
3. Ábrela una vez con internet: a partir de ahí funciona sin conexión.

## Estructura
- Raíz: la app publicada (`index.html`, `sw.js`, `manifest.webmanifest`, motor Stockfish e iconos).
- `source/`: código fuente (`src.html`) y `build.py` para regenerar `index.html`.

Para actualizar: edita `source/src.html`, ejecuta `cd source && npm install && python3 build.py`, sube el número de `VERSION` en `sw.js` y publica.

## Licencias
- Motor: [Stockfish](https://stockfishchess.org) 10 (stockfish.js de nmrugg), GPLv3. Por eso el proyecto se distribuye bajo **GPLv3** (ver `LICENSE`).
- Reglas: [chess.js](https://github.com/jhlywa/chess.js), BSD-2-Clause.
- Piezas: set «cburnett» de Colin M. L. Burnett, GPLv2+ / CC BY-SA, vía [chessground](https://github.com/lichess-org/chessground).
- Sonidos e interfaz: originales de este proyecto. Jaque no está afiliada a Chess.com.
