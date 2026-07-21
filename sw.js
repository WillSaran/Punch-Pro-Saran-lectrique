// PunchPro — service worker minimal.
// Sert uniquement à permettre l'affichage de notifications locales
// (alerte "punch out oublié") et à rendre l'app installable comme PWA.
// Pas de cache/offline pour l'instant — on ne veut jamais servir une
// version périmée de l'app.
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});

self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({type:'window'}).then(clientList=>{
      for(const c of clientList){if('focus' in c)return c.focus();}
      if(self.clients.openWindow)return self.clients.openWindow('/');
    })
  );
});
