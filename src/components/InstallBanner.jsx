import { useEffect, useState } from 'react';

export default function InstallBanner() {
  const [show, setShow] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIos(/iphone|ipad|ipod/.test(userAgent));
    setIsAndroid(/android/.test(userAgent));

    // Android: Listen for beforeinstallprompt
    function handleBeforeInstallPrompt(e) {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // iOS: Show if not installed
    if (isIos && window.navigator.standalone !== true) {
      setShow(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isIos]);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(() => setShow(false));
    }
  };

  if (!show) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-slide-up">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl shadow-lg p-4 max-w-md mx-auto flex items-start gap-3">
        <span className="text-2xl">📲</span>
        <div className="flex-1">
          <h3 className="font-bold text-yellow-900 text-sm">Install Our App for Fast Access!</h3>
          {isIos ? (
            <p className="text-yellow-800 text-xs mt-1">
              On iPhone: Tap <span className="inline-block bg-slate-200 px-1 rounded">Share</span> <span className="inline-block">&#x2191;</span> then <b>Add to Home Screen</b>.<br/>
              <span className="text-slate-500">iOS requires this step for app-like experience.</span>
            </p>
          ) : isAndroid ? (
            <p className="text-yellow-800 text-xs mt-1">
              On Android: Tap <b>Install</b> below or use your browser menu <b>Add to Home screen</b>.<br/>
              <span className="text-slate-500">Get instant access from your home screen.</span>
            </p>
          ) : (
            <p className="text-yellow-800 text-xs mt-1">
              For best experience, add this app to your home screen.
            </p>
          )}
        </div>
        {isAndroid && deferredPrompt && (
          <button
            onClick={handleInstall}
            className="ml-2 bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 text-xs font-semibold"
          >
            Install
          </button>
        )}
        <button
          onClick={() => setShow(false)}
          className="ml-2 text-yellow-700 hover:text-yellow-900 text-lg"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
