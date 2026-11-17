'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  PlusCircle, 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  FileCheck2, 
  CheckCircle2, 
  Clock, 
  Eye, 
  X,
  FileText,
  Search,
  Filter,
  CheckCircle,
  Briefcase
} from 'lucide-react';
import { JobVacancy, Application, SchoolProfile } from '@/types';

interface SchoolDashboardProps {
  schoolProfile: SchoolProfile;
  vacancies: JobVacancy[];
  applications: Application[];
  onPublishClick: () => void;
  onUpdateStatus: (appId: string, status: Application['status']) => void;
}

export const SchoolDashboard: React.FC<SchoolDashboardProps> = ({
  schoolProfile,
  vacancies,
  applications,
  onPublishClick,
  onUpdateStatus
}) => {
  const [selectedApplicant, setSelectedApplicant] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  const filteredApplications = applications.filter((app) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchesName = app.teacherName.toLowerCase().includes(q);
      const matchesTitle = app.vacancyTitle.toLowerCase().includes(q);
      const matchesEmail = app.teacherEmail.toLowerCase().includes(q);
      if (!matchesName && !matchesTitle && !matchesEmail) return false;
    }
    if (statusFilter !== 'todos' && app.status !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 space-y-6">
      
      {/* School Executive Header Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-serene-950 text-white p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-brand-800/60">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-white/10 text-serene-300">
              <Building2 className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-serene-300">
              Panel ATS Institucional · Gestión del Talento Docente
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            {schoolProfile.name}
          </h2>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-300">
            <span className="bg-white/10 px-3 py-1 rounded-md font-semibold">
              Escuela {schoolProfile.type === 'publica' ? 'Pública' : 'Privada Particular'}
            </span>
            {schoolProfile.cct && (
              <span className="bg-white/10 px-3 py-1 rounded-md font-mono font-semibold">
                CCT: {schoolProfile.cct}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-serene-400" />
              {schoolProfile.city}, {schoolProfile.state}
            </span>
          </div>
        </div>

        <button
          onClick={onPublishClick}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-serene-600 to-serene-700 hover:from-serene-500 hover:to-serene-600 text-white font-black text-xs shadow-lg shadow-serene-900/30 transition-all hover:scale-[1.02] shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Publicar Nueva Vacante
        </button>
      </div>

      {/* KPI Stats Grid - Full Width Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vacantes Activas</span>
          <p className="text-3xl sm:text-4xl font-black text-brand-950 mt-1">{vacancies.length}</p>
          <p className="text-[11px] text-serene-700 font-semibold mt-1">Visibles en la PWA y portal</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Candidatos Registrados</span>
          <p className="text-3xl sm:text-4xl font-black text-serene-800 mt-1">{applications.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">Con expediente docente adjunto</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Clase Muestra Agendada</span>
          <p className="text-3xl sm:text-4xl font-black text-prestige-600 mt-1">
            {applications.filter(a => a.status === 'clase_muestra').length}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">En evaluación pedagógica</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Docentes Contratados</span>
          <p className="text-3xl sm:text-4xl font-black text-emerald-700 mt-1">
            {applications.filter(a => a.status === 'aceptada').length}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Plazas cubiertas exitosamente</p>
        </div>
      </div>

      {/* ATS Pipeline: Postulaciones y Expedientes */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        
        {/* Table Controls Bar */}
        <div className="p-5 sm:p-7 border-b border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-brand-950 flex items-center gap-2">
              <Users className="w-5 h-5 text-serene-600" />
              Bandeja de Selección Docente & Expedientes
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Revisa perfiles, cédulas profesionales y programa clases muestra con un clic.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por maestro o plaza..."
                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white font-medium focus:outline-hidden cursor-pointer"
            >
              <option value="todos">Todos los Estatus</option>
              <option value="recibida">Recibida</option>
              <option value="en_revision">En Revisión</option>
              <option value="clase_muestra">Clase Muestra</option>
              <option value="entrevista">Entrevista</option>
              <option value="aceptada">Aceptada</option>
              <option value="rechazada">Descartada</option>
            </select>
          </div>
        </div>

        {filteredApplications.length === 0 ? (
          <div className="p-16 text-center text-slate-500">
            <GraduationCap className="w-14 h-14 mx-auto text-slate-300 mb-3" />
            <p className="font-extrabold text-brand-900 text-sm">No hay postulaciones registradas en este filtro.</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Cuando los profesores apliquen a tus convocatorias, sus expedientes se ordenarán automáticamente aquí.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6">Maestro(a) Candidato</th>
                  <th className="py-4 px-6">Vacante Solicitada</th>
                  <th className="py-4 px-6">Fecha Postulación</th>
                  <th className="py-4 px-6">Expediente Digital</th>
                  <th className="py-4 px-6">Estatus en el ATS</th>
                  <th className="py-4 px-6 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-extrabold text-brand-950 text-sm">{app.teacherName}</div>
                      <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-3 mt-1">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {app.teacherEmail}</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-emerald-600" /> {app.teacherPhone}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-bold text-brand-900">
                      {app.vacancyTitle}
                    </td>

                    <td className="py-4 px-6 text-slate-500 whitespace-nowrap">
                      {app.appliedDate}
                    </td>

                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-serene-50 text-serene-800 border border-serene-200 rounded-md font-bold text-[11px] inline-flex items-center gap-1.5">
                        <FileCheck2 className="w-3.5 h-3.5 text-serene-600" />
                        {app.attachedDocuments.length} documentos
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <select
                        value={app.status}
                        onChange={(e) => onUpdateStatus(app.id, e.target.value as any)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-hidden cursor-pointer ${
                          app.status === 'recibida' ? 'bg-slate-100 text-slate-700 border-slate-200' :
                          app.status === 'en_revision' ? 'bg-brand-50 text-brand-900 border-brand-200' :
                          app.status === 'clase_muestra' ? 'bg-prestige-100 text-prestige-900 border-prestige-300 font-extrabold' :
                          app.status === 'entrevista' ? 'bg-purple-50 text-purple-900 border-purple-200' :
                          app.status === 'aceptada' ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-extrabold' :
                          'bg-red-50 text-red-800 border-red-200'
                        }`}
                      >
                        <option value="recibida">Recibida</option>
                        <option value="en_revision">En Revisión</option>
                        <option value="clase_muestra">Clase Muestra</option>
                        <option value="entrevista">Entrevista</option>
                        <option value="aceptada">Aceptada / Contratado</option>
                        <option value="rechazada">Descartada</option>
                      </select>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedApplicant(app)}
                        className="px-3.5 py-1.5 rounded-xl bg-brand-900 text-white font-bold text-xs hover:bg-brand-800 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-serene-300" />
                        Ver Expediente
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Detalle de Candidato */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-extrabold text-serene-700 uppercase tracking-widest">
                  Expediente del Docente
                </span>
                <h3 className="text-xl font-black text-brand-950 mt-0.5">{selectedApplicant.teacherName}</h3>
                <p className="text-xs text-slate-500">Postulado a: <strong>{selectedApplicant.vacancyTitle}</strong></p>
              </div>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <p className="font-extrabold text-brand-950">Información de Contacto Verificada:</p>
                <p className="flex items-center gap-2 text-slate-700"><Mail className="w-3.5 h-3.5 text-brand-700" /> {selectedApplicant.teacherEmail}</p>
                <p className="flex items-center gap-2 text-slate-700"><Phone className="w-3.5 h-3.5 text-emerald-600" /> {selectedApplicant.teacherPhone}</p>
              </div>

              {selectedApplicant.coverNote && (
                <div className="p-3.5 rounded-2xl bg-serene-50/60 border border-serene-100">
                  <p className="font-bold text-serene-950 mb-1">Carta de Presentación del Maestro:</p>
                  <p className="text-slate-700 italic">"{selectedApplicant.coverNote}"</p>
                </div>
              )}

              <div>
                <p className="font-bold text-brand-950 mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-serene-600" />
                  Documentos Adjuntados en esta Postulación:
                </p>
                <div className="space-y-1.5">
                  {selectedApplicant.attachedDocuments.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-semibold text-slate-800">{doc}</span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Cotejado
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  onUpdateStatus(selectedApplicant.id, 'clase_muestra');
                  setSelectedApplicant(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-prestige-500 hover:bg-prestige-600 text-white font-bold text-xs shadow-xs"
              >
                🎓 Agendar Clase Muestra
              </button>

              <button
                onClick={() => setSelectedApplicant(null)}
                className="px-5 py-2.5 rounded-xl bg-brand-900 text-white font-bold text-xs hover:bg-brand-800 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
