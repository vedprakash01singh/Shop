import { useState, useEffect } from 'react';

export default function NotificationToast({ notification, onClose }) {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(onClose, 6000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  if (!notification) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-slide-down">
      <div className="bg-white rounded-xl shadow-2xl border border-primary-200 p-4 max-w-md mx-auto
                      flex items-start gap-3">
        <span className="text-2xl">🆕</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-slate-800 text-sm truncate">
            {notification.title || 'Guddu Traders'}
          </h4>
          <p className="text-slate-600 text-xs mt-0.5 line-clamp-2">
            {notification.body || 'New update available!'}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
