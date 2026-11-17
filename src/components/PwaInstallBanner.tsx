'use client';

import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Share, PlusSquare } from 'lucide-react';

export const PwaInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if dismissed previously
    const dismissed = sessionStorage.getItem('docentia_install_dismissed');
    if (dismissed) return;

    // Check iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;

    if (isIosDevice && !isStandalone) {
      setIsIOS(true);
      setShowBanner(true);
    }

    // Android / Desktop beforeinstallprompt
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Register service worker if supported
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('SW registration note:', err);
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem('docentia_install_dismissed', 'true');
  };

  if (!showBanner) return null;

  return (
    <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white px-4 py-3 shadow-md relative z-40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-blue-200" />
          </div>
          <div>
            <h4 className="text-sm font-bold flex items-center gap-2">
              Instala la App de DOCENTIA
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                Android & iOS
              </span>
            </h4>
            <p className="text-xs text-blue-100">
              {isIOS 
                ? 'Toca Compartir en Safari y luego "Agregar a pantalla de inicio" para instalar.'
                : 'Accede a vacantes al instante, recibe alertas de interinatos y postula sin abrir el navegador.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isIOS && deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-blue-800 text-xs font-bold shadow-xs hover:bg-blue-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Instalar en 1 Clic
            </button>
          )}

          {isIOS && (
            <div className="flex items-center gap-1 text-[11px] bg-white/15 px-2.5 py-1 rounded-md text-blue-100">
              <Share className="w-3.5 h-3.5 inline" />
              <span>Compartir &gt;</span>
              <PlusSquare className="w-3.5 h-3.5 inline" />
              <span>Inicio</span>
            </div>
          )}

          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Cerrar banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
