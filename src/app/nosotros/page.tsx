'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { PwaInstallBanner } from '@/components/PwaInstallBanner';
import { AboutPricingView } from '@/components/AboutPricingView';
import { useDocentiaStore } from '@/lib/store';

export default function NosotrosPage() {
  const router = useRouter();
  const { currentRole, switchRole } = useDocentiaStore();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased w-full">
      <PwaInstallBanner />

      <Navbar
        currentTab="nosotros"
        setCurrentTab={(tab) => {
          if (tab === 'nosotros') return;
          router.push(`/?tab=${tab}`);
        }}
        currentRole={currentRole}
        switchRole={switchRole}
      />

      <main className="flex-1 w-full pt-6">
        <AboutPricingView
          onGoToVacancies={() => router.push('/?tab=vacantes')}
          onGoToRegisterTeacher={() => router.push('/?tab=perfil_docente')}
          onGoToRegisterSchool={() => router.push('/?tab=publicar_vacante')}
        />
      </main>

      <footer className="w-full bg-white border-t border-slate-200/90 py-10 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-xs text-slate-500 mt-12">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-black text-brand-950 text-sm tracking-tight">DOCENTIA</span>
            <p className="text-[11px] text-slate-400">Red Institucional de Contratación & Empleo Educativo</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500 font-medium">
            <span>Escuelas Públicas & Privadas</span>
            <span>·</span>
            <span>Planes de $5 y $10 USD</span>
            <span>·</span>
            <span className="font-bold text-serene-700">PWA Adaptable para Móviles y Tablets</span>
          </div>
          <div className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} DOCENTIA. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
