'use client';

import React from 'react';
import { 
  GraduationCap, 
  Building2, 
  UserCheck, 
  PlusCircle, 
  Flame, 
  Briefcase, 
  FileText, 
  Smartphone,
  ShieldCheck,
  Compass,
  LayoutDashboard
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentRole: 'docente' | 'escuela';
  switchRole: (role: 'docente' | 'escuela') => void;
  onInstallClick?: () => void;
  isInstallable?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentRole,
  switchRole,
  onInstallClick,
  isInstallable
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all w-full">
      {/* Edge-to-Edge Responsive Container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo Corporativo Institucional */}
          <div 
            onClick={() => setCurrentTab('vacantes')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-900 via-brand-800 to-serene-700 flex items-center justify-center text-white shadow-md shadow-brand-900/15 group-hover:shadow-serene-600/25 transition-all group-hover:scale-[1.02]">
                <GraduationCap className="w-6 h-6 text-serene-200" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-serene-500 border-2 border-white rounded-full" />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-brand-900 font-sans">
                  DOCEN<span className="text-serene-600">TIA</span>
                </span>
                <span className="hidden sm:inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-serene-50 text-serene-700 border border-serene-200">
                  RED EDUCATIVA
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-wide hidden md:block">
                Plataforma de Contratación & Empleo Docente
              </p>
            </div>
          </div>

          {/* Desktop Navigation (Expanded Full-Width Experience) */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => setCurrentTab('vacantes')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'vacantes'
                  ? 'bg-brand-50 text-brand-900 font-extrabold shadow-xs'
                  : 'text-slate-600 hover:text-brand-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4 text-serene-600" />
              Bolsa de Vacantes
            </button>

            <button
              onClick={() => setCurrentTab('docente_sos')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'docente_sos'
                  ? 'bg-prestige-50 text-prestige-800 font-extrabold shadow-xs border border-prestige-200'
                  : 'text-slate-600 hover:text-prestige-700 hover:bg-prestige-50/50'
              }`}
            >
              <Flame className="w-4 h-4 text-prestige-600 animate-pulse" />
              Interinatos SOS (Urgentes)
            </button>

            {currentRole === 'docente' ? (
              <>
                <button
                  onClick={() => setCurrentTab('perfil_docente')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    currentTab === 'perfil_docente'
                      ? 'bg-serene-50 text-serene-800 font-extrabold shadow-xs border border-serene-200'
                      : 'text-slate-600 hover:text-brand-900 hover:bg-slate-100'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-serene-600" />
                  Expediente Digital Docente
                </button>

                <button
                  onClick={() => setCurrentTab('mis_postulaciones')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    currentTab === 'mis_postulaciones'
                      ? 'bg-brand-50 text-brand-900 font-extrabold shadow-xs'
                      : 'text-slate-600 hover:text-brand-900 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4 text-brand-600" />
                  Mis Postulaciones
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setCurrentTab('dashboard_escuela')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    currentTab === 'dashboard_escuela'
                      ? 'bg-brand-50 text-brand-900 font-extrabold shadow-xs'
                      : 'text-slate-600 hover:text-brand-900 hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-brand-600" />
                  Panel ATS Escuela
                </button>

                <button
                  onClick={() => setCurrentTab('publicar_vacante')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-brand-900 to-serene-700 hover:from-brand-800 hover:to-serene-600 shadow-md shadow-brand-900/10 hover:shadow-lg transition-all"
                >
                  <PlusCircle className="w-4 h-4 text-serene-200" />
                  Publicar Convocatoria
                </button>
              </>
            )}
          </nav>

          {/* Selector de Entorno Corporativo (Docentes vs Instituciones) */}
          <div className="flex items-center gap-3">
            
            {/* Install PWA Button if available */}
            {isInstallable && (
              <button
                onClick={onInstallClick}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-serene-50 text-serene-800 border border-serene-200 hover:bg-serene-100 transition-colors shadow-xs"
                title="Instalar Docentia en este dispositivo"
              >
                <Smartphone className="w-3.5 h-3.5 text-serene-600" />
                Instalar App
              </button>
            )}

            {/* Corporate Role Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80 shadow-inner">
              <button
                onClick={() => {
                  switchRole('docente');
                  if (currentTab === 'publicar_vacante' || currentTab === 'dashboard_escuela') {
                    setCurrentTab('vacantes');
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentRole === 'docente'
                    ? 'bg-white text-brand-900 shadow-sm border border-slate-200/50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className={`w-3.5 h-3.5 ${currentRole === 'docente' ? 'text-serene-600' : 'text-slate-400'}`} />
                <span>Docente</span>
              </button>

              <button
                onClick={() => {
                  switchRole('escuela');
                  if (currentTab === 'perfil_docente' || currentTab === 'mis_postulaciones') {
                    setCurrentTab('dashboard_escuela');
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentRole === 'escuela'
                    ? 'bg-white text-brand-900 shadow-sm border border-slate-200/50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className={`w-3.5 h-3.5 ${currentRole === 'escuela' ? 'text-brand-700' : 'text-slate-400'}`} />
                <span>Institución</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile & Tablet App Navigation Bar (Optimized Ergonomic Dock) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-3 py-2 flex items-center justify-around shadow-2xl safe-pb">
        <button
          onClick={() => setCurrentTab('vacantes')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[11px] font-bold transition-colors ${
            currentTab === 'vacantes' ? 'text-serene-700 bg-serene-50/70' : 'text-slate-500'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>Vacantes</span>
        </button>

        <button
          onClick={() => setCurrentTab('docente_sos')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[11px] font-bold transition-colors ${
            currentTab === 'docente_sos' ? 'text-prestige-700 bg-prestige-50' : 'text-slate-500'
          }`}
        >
          <Flame className="w-5 h-5 text-prestige-600" />
          <span>SOS</span>
        </button>

        {currentRole === 'docente' ? (
          <>
            <button
              onClick={() => setCurrentTab('perfil_docente')}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[11px] font-bold transition-colors ${
                currentTab === 'perfil_docente' ? 'text-serene-700 bg-serene-50/70' : 'text-slate-500'
              }`}
            >
              <UserCheck className="w-5 h-5" />
              <span>Expediente</span>
            </button>

            <button
              onClick={() => setCurrentTab('mis_postulaciones')}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[11px] font-bold transition-colors ${
                currentTab === 'mis_postulaciones' ? 'text-brand-900 bg-brand-50' : 'text-slate-500'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Postulaciones</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setCurrentTab('dashboard_escuela')}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[11px] font-bold transition-colors ${
                currentTab === 'dashboard_escuela' ? 'text-brand-900 bg-brand-50' : 'text-slate-500'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Panel ATS</span>
            </button>

            <button
              onClick={() => setCurrentTab('publicar_vacante')}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[11px] font-bold transition-colors ${
                currentTab === 'publicar_vacante' ? 'text-serene-700 bg-serene-50' : 'text-slate-500'
              }`}
            >
              <PlusCircle className="w-5 h-5" />
              <span>Publicar</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};
