/* Jaque — service worker: guarda la app en el dispositivo para que funcione sin conexión. */
const VERSION = 'jaque-v6';
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './stockfish.js',
  './stockfish.wasm',
  './stockfish.asm.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// La página: primero internet (así siempre ves la última versión) y, si no hay conexión
// o tarda más de 4 segundos, la copia guardada. El resto de archivos: primero la copia guardada.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(caches.open(VERSION).then(async cache => {
      const net = fetch(req, { cache: 'no-store' }).then(res => {
        if (res && res.ok) cache.put('./index.html', res.clone());
        return res;
      }).catch(() => null);
      const timeout = new Promise(r => setTimeout(() => r(null), 4000));
      const res = await Promise.race([net, timeout]);
      return res || (await cache.match('./index.html')) || (await net) || new Response('Sin conexión', { status: 503 });
    }));
    return;
  }
  e.respondWith(
    caches.open(VERSION).then(async cache => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const net = fetch(req).then(res => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => null);
      if (cached) { e.waitUntil(net); return cached; }
      return (await net) || new Response('Sin conexión', { status: 503 });
    })
  );
});
