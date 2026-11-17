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
  ArrowRight,
  ShieldCheck,
  BookOpen
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

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('todos');
  const [contractFilter, setContractFilter] = useState<string>('todos');
  const [schoolTypeFilter, setSchoolTypeFilter] = useState<string>('todas');
  const [stateFilter, setStateFilter] = useState<string>('todos');

  // Filtered Vacancies Logic
  const filteredVacancies = useMemo(() => {
    return vacancies.filter((v) => {
      // Tab SOS Filter
      if (currentTab === 'docente_sos' && !v.isUrgentSubstitute) {
        return false;
      }

      // Keyword Search (title, school, subjects, city)
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

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-700">Cargando DOCENTIA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      
      {/* PWA Install Banner */}
      <PwaInstallBanner />

      {/* Main Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentRole={currentRole}
        switchRole={switchRole}
      />

      <main className="flex-1">
        
        {/* TAB 1 & 2: BUSCADOR DE VACANTES O DOCENTE SOS */}
        {(currentTab === 'vacantes' || currentTab === 'docente_sos') && (
          <div>
            
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-blue-900 via-indigo-900 to-slate-900 text-white py-10 sm:py-14 px-4 sm:px-6 relative overflow-hidden">
              <div className="max-w-7xl mx-auto relative z-10 text-center">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold mb-4 shadow-xs">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Plataforma Oficial de Vacantes para Maestros</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
                  {currentTab === 'docente_sos' ? (
                    <>
                      Interinatos y Reemplazos <span className="text-amber-400">Docente SOS</span>
                    </>
                  ) : (
                    <>
                      El Portal de Empleo Hecho Exclusivamente para <span className="text-blue-400">Maestros</span>
                    </>
                  )}
                </h1>

                <p className="text-sm sm:text-base text-blue-100/90 max-w-2xl mx-auto mt-3 font-normal">
                  {currentTab === 'docente_sos'
                    ? 'Vacantes escolares urgentes para cubrir suplencias, incapacidades e interinatos inmediatos en menos de 48 horas.'
                    : 'Encuentra plazas en escuelas públicas y privadas de todos los niveles educativos con salarios claros, tipo de contratación y requisitos documentales transparentes.'}
                </p>

                {/* Search Bar Bar */}
                <div className="mt-8 max-w-3xl mx-auto bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row items-center gap-2 border border-slate-200">
                  <div className="flex items-center gap-2 px-3 py-2 flex-1 w-full text-slate-800">
                    <Search className="w-5 h-5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Materia, asignatura, título de vacante o escuela..."
                      className="w-full text-sm font-medium focus:outline-hidden text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div className="hidden sm:block w-px h-8 bg-slate-200" />

                  <div className="flex items-center gap-2 px-3 py-2 w-full sm:w-56 text-slate-800">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <select
                      value={stateFilter}
                      onChange={(e) => setStateFilter(e.target.value)}
                      className="w-full text-xs font-semibold text-slate-700 bg-transparent focus:outline-hidden cursor-pointer"
                    >
                      <option value="todos">Todos los Estados</option>
                      {MEXICAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => {}}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    Buscar Vacantes
                  </button>
                </div>

                {/* Level Quick Chips */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mt-5">
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
                      className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                        levelFilter === chip.id
                          ? 'bg-white text-blue-900 shadow-md scale-105'
                          : 'bg-white/10 text-white/90 hover:bg-white/20'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

              </div>
            </div>

            {/* Filter Bar and Results Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              
              {/* Secondary Filters Row */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
                
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-bold text-slate-700 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5 text-blue-600" />
                    Filtrar por:
                  </span>

                  {/* Sostenimiento */}
                  <select
                    value={schoolTypeFilter}
                    onChange={(e) => setSchoolTypeFilter(e.target.value)}
                    className="p-2 rounded-lg border border-slate-200 bg-slate-50 font-medium focus:outline-hidden"
                  >
                    <option value="todas">Todas las Escuelas</option>
                    <option value="publica">Escuelas Públicas</option>
                    <option value="privada">Escuelas Privadas</option>
                  </select>

                  {/* Régimen de Contratación (Core User Requirement) */}
                  <select
                    value={contractFilter}
                    onChange={(e) => setContractFilter(e.target.value)}
                    className="p-2 rounded-lg border border-slate-200 bg-slate-50 font-medium focus:outline-hidden"
                  >
                    <option value="todos">Todos los Regímenes</option>
                    <option value="planta_permanente">Planta Permanente / Base</option>
                    <option value="contrato_determinado">Por Contrato Temporal</option>
                    <option value="honorarios">Por Honorarios / Hora Clase</option>
                  </select>

                  {(levelFilter !== 'todos' || contractFilter !== 'todos' || schoolTypeFilter !== 'todas' || stateFilter !== 'todos' || searchTerm) && (
                    <button
                      onClick={() => {
                        setLevelFilter('todos');
                        setContractFilter('todos');
                        setSchoolTypeFilter('todas');
                        setStateFilter('todos');
                        setSearchTerm('');
                      }}
                      className="text-blue-600 hover:text-blue-800 font-bold underline"
                    >
                      Limpiar Filtros
                    </button>
                  )}
                </div>

                <div className="text-slate-500 font-semibold">
                  Mostrando <span className="font-black text-slate-900">{filteredVacancies.length}</span> vacantes docentes
                </div>
              </div>

              {/* Vacancies Grid */}
              {filteredVacancies.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs">
                  <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <h3 className="text-base font-bold text-slate-800 mb-1">
                    No se encontraron vacantes con los filtros seleccionados
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                    Prueba cambiando el nivel educativo, tipo de contratación o la ubicación de búsqueda.
                  </p>
                  <button
                    onClick={() => {
                      setLevelFilter('todos');
                      setContractFilter('todos');
                      setSchoolTypeFilter('todas');
                      setStateFilter('todos');
                      setSearchTerm('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
                  >
                    Ver Todas las Vacantes
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
        )}

        {/* TAB 3: PUBLICAR VACANTE (ESCUELAS) */}
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

        {/* TAB 4: PERFIL DEL PROFESOR / EXPEDIENTE DIGITAL */}
        {currentTab === 'perfil_docente' && (
          <TeacherProfileForm
            profile={teacherProfile}
            onSave={(updated) => updateTeacherProfile(updated)}
          />
        )}

        {/* TAB 5: PANEL ATS DE LA ESCUELA */}
        {currentTab === 'dashboard_escuela' && (
          <SchoolDashboard
            schoolProfile={schoolProfile}
            vacancies={vacancies}
            applications={applications}
            onPublishClick={() => setCurrentTab('publicar_vacante')}
            onUpdateStatus={(appId, status) => updateApplicationStatus(appId, status)}
          />
        )}

        {/* TAB 6: MIS POSTULACIONES DOCENTES */}
        {currentTab === 'mis_postulaciones' && (
          <MyApplicationsView
            applications={applications}
            onBrowseClick={() => setCurrentTab('vacantes')}
          />
        )}

      </main>

      {/* Vacancy Detail & Apply Modal */}
      <VacancyDetailModal
        vacancy={selectedVacancy}
        onClose={() => setSelectedVacancy(null)}
        onApply={(vac, docs, note) => applyToVacancy(vac, docs, note)}
        hasApplied={selectedVacancy ? appliedIds.has(selectedVacancy.id) : false}
        teacherProfile={teacherProfile}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span className="font-black text-slate-900 text-sm">DOCENTIA</span>
            <span>· Portal y PWA Especializada para Maestros y Escuelas</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Para Escuelas Públicas & Privadas</span>
            <span>·</span>
            <span>Todos los Niveles Educativos</span>
            <span>·</span>
            <span className="font-bold text-blue-600">PWA Instalable Android & iOS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
