# 🏪 Shop Catalog PWA

A mobile-first Progressive Web App for your **Building Materials, Hardware, Seeds & Fertilizers** shop. Customers can browse products, see prices, and order directly via WhatsApp — all from their phone.

## ✨ Features

- 📱 **Installable PWA** — works like a mobile app, no Play Store needed
- 🔍 **Search & Filter** — find products quickly by name or category
- 🆕 **New Arrivals** — highlighted new products carousel
- 💬 **WhatsApp Ordering** — one-tap order via WhatsApp
- 📞 **Call Button** — quick call to shop
- 🌐 **Bilingual** — English + Hindi (हिंदी) labels
- ⚡ **Works Offline** — cached for offline use
- 📊 **4 Categories**: Building Materials, Hardware, Seeds, Fertilizers

## 🚀 Quick Start

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) on your phone or browser.

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## ⚙️ Configuration — IMPORTANT!

### 1. Set your WhatsApp number
Open `src/App.jsx` and update these lines:
```js
const WHATSAPP_NUMBER = '919999999999'; // ← Your number with country code
const SHOP_NAME = 'Your Shop Name';     // ← Your shop name
```

### 2. Update products
Edit `src/data/products.js` to add, remove, or update products. Each product has:
```js
{
  id: 1,
  name: "Product Name",           // English name
  nameHi: "उत्पाद का नाम",        // Hindi name
  category: "building",           // building | hardware | seeds | fertilizers
  price: 500,                     // Price in ₹
  unit: "bag / बोरी",             // Unit of sale
  description: "Product details", // Description
  isNew: true,                    // Mark as new arrival
  inStock: true,                  // Stock status
}
```

### 3. Add your shop logo
Replace the placeholder icons in:
- `public/icons/icon-192.png` (192×192 PNG)
- `public/icons/icon-512.png` (512×512 PNG)

## 📱 How to Install on Phone

1. Open the app URL in Chrome on your phone
2. Tap **"Add to Home Screen"** when prompted
3. The app icon appears on your home screen — just like a regular app!

## 🌐 Deployment (Free)

You can host this for free on:
- **Vercel**: `npx vercel` (easiest)
- **Netlify**: Drag & drop the `dist/` folder
- **GitHub Pages**: Push to repo and enable Pages

## 📁 Project Structure
```
├── public/
│   ├── favicon.svg
│   └── icons/          ← Shop logo icons
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CategoryBar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductModal.jsx
│   │   ├── NewArrivals.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── products.js ← All products data
│   ├── App.jsx         ← Main app
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- vite-plugin-pwa (Service Worker + Manifest)
