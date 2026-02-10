// ============================================================
// SEND PUSH NOTIFICATION TO ALL CUSTOMERS
// ============================================================
//
// HOW TO USE:
// 1. First, get your Firebase Server Key:
//    - Go to https://console.firebase.google.com/
//    - Select your project → Project Settings → Cloud Messaging
//    - Copy the "Server key" 
//    - Paste it below as SERVER_KEY
//
// 2. Run this script:
//    node send-notification.cjs
//
// OR use Firebase Console directly (easier!):
//    - Go to Firebase Console → Messaging → "Create campaign"
//    - Choose "Firebase Notification messages"
//    - Fill in title & body → Send!
//
// ============================================================

const https = require('https');

// ⬇️ PASTE YOUR FIREBASE SERVER KEY HERE ⬇️
const SERVER_KEY = 'YOUR_FIREBASE_SERVER_KEY';

// ⬇️ CHANGE THE NOTIFICATION MESSAGE ⬇️
const notification = {
  title: '🆕 New Product at Guddu Traders!',
  body: 'New seeds and fertilizers arrived! Check out the latest products. नए बीज और खाद आ गए हैं!',
};

// Send to a topic (all subscribers)
// First, subscribe users to "all" topic via Firebase Console
const message = {
  to: '/topics/all',
  notification: {
    title: notification.title,
    body: notification.body,
    icon: '/icons/icon-192.png',
    click_action: 'https://guddu-traders.vercel.app',
  },
  data: {
    url: 'https://guddu-traders.vercel.app',
  },
};

const postData = JSON.stringify(message);

const options = {
  hostname: 'fcm.googleapis.com',
  path: '/fcm/send',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `key=${SERVER_KEY}`,
    'Content-Length': Buffer.byteLength(postData),
  },
};

console.log('📤 Sending notification to all customers...');
console.log(`   Title: ${notification.title}`);
console.log(`   Body: ${notification.body}`);
console.log('');

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Notification sent successfully!');
      console.log('   All customers will receive this notification.');
    } else {
      console.log('❌ Error:', data);
    }
  });
});

req.on('error', (err) => {
  console.error('❌ Error sending notification:', err.message);
});

req.write(postData);
req.end();
