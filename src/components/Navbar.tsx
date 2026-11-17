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
  LayoutDashboard,
  Sparkles,
  Info,
  LogIn,
  LogOut,
  User,
  Award
} from 'lucide-react';
import { UserAccount, UserRole } from '@/types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  currentUser?: UserAccount | null;
  onOpenAuth: () => void;
  onOpenSubscription: (plan: 'docente_5usd' | 'escuela_10usd') => void;
  onLogout: () => void;
  onInstallClick?: () => void;
  isInstallable?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentRole,
  switchRole,
  currentUser,
  onOpenAuth,
  onOpenSubscription,
  onLogout,
  onInstallClick,
  isInstallable
}) => {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all w-full safe-pt pt-[env(safe-area-inset-top,0px)]">
        {/* Edge-to-Edge Responsive Container */}
        <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex items-center justify-between min-h-[4.25rem] sm:min-h-[4.75rem] lg:min-h-[5.25rem] py-1.5 landscape-compact-nav">
            
            {/* Logo Corporativo Institucional Oficial */}
            <div 
              onClick={() => setCurrentTab('vacantes')}
              className="flex flex-col items-start justify-center cursor-pointer group select-none transition-transform hover:scale-[1.01] shrink-0 py-0.5"
            >
              <img
                src="/images/docentia-logo.png"
                alt="DOCENTIA Red Educativa"
                loading="eager"
                className="h-10 xs:h-12 sm:h-13 lg:h-15 w-auto max-w-[190px] xs:max-w-[240px] sm:max-w-[290px] lg:max-w-none object-contain shrink-0 drop-shadow-2xs"
              />
              <p className="text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] lg:text-[11px] font-bold text-slate-500 tracking-tight sm:tracking-wider leading-none mt-1 select-none">
                Plataforma de Contratación & Empleo Docente
              </p>
            </div>

            {/* Desktop Navigation (Expanded Full-Width Experience) */}
            <nav className="hidden lg:flex items-center gap-1.5">
            
            {/* Botón Conoce DOCENTIA & Planes Informativo */}
            <button
              onClick={() => setCurrentTab('nosotros')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'nosotros'
                  ? 'bg-serene-50 text-serene-900 font-extrabold shadow-xs border border-serene-200'
                  : 'text-slate-600 hover:text-brand-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-prestige-600" />
              Conoce DOCENTIA & Planes
            </button>

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

            {/* Opciones Privadas: SOLO visibles si el usuario ha iniciado sesión */}
            {currentUser && (
              <>
                {/* Herramientas de Docente (o SuperAdmin en modo docente) */}
                {(currentRole === 'docente' || currentUser.isSuperAdmin) && currentRole === 'docente' && (
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
                )}

                {/* Herramientas de Escuela (o SuperAdmin en modo escuela) */}
                {(currentRole === 'escuela' || currentUser.isSuperAdmin) && currentRole === 'escuela' && (
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
              </>
            )}
          </nav>

          {/* Selector de Entorno Corporativo y Autenticación */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
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
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80 shadow-inner">
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

            {/* SECCIÓN DE USUARIO / LOGIN & PLANES */}
            {!currentUser ? (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-black text-white bg-gradient-to-r from-brand-950 via-brand-900 to-serene-700 hover:from-brand-900 hover:to-serene-600 shadow-md shadow-brand-900/10 hover:shadow-lg transition-all shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 text-serene-200 shrink-0" />
                <span className="hidden xs:inline">Iniciar Sesión / Registro</span>
                <span className="xs:hidden">Acceder</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-slate-50 p-1 pl-2.5 rounded-2xl border border-slate-200/90 shadow-2xs">
                
                {/* Nombre y Chip de Plan */}
                <div className="flex flex-col text-left pr-1 hidden md:block">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-brand-950 truncate max-w-[130px]">
                      {currentUser.name}
                    </span>
                    {currentUser.subscription.isCertified && (
                      <span title="Perfil Certificado">
                        <Award className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      </span>
                    )}
                  </div>
                  
                  {/* Estado de Suscripción / Rango */}
                  {currentUser.isSuperAdmin ? (
                    <span className="text-[10px] font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                      Super Administrador Global
                    </span>
                  ) : currentUser.subscription.status === 'activo' ? (
                    <span className="text-[10px] font-extrabold text-emerald-700">
                      {currentUser.role === 'docente' ? 'Plan $5 USD Certificado ✓' : 'Plan Escuela $10 USD ✓'}
                    </span>
                  ) : (
                    <button
                      onClick={() => onOpenSubscription(currentUser.role === 'docente' ? 'docente_5usd' : 'escuela_10usd')}
                      className="text-[10px] font-extrabold text-amber-700 hover:text-amber-900 hover:underline flex items-center gap-0.5"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                      Activar Plan (${currentUser.role === 'docente' ? '5' : '10'} USD)
                    </button>
                  )}
                </div>

                {/* Si es superadmin en móvil */}
                {currentUser.isSuperAdmin && (
                  <span className="md:hidden text-[9px] font-black text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded-md border border-purple-200">
                    SuperAdmin
                  </span>
                )}

                {/* Botón rápido de Activar Plan si no lo tiene en móvil/compacto */}
                {!currentUser.isSuperAdmin && currentUser.subscription.status !== 'activo' && (
                  <button
                    onClick={() => onOpenSubscription(currentUser.role === 'docente' ? 'docente_5usd' : 'escuela_10usd')}
                    className="md:hidden px-2 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-[10px] shadow-xs animate-pulse"
                  >
                    Activar ${currentUser.role === 'docente' ? '5' : '10'}
                  </button>
                )}

                {/* Botón Cerrar Sesión */}
                <button
                  onClick={onLogout}
                  title="Cerrar sesión"
                  className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-rose-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>

    {/* Mobile & Tablet App Navigation Bar (Optimized Ergonomic Dock Outside Header) */}
    <nav 
      aria-label="Navegación móvil"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-1.5 sm:py-2 flex items-center justify-around shadow-2xl safe-pb landscape-compact-dock"
    >
      <button
        onClick={() => setCurrentTab('nosotros')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] sm:text-[11px] font-bold transition-colors ${
          currentTab === 'nosotros' ? 'text-serene-700 bg-serene-50/70' : 'text-slate-500'
        }`}
      >
        <Sparkles className="w-5 h-5 text-prestige-600" />
        <span>Nosotros</span>
      </button>

      <button
        onClick={() => setCurrentTab('vacantes')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] sm:text-[11px] font-bold transition-colors ${
          currentTab === 'vacantes' ? 'text-serene-700 bg-serene-50/70' : 'text-slate-500'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span>Vacantes</span>
      </button>

      <button
        onClick={() => setCurrentTab('docente_sos')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] sm:text-[11px] font-bold transition-colors ${
          currentTab === 'docente_sos' ? 'text-prestige-700 bg-prestige-50' : 'text-slate-500'
        }`}
      >
        <Flame className="w-5 h-5 text-prestige-600" />
        <span>SOS</span>
      </button>

      {/* Solo mostrar opciones privadas si el usuario ha iniciado sesión */}
      {currentUser ? (
        <>
          {(currentRole === 'docente' || currentUser.isSuperAdmin) && currentRole === 'docente' && (
            <>
              <button
                onClick={() => setCurrentTab('perfil_docente')}
                className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] sm:text-[11px] font-bold transition-colors ${
                  currentTab === 'perfil_docente' ? 'text-serene-700 bg-serene-50/70' : 'text-slate-500'
                }`}
              >
                <UserCheck className="w-5 h-5" />
                <span>Expediente</span>
              </button>

              <button
                onClick={() => setCurrentTab('mis_postulaciones')}
                className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] sm:text-[11px] font-bold transition-colors ${
                  currentTab === 'mis_postulaciones' ? 'text-brand-900 bg-brand-50' : 'text-slate-500'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>Postulaciones</span>
              </button>
            </>
          )}

          {(currentRole === 'escuela' || currentUser.isSuperAdmin) && currentRole === 'escuela' && (
            <>
              <button
                onClick={() => setCurrentTab('dashboard_escuela')}
                className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] sm:text-[11px] font-bold transition-colors ${
                  currentTab === 'dashboard_escuela' ? 'text-brand-900 bg-brand-50' : 'text-slate-500'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Panel ATS</span>
              </button>

              <button
                onClick={() => setCurrentTab('publicar_vacante')}
                className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] sm:text-[11px] font-bold transition-colors ${
                  currentTab === 'publicar_vacante' ? 'text-serene-700 bg-serene-50' : 'text-slate-500'
                }`}
              >
                <PlusCircle className="w-5 h-5" />
                <span>Publicar</span>
              </button>
            </>
          )}
        </>
      ) : (
        <button
          onClick={onOpenAuth}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] sm:text-[11px] font-extrabold text-brand-950 bg-serene-50 border border-serene-200"
        >
          <LogIn className="w-5 h-5 text-serene-700" />
          <span>Acceder</span>
        </button>
      )}
    </nav>
  </>
  );
};
