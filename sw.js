const CACHE_NAME = "app-cache-v1";
const urlsToCache = [
  "/index.html",
  "/animais.html",
  "/cadastro.html",
  "/calendario.html",
  "/historico.html",
  "/nascimento.html",
  "/propriedades.html",
  "/signup.html",
  "/style.css",       // seu arquivo CSS principal
  "/script.js",       // seu arquivo JS principal
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Instalando o service worker e cacheando arquivos
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Caching all files");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Ativando o service worker
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptando requisições
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        // Retorna arquivo do cache
        return response;
      }
      // Se não tiver no cache, busca da rede
      return fetch(event.request)
        .then((res) => {
          return caches.open(CACHE_NAME).then((cache) => {
            // Clona a resposta e salva no cache
            cache.put(event.request, res.clone());
            return res;
          });
        })
        .catch(() => {
          // Opcional: retornar uma página offline padrão se a rede falhar
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
    })
  );
});