// ============================================================
// FIREBASE CONFIGURATION
// ============================================================
// 
// HOW TO GET THESE VALUES (one-time setup, 5 minutes):
//
// 1. Go to https://console.firebase.google.com/
// 2. Click "Create a project" → Name it "guddu-traders" → Continue
// 3. Disable Google Analytics (not needed) → Create Project
// 4. Click the Web icon (</>) to add a web app
// 5. Name it "guddu-traders-web" → Register app
// 6. You'll see a config object — copy those values below
// 7. Go to Project Settings → Cloud Messaging tab
// 8. Under "Web Push certificates", click "Generate key pair"
// 9. Copy that key as VAPID_KEY below
//
// ============================================================

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyA5lNou7OwxyXrpv_6ZDztuVgpLKkkh2Ok",
  authDomain: "guddu-traders-pwa-app.firebaseapp.com",
  projectId: "guddu-traders-pwa-app",
  storageBucket: "guddu-traders-pwa-app.firebasestorage.app",
  messagingSenderId: "26690461324",
  appId: "1:26690461324:web:296206964f30f97d03e5a9"
};

// ⬇️ PASTE YOUR VAPID KEY HERE ⬇️
const VAPID_KEY = "BAWwtcgEni-HoiEtFdG2fVS6c3iVCDkborpIh8OszrkSST7Ec6-7jzduv2Qt0_5yJCi3fu7Mn-khm8IzsVH190c";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get messaging instance (only in browser, not during SSR)
let messaging = null;
if (typeof window !== 'undefined' && 'Notification' in window) {
  try {
    messaging = getMessaging(app);
  } catch (err) {
    console.log('Firebase messaging not supported:', err);
  }
}

/**
 * Request notification permission and get FCM token
 * @returns {Promise<string|null>} FCM token or null
 */
export async function requestNotificationPermission() {
  if (!messaging) return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }

    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (token) {
      console.log('FCM Token:', token);
      // Save token to localStorage for reference
      localStorage.setItem('fcm_token', token);
      // In production, you'd save this token to your database
      return token;
    }
    return null;
  } catch (err) {
    console.error('Error getting notification permission:', err);
    return null;
  }
}

/**
 * Listen for foreground messages
 * @param {Function} callback - Called with notification payload
 */
export function onForegroundMessage(callback) {
  if (!messaging) return;

  onMessage(messaging, (payload) => {
    console.log('Foreground message:', payload);
    callback(payload);
  });
}

export { messaging };
