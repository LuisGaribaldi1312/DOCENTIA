'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Filter, 
  GraduationCap, 
  Building2, 
  Flame, 
  Briefcase, 
  DollarSign, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  BookOpen,
  SlidersHorizontal,
  X,
  ChevronDown,
  Compass,
  School,
  Clock,
  RotateCcw
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { PwaInstallBanner } from '@/components/PwaInstallBanner';
import { VacancyCard } from '@/components/VacancyCard';
import { VacancyDetailModal } from '@/components/VacancyDetailModal';
import { PublishVacancyForm } from '@/components/PublishVacancyForm';
import { TeacherProfileForm } from '@/components/TeacherProfileForm';
import { SchoolDashboard } from '@/components/SchoolDashboard';
import { MyApplicationsView } from '@/components/MyApplicationsView';
import { AboutPricingView } from '@/components/AboutPricingView';
import { AuthModal } from '@/components/AuthModal';
import { SubscriptionModal } from '@/components/SubscriptionModal';
import { LegalPoliciesModal } from '@/components/LegalPoliciesModal';
import { useDocentiaStore } from '@/lib/store';
import { JobVacancy, EducationalLevel, ContractType, SchoolType, UserRole } from '@/types';
import { MEXICAN_STATES } from '@/lib/mockData';

export default function HomePage() {
  const {
    vacancies,
    teacherProfile,
    schoolProfile,
    applications,
    currentRole,
    currentUser,
    isLoaded,
    login,
    registerUser,
    logout,
    activateSubscription,
    addVacancy,
    updateTeacherProfile,
    applyToVacancy,
    updateApplicationStatus,
    switchRole
  } = useDocentiaStore();

  const [currentTab, setCurrentTab] = useState<string>('vacantes');
  const [selectedVacancy, setSelectedVacancy] = useState<JobVacancy | null>(null);

  // Auth & Subscription Modals State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState<UserRole>('docente');
  const [authPromptMessage, setAuthPromptMessage] = useState<string | undefined>(undefined);

  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [subscriptionPlanType, setSubscriptionPlanType] = useState<'docente_5usd' | 'escuela_10usd'>('docente_5usd');
  const [subscriptionReason, setSubscriptionReason] = useState<string | undefined>(undefined);

  // Legal Framework Modal State
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'terminos' | 'privacidad' | 'manejo_datos' | 'seguridad'>('terminos');

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('todos');
  const [contractFilter, setContractFilter] = useState<string>('todos');
  const [schoolTypeFilter, setSchoolTypeFilter] = useState<string>('todas');
  const [stateFilter, setStateFilter] = useState<string>('todos');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filtered Vacancies Logic
  const filteredVacancies = useMemo(() => {
    return vacancies.filter((v) => {
      // Tab SOS Filter
      if (currentTab === 'docente_sos' && !v.isUrgentSubstitute) {
        return false;
      }

      // Keyword Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = v.title.toLowerCase().includes(query);
        const matchesSchool = v.schoolName.toLowerCase().includes(query);
        const matchesSubject = v.subjects.some(s => s.toLowerCase().includes(query));
        const matchesLocation = v.location.city.toLowerCase().includes(query) || v.location.state.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSchool && !matchesSubject && !matchesLocation) {
          return false;
        }
      }

      // Level Filter
      if (levelFilter !== 'todos' && v.educationalLevel !== levelFilter) {
        return false;
      }

      // Contract Type Filter
      if (contractFilter !== 'todos' && v.contractType !== contractFilter) {
        return false;
      }

      // School Type Filter
      if (schoolTypeFilter !== 'todas' && v.schoolType !== schoolTypeFilter) {
        return false;
      }

      // State Filter
      if (stateFilter !== 'todos' && v.location.state !== stateFilter) {
        return false;
      }

      return true;
    });
  }, [vacancies, currentTab, searchTerm, levelFilter, contractFilter, schoolTypeFilter, stateFilter]);

  const appliedIds = useMemo(() => {
    return new Set(applications.map(a => a.vacancyId));
  }, [applications]);

  const resetFilters = () => {
    setLevelFilter('todos');
    setContractFilter('todos');
    setSchoolTypeFilter('todas');
    setStateFilter('todos');
    setSearchTerm('');
  };

  const hasActiveFilters = levelFilter !== 'todos' || contractFilter !== 'todos' || schoolTypeFilter !== 'todas' || stateFilter !== 'todos' || searchTerm !== '';

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-serene-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-bold text-brand-900">Iniciando DOCENTIA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased w-full">
      
      {/* PWA Install Banner */}
      <PwaInstallBanner />

      {/* Main Full-Width Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentRole={currentRole}
        switchRole={switchRole}
        currentUser={currentUser}
        onOpenAuth={() => {
          setAuthRole(currentRole);
          setAuthPromptMessage(undefined);
          setAuthModalOpen(true);
        }}
        onOpenSubscription={(plan) => {
          setSubscriptionPlanType(plan);
          setSubscriptionReason(undefined);
          setSubscriptionModalOpen(true);
        }}
        onLogout={logout}
      />

      <main className="flex-1 w-full">
        
        {/* TABS: VACANTES / DOCENTE SOS */}
        {(currentTab === 'vacantes' || currentTab === 'docente_sos') && (
          <div className="w-full">
            
            {/* Hero Section Corporativo y Pacífico - Edge to Edge */}
            <section className="w-full bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 text-white py-6 sm:py-10 md:py-14 lg:py-16 px-3.5 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative border-b border-brand-800/60 landscape-compact-hero">
              
              {/* Subtle background glow effect (psychological calm) */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-serene-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-10 w-[400px] h-[200px] bg-prestige-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="w-full relative z-10 max-w-7xl mx-auto space-y-4 sm:space-y-6">
                
                {/* Side-by-Side Avatar + Headline Block (Always beside the text across mobile, tablet & desktop) */}
                <div className="flex flex-row items-center sm:items-end gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
                  
                  {/* Avatar Col (Left side, pointing right towards headline) */}
                  <div className="shrink-0 flex flex-col items-center justify-end relative w-24 xs:w-32 sm:w-44 md:w-56 lg:w-[270px] xl:w-[310px]">
                    <div className="relative w-full flex flex-col items-center">
                      <div className={`absolute inset-0 rounded-full blur-xl pointer-events-none ${
                        currentTab === 'docente_sos'
                          ? 'bg-gradient-to-t from-prestige-500/30 via-amber-500/15 to-transparent'
                          : 'bg-gradient-to-t from-serene-500/25 via-emerald-500/10 to-transparent'
                      }`} />
                      <div className="absolute bottom-2 sm:bottom-4 w-3/4 h-3 sm:h-8 bg-black/40 rounded-full blur-xs sm:blur-lg pointer-events-none" />
                      
                      {currentTab === 'docente_sos' ? (
                        <img
                          src="/images/docentia-avatar-sos.png"
                          alt="Docente SOS DOCENTIA con megáfono urgente"
                          loading="eager"
                          className="relative z-10 w-full h-auto object-contain object-bottom max-h-[190px] xs:max-h-[240px] sm:max-h-[320px] md:max-h-[380px] xl:max-h-[430px] drop-shadow-[0_15px_25px_rgba(217,119,6,0.35)] transition-transform duration-300 hover:scale-[1.02]"
                        />
                      ) : (
                        <img
                          src="/images/docentia-avatar-vacantes.png"
                          alt="Docente DOCENTIA con expediente"
                          loading="eager"
                          className="relative z-10 w-full h-auto object-contain object-bottom max-h-[190px] xs:max-h-[240px] sm:max-h-[320px] md:max-h-[380px] xl:max-h-[430px] drop-shadow-[0_15px_25px_rgba(13,148,136,0.3)] transition-transform duration-300 hover:scale-[1.02]"
                        />
                      )}
                      
                      {/* Floating tag (visible on sm and up) */}
                      {currentTab === 'docente_sos' ? (
                        <div className="hidden sm:flex relative -mt-4 sm:-mt-6 z-20 bg-white/95 backdrop-blur-md text-brand-950 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-2xl shadow-lg border border-prestige-200/80 text-[10px] sm:text-[11px] font-black items-center gap-1.5 whitespace-nowrap">
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-prestige-500 animate-pulse" />
                          <span>Convocatorias SOS</span>
                        </div>
                      ) : (
                        <div className="hidden sm:flex relative -mt-4 sm:-mt-6 z-20 bg-white/95 backdrop-blur-md text-brand-950 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-2xl shadow-lg border border-serene-200/80 text-[10px] sm:text-[11px] font-black items-center gap-1.5 whitespace-nowrap">
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Expediente en Mano</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Main Content Column (Right side, next to the avatar) */}
                  <div className="flex-1 text-left space-y-2 sm:space-y-3 min-w-0">
                    
                    {/* Badge Institucional */}
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 xs:px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 border border-white/15 text-serene-300 text-[10px] xs:text-[11px] sm:text-xs font-extrabold shadow-xs backdrop-blur-xs">
                      <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-prestige-400 shrink-0" />
                      <span className="truncate">
                        {currentTab === 'docente_sos'
                          ? 'Interinatos & Suplencias Urgentes < 48 hrs'
                          : 'Plataforma Oficial de Vacantes'}
                      </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight text-white">
                      {currentTab === 'docente_sos' ? (
                        <>
                          Interinatos y Reemplazos <span className="text-prestige-400">Docente SOS</span>
                        </>
                      ) : (
                        <>
                          El Portal Corporativo Hecho para <span className="text-serene-400">Maestros y Escuelas</span>
                        </>
                      )}
                    </h1>

                    <p className="text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {currentTab === 'docente_sos'
                        ? 'Bolsa urgente de suplencias para responder a incapacidades escolares en menos de 48 horas en escuelas públicas y privadas.'
                        : 'Vinculamos el talento docente con colegios e instituciones de todos los niveles educativos con máxima transparencia en salarios, tipo de contratación y requisitos documentales.'}
                    </p>

                  </div>

                </div>

                    {/* Barra de Búsqueda Full Width Adaptativa */}
                    <div className="mt-4 sm:mt-6 max-w-4xl bg-white rounded-2xl p-2 sm:p-2.5 shadow-2xl flex flex-col sm:flex-row items-center gap-2 border border-slate-200/90 text-left">
                      <div className="flex items-center gap-2.5 px-3 py-2 flex-1 w-full text-slate-800">
                        <Search className="w-5 h-5 text-serene-600 shrink-0" />
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Materia, asignatura, título de vacante o escuela..."
                          className="w-full text-xs sm:text-sm font-semibold focus:outline-hidden text-brand-950 placeholder:text-slate-400 placeholder:font-normal"
                        />
                      </div>

                      <div className="hidden sm:block w-px h-8 bg-slate-200" />

                      <div className="flex items-center gap-2 px-3 py-2 w-full sm:w-60 text-slate-800">
                        <MapPin className="w-4 h-4 text-serene-600 shrink-0" />
                        <select
                          value={stateFilter}
                          onChange={(e) => setStateFilter(e.target.value)}
                          className="w-full text-xs font-bold text-slate-700 bg-transparent focus:outline-hidden cursor-pointer"
                        >
                          <option value="todos">Todos los Estados</option>
                          {MEXICAN_STATES.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>

                      <button
                        onClick={() => {}}
                        className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-brand-950 via-brand-900 to-serene-700 hover:from-brand-900 hover:to-serene-600 text-white font-black text-xs shadow-md transition-all shrink-0"
                      >
                        Buscar Vacantes
                      </button>
                    </div>

                    {/* Chips de Nivel Rápido */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-4 sm:mt-6">
                      {[
                        { id: 'todos', label: 'Todos los Niveles' },
                        { id: 'inicial_preescolar', label: 'Preescolar' },
                        { id: 'primaria', label: 'Primaria' },
                        { id: 'secundaria', label: 'Secundaria' },
                        { id: 'preparatoria_bachillerato', label: 'Bachillerato' },
                        { id: 'universidad_superior', label: 'Universidad' },
                        { id: 'posgrado', label: 'Posgrado' },
                        { id: 'idiomas', label: 'Idiomas' }
                      ].map((chip) => (
                        <button
                          key={chip.id}
                          onClick={() => setLevelFilter(chip.id)}
                          className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all ${
                            levelFilter === chip.id
                              ? 'bg-serene-600 text-white shadow-md scale-105 border border-serene-400'
                              : 'bg-white/10 text-white/90 hover:bg-white/20 border border-white/10'
                          }`}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
              </div>
            </section>

            {/* Layout Expansivo a Todo el Ancho (Full-Width Responsive Grid) */}
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8">
              
              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-brand-900 shadow-xs"
                >
                  <SlidersHorizontal className="w-4 h-4 text-serene-600" />
                  <span>Filtros Avanzados</span>
                  {hasActiveFilters && (
                    <span className="w-2 h-2 rounded-full bg-serene-600" />
                  )}
                </button>

                <span className="text-xs font-bold text-slate-500">
                  {filteredVacancies.length} convocatorias
                </span>
              </div>

              {/* Grid: Sidebar Filters on Left + Wide Vacancies Area on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-start">
                
                {/* SIDEBAR DE FILTROS CORPORATIVOS (Desktop Always Visible, Mobile Collapsible) */}
                <aside className={`lg:col-span-1 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-6 sticky top-24 ${
                  showMobileFilters ? 'block' : 'hidden lg:block'
                }`}>
                  
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-black text-brand-950 flex items-center gap-2">
                      <Filter className="w-4 h-4 text-serene-600" />
                      Filtros Especializados
                    </h3>
                    
                    {hasActiveFilters && (
                      <button
                        onClick={resetFilters}
                        className="text-[11px] font-bold text-serene-700 hover:text-serene-900 flex items-center gap-1"
                        title="Limpiar filtros"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Limpiar
                      </button>
                    )}
                  </div>

                  {/* Sostenimiento Escolar (Pública vs Privada) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Tipo de Escuela
                    </label>
                    <div className="space-y-1.5">
                      {[
                        { id: 'todas', label: 'Todas las Escuelas' },
                        { id: 'publica', label: 'Escuelas Públicas' },
                        { id: 'privada', label: 'Colegios Privados' }
                      ].map((item) => (
                        <label
                          key={item.id}
                          className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                            schoolTypeFilter === item.id
                              ? 'bg-serene-50 text-serene-900 font-bold border border-serene-200'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="schoolType"
                              checked={schoolTypeFilter === item.id}
                              onChange={() => setSchoolTypeFilter(item.id)}
                              className="text-serene-600"
                            />
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Régimen de Contratación (Core User Requirement) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Régimen de Contratación
                    </label>
                    <div className="space-y-1.5">
                      {[
                        { id: 'todos', label: 'Cualquier Régimen' },
                        { id: 'planta_permanente', label: 'Planta Permanente / Base' },
                        { id: 'contrato_determinado', label: 'Por Contrato Temporal' },
                        { id: 'honorarios', label: 'Por Honorarios / Hora' }
                      ].map((item) => (
                        <label
                          key={item.id}
                          className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                            contractFilter === item.id
                              ? 'bg-serene-50 text-serene-900 font-bold border border-serene-200'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="contractType"
                              checked={contractFilter === item.id}
                              onChange={() => setContractFilter(item.id)}
                              className="text-serene-600"
                            />
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Niveles Educativos */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Nivel Académico
                    </label>
                    <select
                      value={levelFilter}
                      onChange={(e) => setLevelFilter(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold focus:outline-hidden text-brand-950"
                    >
                      <option value="todos">Todos los Niveles</option>
                      <option value="inicial_preescolar">Preescolar / Inicial</option>
                      <option value="primaria">Primaria</option>
                      <option value="secundaria">Secundaria</option>
                      <option value="preparatoria_bachillerato">Bachillerato / Preparatoria</option>
                      <option value="universidad_superior">Universidad / Superior</option>
                      <option value="posgrado">Posgrado / Maestría</option>
                      <option value="educacion_especial">Educación Especial</option>
                      <option value="idiomas">Idiomas</option>
                    </select>
                  </div>

                  {/* Estado / Ubicación */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Entidad Federativa
                    </label>
                    <select
                      value={stateFilter}
                      onChange={(e) => setStateFilter(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold focus:outline-hidden text-brand-950"
                    >
                      <option value="todos">Todos los Estados</option>
                      {MEXICAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                </aside>

                {/* CONTENIDO PRINCIPAL: GRID EXPANSIVO DE VACANTES */}
                <div className="lg:col-span-3 xl:col-span-4 space-y-4">
                  
                  {/* Top Header of Results */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-brand-950 text-sm">
                        {filteredVacancies.length} Vacantes Publicadas
                      </span>
                      {hasActiveFilters && (
                        <span className="text-[11px] font-bold text-serene-700 bg-serene-50 px-2.5 py-0.5 rounded-md border border-serene-200">
                          Filtros activos
                        </span>
                      )}
                    </div>

                    <div className="text-slate-500 font-medium">
                      Convocatorias verificadas para docentes en México
                    </div>
                  </div>

                  {/* Wide Vacancies Grid Adaptable a Móviles, Tablets y Pantallas Grandes */}
                  {filteredVacancies.length === 0 ? (
                    <div className="bg-white rounded-3xl p-8 sm:p-16 text-center border border-slate-200/90 shadow-xs">
                      <BookOpen className="w-14 h-14 mx-auto text-slate-300 mb-3" />
                      <h3 className="text-base font-extrabold text-brand-950 mb-1">
                        No se encontraron plazas con los criterios seleccionados
                      </h3>
                      <p className="text-xs text-slate-500 mb-5 max-w-md mx-auto">
                        Intenta flexibilizar el nivel académico, régimen laboral o la entidad federativa.
                      </p>
                      <button
                        onClick={resetFilters}
                        className="px-6 py-2.5 rounded-xl bg-brand-900 text-white font-bold text-xs hover:bg-brand-800 transition-colors"
                      >
                        Ver Todas las Vacantes
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
                      {filteredVacancies.map((vacancy) => (
                        <VacancyCard
                          key={vacancy.id}
                          vacancy={vacancy}
                          onSelect={(v) => setSelectedVacancy(v)}
                          hasApplied={appliedIds.has(vacancy.id)}
                        />
                      ))}
                    </div>
                  )}

                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB: PUBLICAR VACANTE */}
        {currentTab === 'publicar_vacante' && (
          <PublishVacancyForm
            schoolProfile={schoolProfile}
            currentUser={currentUser}
            onRequireAuth={() => {
              setAuthRole('escuela');
              setAuthPromptMessage('Inicia sesión o crea una cuenta institucional para publicar convocatorias.');
              setAuthModalOpen(true);
            }}
            onRequirePlan={() => {
              setSubscriptionPlanType('escuela_10usd');
              setSubscriptionReason('Activa el Plan Institución ($10 USD/mes) para publicar vacantes ilimitadas y acceder a los expedientes.');
              setSubscriptionModalOpen(true);
            }}
            onSubmit={(newVac) => {
              addVacancy(newVac);
              setCurrentTab('vacantes');
            }}
            onCancel={() => setCurrentTab('vacantes')}
          />
        )}

        {/* TAB: PERFIL DOCENTE */}
        {currentTab === 'perfil_docente' && (
          !currentUser ? (
            <div className="w-full max-w-2xl mx-auto py-16 px-4 text-center">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-lg">
                <div className="w-14 h-14 rounded-2xl bg-serene-50 text-serene-700 flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-8 h-8 text-serene-600" />
                </div>
                <h3 className="text-xl font-black text-brand-950 mb-1">Inicia Sesión como Docente</h3>
                <p className="text-xs text-slate-500 mb-5">Para consultar o editar tu expediente digital y cédula profesional, debes ingresar con tu cuenta.</p>
                <button
                  onClick={() => {
                    setAuthRole('docente');
                    setAuthPromptMessage('Inicia sesión para gestionar tu expediente docente.');
                    setAuthModalOpen(true);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-brand-900 text-white font-extrabold text-xs hover:bg-brand-800 transition-colors"
                >
                  Iniciar Sesión / Registrarme
                </button>
              </div>
            </div>
          ) : (
            <TeacherProfileForm
              profile={teacherProfile}
              onSave={(updated) => updateTeacherProfile(updated)}
            />
          )
        )}

        {/* TAB: PANEL ESCUELA (ATS) */}
        {currentTab === 'dashboard_escuela' && (
          !currentUser ? (
            <div className="w-full max-w-2xl mx-auto py-16 px-4 text-center">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-lg">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-8 h-8 text-brand-700" />
                </div>
                <h3 className="text-xl font-black text-brand-950 mb-1">Acceso para Instituciones Educativas</h3>
                <p className="text-xs text-slate-500 mb-5">El panel de aspirantes y citatorio a clase muestra requiere inicio de sesión institucional.</p>
                <button
                  onClick={() => {
                    setAuthRole('escuela');
                    setAuthPromptMessage('Inicia sesión para acceder al panel ATS escolar.');
                    setAuthModalOpen(true);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-brand-900 text-white font-extrabold text-xs hover:bg-brand-800 transition-colors"
                >
                  Iniciar Sesión como Escuela
                </button>
              </div>
            </div>
          ) : (
            <SchoolDashboard
              schoolProfile={schoolProfile}
              vacancies={vacancies}
              applications={applications}
              currentUser={currentUser}
              onPublishClick={() => setCurrentTab('publicar_vacante')}
              onUpdateStatus={(appId, status) => updateApplicationStatus(appId, status)}
            />
          )
        )}

        {/* TAB: MIS POSTULACIONES */}
        {currentTab === 'mis_postulaciones' && (
          !currentUser ? (
            <div className="w-full max-w-2xl mx-auto py-16 px-4 text-center">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-lg">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-8 h-8 text-brand-700" />
                </div>
                <h3 className="text-xl font-black text-brand-950 mb-1">Tus Postulaciones Docentes</h3>
                <p className="text-xs text-slate-500 mb-5">Para revisar el estado de tus postulaciones y respuestas escolares, inicia sesión.</p>
                <button
                  onClick={() => {
                    setAuthRole('docente');
                    setAuthPromptMessage('Inicia sesión para revisar tus postulaciones.');
                    setAuthModalOpen(true);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-brand-900 text-white font-extrabold text-xs hover:bg-brand-800 transition-colors"
                >
                  Iniciar Sesión / Registrarme
                </button>
              </div>
            </div>
          ) : (
            <MyApplicationsView
              applications={applications}
              onBrowseClick={() => setCurrentTab('vacantes')}
            />
          )
        )}

        {/* TAB: NOSOTROS & PLANES INFORMATIVO */}
        {currentTab === 'nosotros' && (
          <AboutPricingView
            onGoToVacancies={() => setCurrentTab('vacantes')}
            onGoToRegisterTeacher={() => {
              switchRole('docente');
              setCurrentTab('perfil_docente');
            }}
            onGoToRegisterSchool={() => {
              switchRole('escuela');
              setCurrentTab('publicar_vacante');
            }}
            currentUser={currentUser}
            onSelectPlan={(plan) => {
              setSubscriptionPlanType(plan);
              setSubscriptionReason(
                plan === 'docente_5usd'
                  ? 'Activa tu Certificación Oficial Docente por $5 USD/mes para validar tu Cédula y postularte a vacantes.'
                  : 'Activa tu Plan Escuela por $10 USD/mes para publicar vacantes ilimitadas y descargar expedientes.'
              );
              setSubscriptionModalOpen(true);
            }}
          />
        )}

      </main>

      {/* Modal Detallado de Vacante y Postulación */}
      <VacancyDetailModal
        vacancy={selectedVacancy}
        onClose={() => setSelectedVacancy(null)}
        onApply={(vac, docs, note) => applyToVacancy(vac, docs, note)}
        hasApplied={selectedVacancy ? appliedIds.has(selectedVacancy.id) : false}
        teacherProfile={teacherProfile}
        currentUser={currentUser}
        onRequireAuth={() => {
          setAuthRole('docente');
          setAuthPromptMessage('Inicia sesión o regístrate como Docente para postularte con tu expediente verificado.');
          setAuthModalOpen(true);
        }}
        onRequirePlan={() => {
          setSubscriptionPlanType('docente_5usd');
          setSubscriptionReason('Certifica tu Plan Docente ($5 USD/mes) para validar tu Cédula y postularte a esta convocatoria.');
          setSubscriptionModalOpen(true);
        }}
      />

      {/* Modal de Autenticación (Login / Registro / Cuentas Demo) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={login}
        onRegister={registerUser}
        initialRole={authRole}
        promptMessage={authPromptMessage}
      />

      {/* Modal de Pago y Certificación de Plan ($5 USD Docente / $10 USD Escuela) */}
      <SubscriptionModal
        isOpen={subscriptionModalOpen}
        onClose={() => setSubscriptionModalOpen(false)}
        planType={subscriptionPlanType}
        currentUser={currentUser}
        onActivate={(plan) => {
          activateSubscription(plan);
        }}
        onNeedLogin={() => {
          setAuthRole(subscriptionPlanType === 'docente_5usd' ? 'docente' : 'escuela');
          setAuthPromptMessage('Inicia sesión para vincular tu certificación.');
          setAuthModalOpen(true);
        }}
        contextReason={subscriptionReason}
      />

      {/* Footer Corporativo Full-Width */}
      <footer className="w-full bg-white border-t border-slate-200/90 py-10 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-xs text-slate-500 mt-12">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/images/docentia-logo.png"
              alt="DOCENTIA Red Educativa"
              className="h-10 w-auto object-contain"
            />
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-600 font-medium text-xs">
              <span>Escuelas Públicas & Privadas</span>
              <span>·</span>
              <span>Todos los Niveles Educativos</span>
              <span>·</span>
              <span className="font-bold text-serene-700">App Oficial Adaptable para Celulares y Tablets</span>
            </div>

            {/* Enlaces Legales y de Cumplimiento Oficial */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[11px] font-semibold text-slate-500 pt-1">
              <button
                type="button"
                onClick={() => { setLegalModalTab('terminos'); setLegalModalOpen(true); }}
                className="hover:text-brand-900 hover:underline transition-colors"
              >
                Términos y Condiciones
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => { setLegalModalTab('privacidad'); setLegalModalOpen(true); }}
                className="hover:text-brand-900 hover:underline transition-colors"
              >
                Aviso de Privacidad (LFPDPPP)
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => { setLegalModalTab('manejo_datos'); setLegalModalOpen(true); }}
                className="hover:text-brand-900 hover:underline transition-colors"
              >
                Manejo Seguro de Expedientes
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => { setLegalModalTab('seguridad'); setLegalModalOpen(true); }}
                className="hover:text-brand-900 hover:underline transition-colors"
              >
                Seguridad & Privacidad Institucional
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center md:text-right">
            <p>© {new Date().getFullYear()} DOCENTIA. Todos los derechos reservados.</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Plataforma Certificada de Contratación & Empleo Docente</p>
          </div>
        </div>
      </footer>

      {/* Modal Institucional de Políticas Legales */}
      <LegalPoliciesModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalModalTab}
      />

    </div>
  );
}
