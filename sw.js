const CACHE_NAME = 'icac-chronicles-v1';
const STATIC_ASSETS = [
  '/icac-chronicles/',
  '/icac-chronicles/index.html',
  '/icac-chronicles/manifest.json',
  '/icac-chronicles/src/main.js',
  '/icac-chronicles/src/config/game-config.js',
  '/icac-chronicles/src/config/constants.js',
  '/icac-chronicles/src/scenes/BootScene.js',
  '/icac-chronicles/src/scenes/PreloadScene.js',
  '/icac-chronicles/src/scenes/MenuScene.js',
  '/icac-chronicles/src/scenes/GameScene.js',
  '/icac-chronicles/src/scenes/MissionScene.js',
  '/icac-chronicles/src/scenes/DebriefScene.js',
  '/icac-chronicles/src/scenes/RankScene.js',
  '/icac-chronicles/src/scenes/SettingsScene.js',
  '/icac-chronicles/src/systems/SaveSystem.js',
  '/icac-chronicles/src/systems/AuthSystem.js',
  '/icac-chronicles/src/systems/ChoiceEngine.js',
  '/icac-chronicles/src/systems/ConsequenceTracker.js',
  '/icac-chronicles/src/systems/CoverSystem.js',
  '/icac-chronicles/src/systems/NetworkSystem.js',
  '/icac-chronicles/src/systems/ReputationSystem.js',
  '/icac-chronicles/src/systems/MissionGenerator.js',
  '/icac-chronicles/src/systems/DebriefEngine.js',
  '/icac-chronicles/src/systems/AudioSystem.js',
  '/icac-chronicles/src/entities/Player.js',
  '/icac-chronicles/src/entities/NPC.js',
  '/icac-chronicles/src/entities/District.js',
  '/icac-chronicles/src/entities/Mission.js',
  '/icac-chronicles/src/entities/NetworkNode.js',
  '/icac-chronicles/src/entities/RankBadge.js',
  '/icac-chronicles/src/ui/HUD.js',
  '/icac-chronicles/src/ui/DialogueBox.js',
  '/icac-chronicles/src/ui/ChoiceMenu.js',
  '/icac-chronicles/src/ui/NotificationToast.js',
  '/icac-chronicles/src/ui/StatPanel.js',
  '/icac-chronicles/src/ui/MapOverlay.js',
  '/icac-chronicles/src/ui/DebriefPanel.js',
  '/icac-chronicles/src/data/missions.json',
  '/icac-chronicles/src/data/characters.json',
  '/icac-chronicles/src/data/districts.json',
  '/icac-chronicles/src/data/sunzi.json',
  '/icac-chronicles/src/data/leaders.json',
  '/icac-chronicles/src/data/ranks.json',
  '/icac-chronicles/src/data/choices.json',
  '/icac-chronicles/src/utils/CanvasDrawing.js',
  '/icac-chronicles/src/utils/ProceduralAudio.js',
  '/icac-chronicles/src/utils/Encryption.js',
  '/icac-chronicles/src/utils/Localization.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  
  // Network first for Firebase APIs, cache first for game assets
  if (req.url.includes('googleapis.com') || req.url.includes('gstatic.com')) {
    e.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }
  
  e.respondWith(
    caches.match(req).then(cached => {
      return cached || fetch(req).then(response => {
        if (response.ok && req.url.startsWith(self.location.origin)) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        }
        return response;
      }).catch(() => {
        if (req.headers.get('accept')?.includes('text/html')) {
          return caches.match('/icac-chronicles/index.html');
        }
      });
    })
  );
});

self.addEventListener('sync', (e) => {
  if (e.tag === 'sync-saves') {
    e.waitUntil(syncSaves());
  }
});

async function syncSaves() {
  const clients = await self.clients.matchAll();
  clients.forEach(client => client.postMessage({ type: 'sync-saves' }));
}
