'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Briefcase, 
  PlusCircle, 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  FileCheck2, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Calendar, 
  X,
  FileText
} from 'lucide-react';
import { JobVacancy, Application, SchoolProfile } from '@/types';
import { LEVEL_LABELS, CONTRACT_LABELS } from './VacancyCard';

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

  // Filter vacancies of this school
  const myVacancies = vacancies.filter(v => v.schoolName === schoolProfile.name || true);

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      
      {/* School Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-white/10 text-blue-200">
              <Building2 className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-300">
              Panel Institucional de Reclutamiento
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {schoolProfile.name}
          </h2>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-blue-100">
            <span className="bg-white/10 px-2.5 py-1 rounded-md font-semibold">
              Escuela {schoolProfile.type === 'publica' ? 'Pública' : 'Privada Particular'}
            </span>
            {schoolProfile.cct && (
              <span className="bg-white/10 px-2.5 py-1 rounded-md font-semibold">
                CCT: {schoolProfile.cct}
              </span>
            )}
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {schoolProfile.city}, {schoolProfile.state}
            </span>
          </div>
        </div>

        <button
          onClick={onPublishClick}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          Publicar Vacante Docente
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vacantes Activas</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{myVacancies.length}</p>
          <p className="text-[11px] text-blue-600 font-semibold mt-1">Visibles en la PWA de Docentia</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Docentes Postulados</span>
          <p className="text-3xl font-black text-indigo-700 mt-1">{applications.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">Con expediente y documentos adjuntos</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Etapa de Clase Muestra</span>
          <p className="text-3xl font-black text-amber-600 mt-1">
            {applications.filter(a => a.status === 'clase_muestra').length}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Candidatos en prueba pedagógica</p>
        </div>
      </div>

      {/* Postulaciones Recibidas (ATS Escolar) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Bandeja de Candidatos & Postulaciones Docentes
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Revisa los expedientes de los profesores que han aplicado a tus vacantes.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
            {applications.length} registros
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <GraduationCap className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-slate-700">No hay postulaciones nuevas aún.</p>
            <p className="text-xs text-slate-500 mt-1">
              Las postulaciones de los maestros que apliquen a tus vacantes aparecerán en esta bandeja.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Maestro(a) Candidato</th>
                  <th className="py-3.5 px-4">Vacante Solicitada</th>
                  <th className="py-3.5 px-4">Fecha</th>
                  <th className="py-3.5 px-4">Documentos Adjuntos</th>
                  <th className="py-3.5 px-4">Estatus de Selección</th>
                  <th className="py-3.5 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 text-sm">{app.teacherName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {app.teacherEmail}</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {app.teacherPhone}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-semibold text-blue-900">
                      {app.vacancyTitle}
                    </td>

                    <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                      {app.appliedDate}
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md font-bold text-[11px] inline-flex items-center gap-1">
                        <FileCheck2 className="w-3 h-3" />
                        {app.attachedDocuments.length} documentos
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <select
                        value={app.status}
                        onChange={(e) => onUpdateStatus(app.id, e.target.value as any)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-hidden ${
                          app.status === 'recibida' ? 'bg-slate-100 text-slate-700 border-slate-200' :
                          app.status === 'en_revision' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          app.status === 'clase_muestra' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                          app.status === 'entrevista' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                          app.status === 'aceptada' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                          'bg-red-100 text-red-800 border-red-200'
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

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setSelectedApplicant(app)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Expediente del Postulante
                </span>
                <h3 className="text-xl font-black text-slate-900">{selectedApplicant.teacherName}</h3>
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
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <p className="font-bold text-slate-700">Contacto Directo:</p>
                <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-blue-600" /> {selectedApplicant.teacherEmail}</p>
                <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-emerald-600" /> {selectedApplicant.teacherPhone}</p>
              </div>

              {selectedApplicant.coverNote && (
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                  <p className="font-bold text-blue-950 mb-1">Nota del Docente:</p>
                  <p className="text-slate-700 italic">"{selectedApplicant.coverNote}"</p>
                </div>
              )}

              <div>
                <p className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Documentos Adjuntos en esta Postulación:
                </p>
                <div className="space-y-1.5">
                  {selectedApplicant.attachedDocuments.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-semibold text-slate-800">{doc}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Verificado
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  onUpdateStatus(selectedApplicant.id, 'clase_muestra');
                  setSelectedApplicant(null);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs"
              >
                Agendar Clase Muestra
              </button>

              <button
                onClick={() => setSelectedApplicant(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
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
