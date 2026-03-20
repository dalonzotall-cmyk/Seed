// R1-v3 Service Worker — Updated for Network-First
self.addEventListener('fetch', e => {
  if (!e.request.url.startsWith(self.location.origin)) return;

  e.respondWith(
    fetch(e.request)
      .then(response => {
        // If we have network, update the cache with the fresh build
        const clone = response.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
        return response;
      })
      .catch(() => {
        // If the network fails (offline), serve the last cached version
        return caches.match(e.request);
      })
  );
});
