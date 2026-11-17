// Docentia Service Worker - v6 Push Notifications Complete
const CACHE_NAME = 'docentia-v6-push-notifications';

const PRECACHE_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/images/docentia-logo.png',
  '/images/docentia-logo-white.png',
  '/images/docentia-isotype.png',
  '/images/docentia-avatar.png',
  '/images/docentia-avatar-bust.png',
  '/images/docentia-avatar-vacantes.png',
  '/images/docentia-avatar-vacantes-bust.png',
  '/images/docentia-avatar-sos.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Precache notice:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Network-first for navigation; Stale-While-Revalidate for images and icons
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Navigation (HTML): Always network first so latest code is served immediately
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request) || caches.match('/'))
    );
    return;
  }

  // Static images, icons, and logo: Stale-While-Revalidate with immediate cache fallback
  if (
    url.pathname.startsWith('/images/') || 
    url.pathname.startsWith('/icons/') || 
    url.pathname.endsWith('.png') || 
    url.pathname.endsWith('.ico') || 
    url.pathname.endsWith('.jpg')
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Other assets: Network first
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});

// ==========================================
// PUSH & SYSTEM NOTIFICATIONS HANDLING
// ==========================================

// Push Event: triggered by server Web Push
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { title: 'DOCENTIA: Nueva Vacante', body: event.data.text() };
    }
  }

  const title = data.title || '📢 Nueva Vacante Docente en DOCENTIA';
  const options = {
    body: data.body || 'Una escuela acaba de publicar una convocatoria. Toca para ver los detalles.',
    icon: data.icon || '/icons/icon-192.png',
    badge: data.badge || '/images/docentia-isotype.png',
    image: data.image || undefined,
    vibrate: data.vibrate || [250, 100, 250, 100, 250],
    data: data.data || { url: '/' },
    tag: data.tag || 'docentia-vacantes',
    renotify: true,
    requireInteraction: true
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Local & In-App Notification Trigger (Works instantly on mobile devices with app installed)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_VACANCY_NOTIFICATION') {
    const payload = event.data.payload || {};
    const title = payload.title || '📢 Nueva Vacante Docente';
    const options = {
      body: payload.body || 'Nueva convocatoria disponible en DOCENTIA.',
      icon: payload.icon || '/icons/icon-192.png',
      badge: payload.badge || '/images/docentia-isotype.png',
      image: payload.image || undefined,
      vibrate: payload.vibrate || [250, 100, 250, 100, 250],
      data: payload.data || { url: '/' },
      tag: payload.tag || ('vacancy-' + Date.now()),
      renotify: true,
      requireInteraction: true
    };

    event.waitUntil(self.registration.showNotification(title, options));
  }
});

// Notification Click: Focus existing tab or open DOCENTIA and navigate to the vacancy
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) 
    ? event.notification.data.url 
    : '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a window is already open, focus it and navigate
      for (const client of clientList) {
        if ('focus' in client) {
          if ('navigate' in client) {
            client.navigate(targetUrl);
          }
          return client.focus();
        }
      }
      // Otherwise open a new window
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
