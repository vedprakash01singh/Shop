// Firebase Messaging Service Worker
// This handles push notifications when the app is in background / closed

// ⬇️ PASTE YOUR FIREBASE CONFIG HERE (same values as src/firebase.js) ⬇️
const firebaseConfig = {
  apiKey: "AIzaSyA5lNou7OwxyXrpv_6ZDztuVgpLKkkh2Ok",
  authDomain: "guddu-traders-pwa-app.firebaseapp.com",
  projectId: "guddu-traders-pwa-app",
  storageBucket: "guddu-traders-pwa-app.firebasestorage.app",
  messagingSenderId: "26690461324",
  appId: "1:26690461324:web:296206964f30f97d03e5a9"
};

// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Background message:', payload);

  const notificationTitle = payload.notification?.title || '🏪 Guddu Traders';
  const notificationOptions = {
    body: payload.notification?.body || 'New update from Guddu Traders!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [200, 100, 200],
    data: {
      url: payload.data?.url || '/',
    },
    actions: [
      { action: 'open', title: '🛒 Open App' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If the app is already open, focus it
      for (const client of clientList) {
        if (client.url.includes(self.location.origin)) {
          client.focus();
          return client.navigate(urlToOpen);
        }
      }
      // Otherwise open a new window
      return clients.openWindow(urlToOpen);
    })
  );
});
