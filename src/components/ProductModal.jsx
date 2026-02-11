import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const categoryColors = {
  building: 'from-orange-500 to-orange-600',
  hardware: 'from-slate-500 to-slate-600',
  seeds: 'from-green-500 to-green-600',
  fertilizers: 'from-amber-500 to-amber-600',
};

const categoryLabels = {
  building: { en: 'Building Materials', hi: 'निर्माण सामग्री', icon: '🏗️' },
  hardware: { en: 'Hardware', hi: 'हार्डवेयर', icon: '🔧' },
  seeds: { en: 'Seeds', hi: 'बीज', icon: '🌱' },
  fertilizers: { en: 'Fertilizers', hi: 'खाद / उर्वरक', icon: '🧪' },
};

export default function ProductModal({ product, onClose, onOrder }) {
  if (!product) return null;
  const cat = categoryLabels[product.category];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal Card */}
      <div
        className="relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl 
                   max-h-[85vh] overflow-y-auto shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm 
                     rounded-full p-1.5 shadow-sm hover:bg-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Category Banner */}
        <div className={`bg-gradient-to-r ${categoryColors[product.category]} px-5 py-6 text-white`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{cat.icon}</span>
            <span className="text-sm font-medium opacity-80">{cat.en} / {cat.hi}</span>
          </div>
          <h2 className="text-xl font-bold leading-tight">{product.name}</h2>
          <p className="text-white/80 text-sm mt-1">{product.nameHi}</p>
          {product.isNew && (
            <span className="inline-block mt-2 badge-new">🆕 NEW ARRIVAL!</span>
          )}
        </div>
        {/* Product Image (show below banner) */}
        {product.image && (
          <div className="w-full bg-slate-100 flex items-center justify-center overflow-hidden" style={{maxHeight: 220}}>
            <Zoom>
              <img
                src={product.image}
                alt={product.name}
                className="object-contain w-full h-full max-h-56 cursor-zoom-in"
                loading="lazy"
              />
            </Zoom>
          </div>
        )}

        {/* Details */}
        <div className="p-5">
                    {/* Offer Section */}
                    {product.category === "building" && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-orange-600 mb-1">Special Offers</h3>
                        {/* Cement Offers */}
                        {(product.name.toLowerCase().includes("cement") || product.name.toLowerCase().includes("prism")) && (
                          <ul className="text-xs text-orange-700 list-disc pl-5 mb-2">
                            <li>Order ₹10,000+: Free delivery within 3km</li>
                            <li>Order ₹20,000+: Free delivery within 5km</li>
                          </ul>
                        )}
                        {/* Gitti Offers */}
                        {product.name.toLowerCase().includes("gitti") && (
                          <ul className="text-xs text-orange-700 list-disc pl-5 mb-2">
                            <li>Order ₹15,000+: Free delivery within 3km</li>
                            <li>Order ₹30,000+: Free delivery within 5km</li>
                          </ul>
                        )}
                        {/* Balu Offers */}
                        {product.name.toLowerCase().includes("balu") && (
                          <ul className="text-xs text-orange-700 list-disc pl-5 mb-2">
                            <li>Order ₹10,000+: Free delivery within 3km</li>
                          </ul>
                        )}
                      </div>
                    )}
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-primary-700">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-slate-400 text-sm">per {product.unit}</span>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-600 mb-1">
              Description / विवरण
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Stock */}
          <div className="mb-5 flex items-center gap-2">
            {product.inStock ? (
              <span className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                ✓ In Stock / उपलब्ध
              </span>
            ) : (
              <span className="bg-red-50 text-red-600 text-sm font-medium px-3 py-1 rounded-full">
                ✗ Out of Stock / उपलब्ध नहीं
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onOrder(product)}
              className="btn-whatsapp justify-center py-3 text-base rounded-xl"
            >
              <span className="block sm:hidden">
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </span>
              <span className="hidden sm:block">WhatsApp Order / व्हाट्सएप ऑर्डर</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-500 text-sm py-2 hover:text-slate-700 transition-colors"
            >
              Close / बंद करें
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
