// Generate simple PNG icons for PWA
// Creates solid blue icons with "GT" text using raw PNG creation

const fs = require('fs');
const { createCanvas } = require('canvas');

function generateIcon(size, outputPath) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background - blue gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#1e40af');
  gradient.addColorStop(1, '#1d4ed8');
  ctx.fillStyle = gradient;

  // Rounded rectangle
  const r = size * 0.15;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(size - r, 0);
  ctx.quadraticCurveTo(size, 0, size, r);
  ctx.lineTo(size, size - r);
  ctx.quadraticCurveTo(size, size, size - r, size);
  ctx.lineTo(r, size);
  ctx.quadraticCurveTo(0, size, 0, size - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fill();

  // "GT" text
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.35}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GT', size / 2, size * 0.4);

  // "GUDDU" smaller text
  ctx.font = `bold ${size * 0.1}px Arial`;
  ctx.fillText('GUDDU', size / 2, size * 0.62);

  // "TRADERS" even smaller
  ctx.font = `${size * 0.08}px Arial`;
  ctx.fillStyle = '#93c5fd';
  ctx.fillText('TRADERS', size / 2, size * 0.75);

  // Star badge
  ctx.fillStyle = '#fbbf24';
  ctx.font = `${size * 0.06}px Arial`;
  ctx.fillText('⭐ 30+ Years', size / 2, size * 0.88);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Created ${outputPath} (${size}x${size})`);
}

generateIcon(192, 'public/icons/icon-192.png');
generateIcon(512, 'public/icons/icon-512.png');
console.log('Done! Icons generated.');
