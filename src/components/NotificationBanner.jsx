import { useState, useEffect } from 'react';
import { requestNotificationPermission } from '../firebase';

export default function NotificationBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | requesting | granted | denied

  useEffect(() => {
    // Don't show if already granted or dismissed
    const dismissed = localStorage.getItem('notif_dismissed');
    const alreadyGranted = Notification.permission === 'granted';

    if (alreadyGranted) {
      // Already granted, silently register
      requestNotificationPermission();
      return;
    }

    if (Notification.permission === 'denied') return;
    if (dismissed) return;

    // Show banner after 3 seconds
    const timer = setTimeout(() => setShowBanner(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAllow = async () => {
    setStatus('requesting');
    const token = await requestNotificationPermission();
    if (token) {
      setStatus('granted');
      setTimeout(() => setShowBanner(false), 2000);
    } else {
      setStatus('denied');
      setTimeout(() => setShowBanner(false), 2000);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('notif_dismissed', 'true');
    setShowBanner(false);
  };

  if (!showBanner || !('Notification' in window)) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 max-w-md mx-auto">
        {status === 'granted' ? (
          <div className="text-center py-2">
            <p className="text-green-600 font-medium">
              ✅ Notifications enabled! / सूचनाएं चालू हो गईं!
            </p>
          </div>
        ) : status === 'denied' ? (
          <div className="text-center py-2">
            <p className="text-slate-500 text-sm">
              No problem! You can enable later from settings.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔔</span>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-sm">
                  Get New Product Alerts!
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  नए उत्पादों की सूचना पाएं! We'll notify you when new products arrive.
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="text-slate-400 hover:text-slate-600 p-1"
                aria-label="Dismiss"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleAllow}
                disabled={status === 'requesting'}
                className="flex-1 bg-primary-700 text-white text-sm font-medium py-2 
                           rounded-lg hover:bg-primary-800 active:scale-95 transition-all
                           disabled:opacity-50"
              >
                {status === 'requesting' ? '...' : '🔔 Allow / अनुमति दें'}
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 text-slate-500 text-sm hover:text-slate-700"
              >
                Later
              </button>
            </div>
          </>
        )}
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
