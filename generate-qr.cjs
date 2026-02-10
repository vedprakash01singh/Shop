// Generate QR code for Guddu Traders app
const QRCode = require('qrcode');
const fs = require('fs');

const url = 'https://guddu-traders.vercel.app';
const output = 'public/guddu-traders-qr.png';

QRCode.toFile(output, url, {
  color: {
    dark: '#1e40af', // Guddu Traders blue
    light: '#FFF'
  },
  width: 400,
  margin: 2,
}, function (err) {
  if (err) throw err;
  console.log('QR code saved to', output);
});
