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
import { useDocentiaStore } from '@/lib/store';
import { JobVacancy, EducationalLevel, ContractType, SchoolType } from '@/types';
import { MEXICAN_STATES } from '@/lib/mockData';

export default function HomePage() {
  const {
    vacancies,
    teacherProfile,
    schoolProfile,
    applications,
    currentRole,
    isLoaded,
    addVacancy,
    updateTeacherProfile,
    applyToVacancy,
    updateApplicationStatus,
    switchRole
  } = useDocentiaStore();

  const [currentTab, setCurrentTab] = useState<string>('vacantes');
  const [selectedVacancy, setSelectedVacancy] = useState<JobVacancy | null>(null);

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
      />

      <main className="flex-1 w-full">
        
        {/* TABS: VACANTES / DOCENTE SOS */}
        {(currentTab === 'vacantes' || currentTab === 'docente_sos') && (
          <div className="w-full">
            
            {/* Hero Section Corporativo y Pacífico - Edge to Edge */}
            <section className="w-full bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 text-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative overflow-hidden border-b border-brand-800/60">
              
              {/* Subtle background glow effect (psychological calm) */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-serene-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-10 w-[400px] h-[200px] bg-prestige-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="w-full relative z-10 text-center">
                
                {/* Badge Institucional */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-serene-300 text-xs font-extrabold mb-4 shadow-xs backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-prestige-400" />
                  <span>Plataforma Oficial de Vacantes para Docentes y Escuelas</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-5xl mx-auto leading-tight text-white">
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

                <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto mt-4 font-normal leading-relaxed">
                  {currentTab === 'docente_sos'
                    ? 'Bolsa urgente de suplencias para responder a incapacidades escolares en menos de 48 horas en escuelas públicas y privadas.'
                    : 'Vinculamos el talento docente con colegios e instituciones de todos los niveles educativos con máxima transparencia en salarios, tipo de contratación y requisitos documentales.'}
                </p>

                {/* Barra de Búsqueda Full Width Adaptativa */}
                <div className="mt-8 max-w-4xl mx-auto bg-white rounded-2xl p-2.5 shadow-2xl flex flex-col sm:flex-row items-center gap-2 border border-slate-200/90">
                  <div className="flex items-center gap-2.5 px-3 py-2 flex-1 w-full text-slate-800">
                    <Search className="w-5 h-5 text-serene-600 shrink-0" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Materia, asignatura, título de vacante o escuela..."
                      className="w-full text-sm font-semibold focus:outline-hidden text-brand-950 placeholder:text-slate-400 placeholder:font-normal"
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
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-950 via-brand-900 to-serene-700 hover:from-brand-900 hover:to-serene-600 text-white font-black text-xs shadow-md transition-all shrink-0"
                  >
                    Buscar Vacantes
                  </button>
                </div>

                {/* Chips de Nivel Rápido */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
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

                  {/* Wide Vacancies Grid */}
                  {filteredVacancies.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-slate-200/90 shadow-xs">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-4 sm:gap-5">
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
            onSubmit={(newVac) => {
              addVacancy(newVac);
              setCurrentTab('vacantes');
            }}
            onCancel={() => setCurrentTab('vacantes')}
          />
        )}

        {/* TAB: PERFIL DOCENTE */}
        {currentTab === 'perfil_docente' && (
          <TeacherProfileForm
            profile={teacherProfile}
            onSave={(updated) => updateTeacherProfile(updated)}
          />
        )}

        {/* TAB: PANEL ESCUELA (ATS) */}
        {currentTab === 'dashboard_escuela' && (
          <SchoolDashboard
            schoolProfile={schoolProfile}
            vacancies={vacancies}
            applications={applications}
            onPublishClick={() => setCurrentTab('publicar_vacante')}
            onUpdateStatus={(appId, status) => updateApplicationStatus(appId, status)}
          />
        )}

        {/* TAB: MIS POSTULACIONES */}
        {currentTab === 'mis_postulaciones' && (
          <MyApplicationsView
            applications={applications}
            onBrowseClick={() => setCurrentTab('vacantes')}
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
      />

      {/* Footer Corporativo Full-Width */}
      <footer className="w-full bg-white border-t border-slate-200/90 py-10 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-xs text-slate-500 mt-12">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-900 text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5 text-serene-300" />
            </div>
            <div>
              <span className="font-black text-brand-950 text-sm tracking-tight">DOCENTIA</span>
              <p className="text-[11px] text-slate-400">Red Institucional de Contratación & Empleo Educativo</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500 font-medium">
            <span>Escuelas Públicas & Privadas</span>
            <span>·</span>
            <span>Todos los Niveles Educativos</span>
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
