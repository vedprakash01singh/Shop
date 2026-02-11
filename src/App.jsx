import { useContext } from 'react';
// Simple Toast component
function SimpleToast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
      {message}
      <button className="ml-3 text-white font-bold" onClick={onClose} aria-label="Close">×</button>
    </div>
  );
}
import { useState, useMemo, useEffect, useCallback } from 'react';
import Header from './components/Header';
import HomeSplash from './components/HomeSplash';
import CategoryBar from './components/CategoryBar';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import NewArrivals from './components/NewArrivals';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import NotificationBanner from './components/NotificationBanner';
import NotificationToast from './components/NotificationToast';
import InstallBanner from './components/InstallBanner';
import CartModal from './components/CartModal';
import { onForegroundMessage } from './firebase';
import products, { categories } from './data/products';
import { CartProvider } from './context/CartContext';

// Replace with your actual WhatsApp number (with country code, no + sign)
const WHATSAPP_NUMBER = '919716133795';
const SHOP_NAME = 'Guddu Traders';


import { useCart } from './context/CartContext';

function AppContent() {
  const { addToCart, cart } = useCart();
    const [toastMsg, setToastMsg] = useState("");

    // Wrap addToCart to show toast
    const handleAddToCart = (product, qty = 1) => {
      addToCart(product, qty);
      setToastMsg('Product added to cart!');
      setTimeout(() => setToastMsg(""), 2000);
    };
  const [showSplash, setShowSplash] = useState(() => {
    // Only show splash if not dismissed in this session
    return sessionStorage.getItem('splashDismissed') !== 'true';
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState(null);

  // Only enable notifications if not on iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  useEffect(() => {
    if (!isIOS) {
      onForegroundMessage((payload) => {
        setNotification({
          title: payload.notification?.title,
          body: payload.notification?.body,
        });
      });
    }
  }, [isIOS]);

  const clearNotification = useCallback(() => setNotification(null), []);

  const filteredProducts = useMemo(() => {
    // Only show building material items for now
    let filtered = products.filter((p) => p.category === 'building' && !p.disabled);
    // Optionally allow search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameHi.includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [searchQuery]);

  const newProducts = useMemo(
    () => products.filter((p) => p.isNew),
    []
  );

  const handleWhatsAppOrder = (product) => {
    const message = encodeURIComponent(
      `🛒 *Order Inquiry / ऑर्डर पूछताछ*\n\n` +
        `Product: ${product.name}\n` +
        `उत्पाद: ${product.nameHi}\n` +
        `Price: ₹${product.price} per ${product.unit}\n\n` +
        `I'm interested in buying this product. Please share availability and delivery details.\n` +
        `मुझे यह उत्पाद खरीदना है। कृपया उपलब्धता और डिलीवरी की जानकारी दें।`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:+${WHATSAPP_NUMBER}`);
  };

  if (showSplash) {
    return <HomeSplash onEnter={() => {
      setShowSplash(false);
      sessionStorage.setItem('splashDismissed', 'true');
    }} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Cart Modal */}
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} whatsappNumber={WHATSAPP_NUMBER} />
      {/* Smart Install Banner for iOS/Android */}
      <InstallBanner />
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4">
        <Header shopName={SHOP_NAME} onCall={handleCall} />
        {/* Floating Cart Button (top right, only if cart has items) */}
        {cart.length > 0 && !cartOpen && (
          <button
            className="fixed top-1/2 right-6 -translate-y-1/2 z-50 bg-white text-green-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-50 active:scale-95 transition-all border-2 border-green-500"
            aria-label="View Cart"
            onClick={() => setCartOpen(true)}
          >
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-8 h-8'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L7.5 15.75A2.25 2.25 0 009.664 18h7.672a2.25 2.25 0 002.164-1.813l1.286-7.715A1.125 1.125 0 0019.686 7.5H6.272m-1.166-2.228L6.272 7.5m0 0h13.414' />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow border-2 border-white animate-bounce z-10">
              {cart.reduce((sum, item) => sum + (item.qty || 1), 0)}
            </span>
          </button>
        )}
      </div>

      {/* Search */}
      <div className="sticky top-0 z-30 bg-slate-50 px-4 pt-2 pb-1">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Category Filter */}
      <CategoryBar
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {/* New Arrivals Carousel (only on All tab) */}
      {activeCategory === 'all' && !searchQuery && newProducts.length > 0 && (
        <NewArrivals
          products={newProducts}
          onProductClick={setSelectedProduct}
        />
      )}

      {/* Product Grid */}
      <section className="px-4 mt-4">
        <h2 className="text-lg font-bold text-slate-700 mb-3">
          {activeCategory === 'all' ? '🏪 All Products / सभी उत्पाद' : 
            categories.find(c => c.id === activeCategory)?.icon + ' ' +
            categories.find(c => c.id === activeCategory)?.name + ' / ' +
            categories.find(c => c.id === activeCategory)?.nameHi
          }
          <span className="text-sm font-normal text-slate-400 ml-2">
            ({filteredProducts.length} items)
          </span>
        </h2>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-lg">No products found</p>
            <p className="text-sm">कोई उत्पाद नहीं मिला</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOrder={handleWhatsAppOrder}
                onAddToCart={handleAddToCart}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Add to Cart Toast */}
      <SimpleToast message={toastMsg} onClose={() => setToastMsg("")} />

      {/* Footer */}
      <Footer whatsappNumber={WHATSAPP_NUMBER} shopName={SHOP_NAME} />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOrder={handleWhatsAppOrder}
        />
      )}

      {/* Push Notification Permission Banner (disabled on iOS) */}
      {!isIOS && <NotificationBanner />}

      {/* Foreground Notification Toast (disabled on iOS) */}
      {!isIOS && <NotificationToast notification={notification} onClose={clearNotification} />}

      {/* Floating WhatsApp Button (bottom right) */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('नमस्ते! मुझे आपकी दुकान के बारे में जानकारी चाहिए। / Hello! I need information about your shop.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 active:scale-95 transition-all"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
