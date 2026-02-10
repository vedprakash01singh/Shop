const categoryColors = {
  building: 'from-orange-500 to-orange-600',
  hardware: 'from-slate-500 to-slate-600',
  seeds: 'from-green-500 to-green-600',
  fertilizers: 'from-amber-500 to-amber-600',
};

const categoryIcons = {
  building: '🏗️',
  hardware: '🔧',
  seeds: '🌱',
  fertilizers: '🧪',
};

import { useCart } from '../context/CartContext';

import { useState } from 'react';

export default function ProductCard({ product, onOrder, onClick, onAddToCart }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  // Use onAddToCart if provided, else fallback to context
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, qty);
    } else {
      addToCart(product, qty);
    }
  };
  return (
    <div className="card cursor-pointer" onClick={onClick}>
      {/* Category color bar + badge */}
      <div className={`bg-gradient-to-r ${categoryColors[product.category]} px-3 py-2 
                        flex items-center justify-between`}>
        <span className="text-white text-lg">{categoryIcons[product.category]}</span>
        {product.isNew && <span className="badge-new">NEW</span>}
      </div>

      {/* Product Image */}
      {product.image && (
        <div className="w-full aspect-[4/3] bg-slate-100 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-full max-h-32"
            loading="lazy"
          />
        </div>
      )}

      {/* Product Info */}
      <div className="p-3">
        <h3 className="font-semibold text-slate-800 text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>
        <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{product.nameHi}</p>

        {/* Price */}
        <div className="mt-2">
          <span className="text-primary-700 font-bold text-lg">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="text-slate-400 text-xs ml-1">/ {product.unit}</span>
        </div>

        {/* Stock status */}
        <div className="mt-1">
          {product.inStock ? (
            <span className="text-green-600 text-xs font-medium">✓ In Stock / उपलब्ध</span>
          ) : (
            <span className="text-red-500 text-xs font-medium">✗ Out of Stock</span>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2 mb-1">
            <label className="text-xs text-slate-500">Qty:</label>
            <button
              type="button"
              className="w-6 h-6 flex items-center justify-center bg-slate-200 rounded text-lg font-bold hover:bg-slate-300 select-none"
              onClick={e => { e.stopPropagation(); setQty(q => Math.max(1, q - 1)); }}
              aria-label="Decrease quantity"
            >
              –
            </button>
            <input
              type="number"
              min={1}
              max={product.maxQty || 100}
              value={qty}
              onChange={e => setQty(Math.max(1, Number(e.target.value)))}
              onClick={e => e.stopPropagation()}
              onFocus={e => e.stopPropagation()}
              className="w-12 px-2 py-1 border border-slate-300 rounded text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Quantity"
            />
            <button
              type="button"
              className="w-6 h-6 flex items-center justify-center bg-slate-200 rounded text-lg font-bold hover:bg-slate-300 select-none"
              onClick={e => { e.stopPropagation(); setQty(q => Math.min((product.maxQty || 100), q + 1)); }}
              aria-label="Increase quantity"
            >
              +
            </button>
            <span className="text-xs text-slate-400">{product.unit}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="w-1/2 bg-blue-600 text-white text-xs font-medium py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-blue-700 active:scale-95 transition-all"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M16 11V9a4 4 0 10-8 0v2a2 2 0 00-2 2v3a2 2 0 002 2h6a2 2 0 002-2v-3a2 2 0 00-2-2zm-6-2a2 2 0 114 0v2H10V9zm6 5a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h8a1 1 0 011 1v3z" />
              </svg>
              Add to Cart
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOrder(product);
              }}
              className="w-1/2 bg-green-600 text-white text-xs font-medium py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-green-700 active:scale-95 transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order / ऑर्डर
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
