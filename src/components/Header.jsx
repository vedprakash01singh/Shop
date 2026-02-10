export default function Header({ shopName, onCall }) {
  const marqueeStyle = {
    minWidth: '1200px',
    animation: 'marquee 14s linear infinite',
    willChange: 'transform',
    display: 'inline-flex',
    alignItems: 'center',
  };
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white px-2 sm:px-6 py-5 shadow-lg w-full">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none" style={{backgroundImage: 'url(https://www.transparenttextures.com/patterns/diamond-upholstery.png)'}}></div>

      {/* Marquee for all key info on mobile */}
      <div className="block sm:hidden w-full overflow-x-hidden" style={{height: '2.5em'}}>
        <div
          className="animate-marquee whitespace-nowrap text-yellow-200 font-semibold text-base py-1"
          style={{display: 'inline-block', minWidth: '2000px'}}
        >
          <span className="inline-flex items-center gap-2">
            <img src='https://img.icons8.com/color/96/000000/shop--v2.png' alt="Shop Logo" className="w-7 h-7 inline-block" />
            {shopName} <span className="ml-1 bg-yellow-400/80 text-yellow-900 text-xs px-2 py-0.5 rounded-full font-bold shadow">PWA</span>
          </span>
          <span className="mx-4">Building Materials • Hardware • Seeds • Fertilizers</span>
          <span className="mx-4">निर्माण सामग्री • हार्डवेयर • बीज • खाद-उर्वरक</span>
          <span className="mx-4 bg-yellow-300/80 text-yellow-900 text-xs px-3 py-1 rounded-full font-bold shadow">⭐ 30+ Years Trusted / 30+ साल का भरोसा</span>
          <span className="mx-4">Best Prices, Best Service!</span>
          <span className="mx-4">• Fast Delivery 🚚</span>
          <span className="mx-4">• Quality Products 🏆</span>
          <span className="mx-4">• Local Support 🤝</span>
          {/* Repeat for smooth loop */}
          <span className="inline-flex items-center gap-2">
            <img src='https://img.icons8.com/color/96/000000/shop--v2.png' alt="Shop Logo" className="w-7 h-7 inline-block" />
            {shopName} <span className="ml-1 bg-yellow-400/80 text-yellow-900 text-xs px-2 py-0.5 rounded-full font-bold shadow">PWA</span>
          </span>
          <span className="mx-4">Building Materials • Hardware • Seeds • Fertilizers</span>
          <span className="mx-4">निर्माण सामग्री • हार्डवेयर • बीज • खाद-उर्वरक</span>
          <span className="mx-4 bg-yellow-300/80 text-yellow-900 text-xs px-3 py-1 rounded-full font-bold shadow">⭐ 30+ Years Trusted / 30+ साल का भरोसा</span>
          <span className="mx-4">Best Prices, Best Service!</span>
          <span className="mx-4">• Fast Delivery 🚚</span>
          <span className="mx-4">• Quality Products 🏆</span>
          <span className="mx-4">• Local Support 🤝</span>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:flex relative z-10 flex-col sm:flex-row items-center sm:items-stretch justify-between max-w-7xl mx-auto">
        {/* Left: Logo and Info */}
        <div className="flex flex-1 items-center gap-3 min-w-0">
          <div className="bg-white/20 rounded-full p-2 shadow-lg flex items-center justify-center min-w-[56px] min-h-[56px]">
            <img src='https://img.icons8.com/color/96/000000/shop--v2.png' alt="Shop Logo" className="w-10 h-10" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-tight drop-shadow-sm flex items-center gap-2 whitespace-nowrap">
              {shopName}
              <span className="ml-1 bg-yellow-400/80 text-yellow-900 text-xs px-2 py-0.5 rounded-full font-bold shadow">PWA</span>
            </h1>
            <p className="text-blue-100 text-xs mt-0.5 font-medium truncate">
              Building Materials • Hardware • Seeds • Fertilizers
            </p>
            <p className="text-blue-200 text-[11px] mt-0.5 truncate">
              निर्माण सामग्री • हार्डवेयर • बीज • खाद-उर्वरक
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="bg-yellow-300/80 text-yellow-900 text-xs px-3 py-1 rounded-full font-bold shadow">
                ⭐ 30+ Years Trusted / 30+ साल का भरोसा
              </span>
            </div>
          </div>
        </div>
        {/* Right: Slogan, Highlights, Call */}
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-end gap-4 mt-4 sm:mt-0 w-full">
          <div className="flex flex-col items-end gap-2 text-right">
            <span className="text-lg font-bold text-yellow-200 drop-shadow-sm">Best Prices, Best Service!</span>
            <span className="text-xs text-blue-100">• Fast Delivery 🚚</span>
            <span className="text-xs text-blue-100">• Quality Products 🏆</span>
            <span className="text-xs text-blue-100">• Local Support 🤝</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={onCall}
              className="bg-white/30 backdrop-blur-sm rounded-full p-4 
                         hover:bg-white/50 active:scale-95 transition-all shadow"
              aria-label="Call Shop"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <span className="text-[11px] text-blue-100 font-semibold">Call / कॉल</span>
          </div>
          {/* Decorative Illustration (desktop only) */}
          <img src="https://img.icons8.com/color/96/000000/delivery.png" alt="Delivery" className="hidden sm:block w-16 h-16 ml-2 drop-shadow-lg" />
        </div>
      </div>
    </header>
  );
}
