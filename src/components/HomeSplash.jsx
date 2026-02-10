import React from 'react';

import { useEffect, useState } from 'react';

export default function HomeSplash({ onEnter }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <h1
        className={`text-4xl font-extrabold text-blue-800 mb-8 transition-all duration-700 ${show ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`}
      >
        Guddu Traders
      </h1>
      <button
        className={`px-8 py-3 bg-blue-700 text-white rounded-lg text-lg font-semibold shadow hover:bg-blue-800 transition-all duration-500 ${show ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-6'}`}
        onClick={onEnter}
      >
        Enter Shop
      </button>
    </div>
  );
}
