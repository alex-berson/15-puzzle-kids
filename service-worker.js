const cacheName = 'cache-v4';
const files = [
  '/',
  'index.html',
  'css/style.css',
  'js/fifteen.js',
  'fonts/RobotoSlab-Regular.woff',
  'fonts/RobotoSlab-Bold.woff'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(files))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
 });