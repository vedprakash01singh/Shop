export default function CategoryBar({ categories, active, onChange }) {
  return (
    <div className="px-4 mt-2">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium
                        transition-all active:scale-95
                        ${
                          active === cat.id
                            ? `${cat.color} text-white shadow-md`
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                        }`}
          >
            <span className="text-base">{cat.icon}</span>
            <span className="whitespace-nowrap">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
