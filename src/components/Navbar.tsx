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
  CheckCircle2
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setCurrentTab('vacantes')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
                  DOCEN<span className="text-blue-600">TIA</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  PWA
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 -mt-1 hidden sm:block">
                Portal de Empleo & Vacantes para Maestros
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentTab('vacantes')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentTab === 'vacantes'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Explorar Vacantes
            </button>

            <button
              onClick={() => setCurrentTab('docente_sos')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentTab === 'docente_sos'
                  ? 'bg-amber-50 text-amber-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-600 animate-pulse" />
              Docente SOS (Interinatos)
            </button>

            {currentRole === 'docente' ? (
              <>
                <button
                  onClick={() => setCurrentTab('perfil_docente')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    currentTab === 'perfil_docente'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  Mi Expediente Digital
                </button>
                <button
                  onClick={() => setCurrentTab('mis_postulaciones')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    currentTab === 'mis_postulaciones'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Mis Postulaciones
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setCurrentTab('publicar_vacante')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors`}
                >
                  <PlusCircle className="w-4 h-4" />
                  Publicar Nueva Vacante
                </button>
                <button
                  onClick={() => setCurrentTab('dashboard_escuela')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    currentTab === 'dashboard_escuela'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Panel Escuela
                </button>
              </>
            )}
          </nav>

          {/* Right Role Switch & PWA Install */}
          <div className="flex items-center gap-2">
            
            {/* Install PWA Button if available */}
            {isInstallable && (
              <button
                onClick={onInstallClick}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-xs"
                title="Instalar Docentia en tu dispositivo"
              >
                <Smartphone className="w-3.5 h-3.5" />
                Instalar App
              </button>
            )}

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => {
                  switchRole('docente');
                  if (currentTab === 'publicar_vacante' || currentTab === 'dashboard_escuela') {
                    setCurrentTab('vacantes');
                  }
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentRole === 'docente'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                Soy Maestro
              </button>
              <button
                onClick={() => {
                  switchRole('escuela');
                  if (currentTab === 'perfil_docente' || currentTab === 'mis_postulaciones') {
                    setCurrentTab('dashboard_escuela');
                  }
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentRole === 'escuela'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Soy Escuela
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (App Experience) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setCurrentTab('vacantes')}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold ${
            currentTab === 'vacantes' ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span>Vacantes</span>
        </button>

        <button
          onClick={() => setCurrentTab('docente_sos')}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold ${
            currentTab === 'docente_sos' ? 'text-amber-600' : 'text-slate-500'
          }`}
        >
          <Flame className="w-5 h-5" />
          <span>SOS</span>
        </button>

        {currentRole === 'docente' ? (
          <>
            <button
              onClick={() => setCurrentTab('perfil_docente')}
              className={`flex flex-col items-center gap-1 text-[11px] font-semibold ${
                currentTab === 'perfil_docente' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <UserCheck className="w-5 h-5" />
              <span>Expediente</span>
            </button>
            <button
              onClick={() => setCurrentTab('mis_postulaciones')}
              className={`flex flex-col items-center gap-1 text-[11px] font-semibold ${
                currentTab === 'mis_postulaciones' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Postulaciones</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setCurrentTab('publicar_vacante')}
              className={`flex flex-col items-center gap-1 text-[11px] font-semibold ${
                currentTab === 'publicar_vacante' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <PlusCircle className="w-5 h-5" />
              <span>Publicar</span>
            </button>
            <button
              onClick={() => setCurrentTab('dashboard_escuela')}
              className={`flex flex-col items-center gap-1 text-[11px] font-semibold ${
                currentTab === 'dashboard_escuela' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span>Escuela</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};
