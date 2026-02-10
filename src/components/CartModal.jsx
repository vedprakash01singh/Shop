import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartModal({ open, onClose, whatsappNumber }) {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();

  if (!open) return null;

  const getCartMessage = () => {
    if (cart.length === 0) return '';
    let msg = '🛒 *Order Cart*\n\n';
    cart.forEach((item, i) => {
      msg += `${i + 1}. ${item.name} (${item.nameHi})\nQty: ${item.qty} x ₹${item.price} /${item.unit}\n\n`;
    });
    msg += `\nTotal items: ${cart.length}`;
    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${getCartMessage()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5 relative animate-fadeInUp">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-slate-400 text-center py-8">Cart is empty</div>
        ) : (
          <div>
            <ul className="divide-y divide-slate-100 mb-4">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center py-2 gap-2">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-slate-50 rounded" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.nameHi}</div>
                    <div className="text-xs text-slate-500">₹{item.price} / {item.unit}</div>
                  </div>
                  <input
                    type="number"
                    min={1}
                    value={item.qty}
                    onChange={e => updateQty(item.id, parseInt(e.target.value) || 1)}
                    className="w-12 border rounded px-1 text-center text-sm"
                  />
                  <button onClick={() => removeFromCart(item.id)} className="ml-2 text-red-500 text-lg">&times;</button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold text-center hover:bg-green-700 transition"
              >
                Send Cart to WhatsApp
              </a>
              <button
                onClick={clearCart}
                className="bg-slate-200 text-slate-700 py-2 px-3 rounded-lg font-semibold hover:bg-slate-300 transition"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
