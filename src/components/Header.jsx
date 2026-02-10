export default function Header({ shopName, onCall }) {
  return (
    <header className="bg-gradient-to-r from-primary-800 to-primary-700 text-white px-4 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">{shopName}</h1>
          <p className="text-primary-200 text-xs mt-0.5">
            🏪 Building Materials • Hardware • Seeds • Fertilizers
          </p>
          <p className="text-primary-300 text-[10px] mt-0.5">
            निर्माण सामग्री • हार्डवेयर • बीज • खाद-उर्वरक
          </p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={onCall}
            className="bg-white/20 backdrop-blur-sm rounded-full p-2.5 
                       hover:bg-white/30 active:scale-95 transition-all"
            aria-label="Call Shop"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <span className="text-[10px] text-primary-200">Call / कॉल</span>
        </div>
      </div>
      {/* Trusted badge */}
      <div className="mt-2 flex items-center gap-2">
        <span className="bg-yellow-400/20 text-yellow-200 text-[10px] px-2 py-0.5 rounded-full font-medium">
          ⭐ 30+ Years Trusted / 30+ साल का भरोसा
        </span>
      </div>
    </header>
  );
}
