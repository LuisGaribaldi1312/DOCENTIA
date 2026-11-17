'use client';

import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Share, PlusSquare, ShieldCheck } from 'lucide-react';

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
    <aside aria-label="Instalación de la aplicación" className="w-full bg-gradient-to-r from-brand-950 via-brand-900 to-serene-950 text-white px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 shadow-md border-b border-brand-800/60 relative z-40 transition-all">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-serene-300" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold flex items-center gap-2">
              Instala DOCENTIA en tu Celular o Tablet
              <span className="text-[10px] bg-serene-500/30 text-serene-200 border border-serene-400/40 px-2 py-0.5 rounded-full font-bold">
                PWA Oficial
              </span>
            </h4>
            <p className="text-[11px] text-slate-300">
              {isIOS 
                ? 'Toca Compartir en Safari y selecciona "Agregar a pantalla de inicio" para instalar.'
                : 'Accede rápidamente a vacantes docentes, gestiona expedientes y recibe alertas instantáneas.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isIOS && deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-serene-600 hover:bg-serene-500 text-white text-xs font-black shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Instalar App
            </button>
          )}

          {isIOS && (
            <div className="flex items-center gap-1.5 text-[11px] bg-white/10 px-3 py-1 rounded-xl text-serene-200 border border-white/10">
              <Share className="w-3.5 h-3.5 inline text-serene-300" />
              <span>Compartir &gt;</span>
              <PlusSquare className="w-3.5 h-3.5 inline text-serene-300" />
              <span>Inicio</span>
            </div>
          )}

          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Cerrar banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
