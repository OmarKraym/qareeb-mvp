// Service Worker بسيط لقريب: يعرض إشعارات عروض القرب على الهاتف
// ويفتح صفحة البطاقة عند الضغط على الإشعار.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || self.registration.scope;
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const open = all.find(c => c.url.startsWith(url.split('#')[0]));
    if (open) return open.focus();
    return self.clients.openWindow(url);
  })());
});
