'use client';

import React from 'react';
import { 
  FileText, 
  Building2, 
  Calendar, 
  FileCheck2, 
  Briefcase,
  BadgeCheck,
  ChevronRight
} from 'lucide-react';
import { Application } from '@/types';

interface MyApplicationsViewProps {
  applications: Application[];
  onBrowseClick: () => void;
}

export const MyApplicationsView: React.FC<MyApplicationsViewProps> = ({
  applications,
  onBrowseClick
}) => {
  return (
    <div className="w-full px-3.5 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 sm:py-8 space-y-5 sm:space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-serene-900 text-white p-5 sm:p-10 rounded-3xl shadow-xl border border-brand-800/60">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-white/10 text-serene-300">
            <FileText className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase font-extrabold tracking-widest text-serene-300">
            Seguimiento de Postulaciones Docentes
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
          Mis Postulaciones a Escuelas
        </h2>
        <p className="text-sm text-slate-300/90 mt-2">
          Consulta en tiempo real el estado de tus candidaturas, convocatorias a clase muestra o entrevistas escolares.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-16 text-center shadow-xs">
          <Briefcase className="w-14 h-14 mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-extrabold text-brand-950 mb-1">
            Aún no te has postulado a ninguna vacante
          </h3>
          <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
            Explora las plazas disponibles para escuelas públicas y privadas y postula tu expediente digital en 1 solo clic.
          </p>
          <button
            onClick={onBrowseClick}
            className="px-6 py-3 rounded-xl bg-brand-900 text-white font-extrabold text-xs hover:bg-brand-800 transition-colors shadow-sm"
          >
            Explorar Vacantes Docentes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between hover:border-serene-400 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block ${
                    app.status === 'recibida' ? 'bg-slate-100 text-slate-700' :
                    app.status === 'en_revision' ? 'bg-brand-50 text-brand-900 border border-brand-200' :
                    app.status === 'clase_muestra' ? 'bg-prestige-100 text-prestige-900 border border-prestige-300 animate-pulse font-black' :
                    app.status === 'entrevista' ? 'bg-purple-50 text-purple-900 border border-purple-200' :
                    app.status === 'aceptada' ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-black' :
                    'bg-red-50 text-red-800'
                  }`}>
                    {app.status === 'clase_muestra' ? '🎓 ¡Invitado a Clase Muestra!' :
                     app.status === 'recibida' ? 'Postulación Recibida' :
                     app.status === 'en_revision' ? 'En Revisión por Dirección' :
                     app.status === 'entrevista' ? 'Entrevista Agendada' :
                     app.status === 'aceptada' ? 'Aceptado / Contratado' : 'Descartado'}
                  </span>

                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {app.appliedDate}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-brand-950 mb-1.5">{app.vacancyTitle}</h3>
                
                <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-3">
                  <Building2 className="w-4 h-4 text-serene-600" />
                  {app.schoolName}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium text-serene-800">
                  <FileCheck2 className="w-4 h-4 text-serene-600" />
                  {app.attachedDocuments.length} documentos adjuntados
                </span>

                <span className="text-[11px] font-bold text-slate-400">
                  Expediente cotejado
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
