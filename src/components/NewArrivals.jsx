export default function NewArrivals({ products, onProductClick }) {
  return (
    <section className="mt-4 px-4">
      <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
        🆕 New Arrivals / नए उत्पाद
      </h2>
      <div className="flex gap-3 overflow-x-auto no-scrollbar mt-2 pb-2">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => onProductClick(product)}
            className="flex-shrink-0 w-44 card cursor-pointer border-2 border-red-100 
                       bg-gradient-to-br from-red-50 to-white"
          >
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="badge-new">NEW!</span>
              </div>
              <h3 className="font-semibold text-slate-800 text-sm leading-tight mt-2 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{product.nameHi}</p>
              <div className="mt-2">
                <span className="text-primary-700 font-bold text-base">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-slate-400 text-xs ml-1">/ {product.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
