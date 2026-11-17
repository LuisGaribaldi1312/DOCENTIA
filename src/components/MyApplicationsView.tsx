'use client';

import React from 'react';
import { 
  FileText, 
  Building2, 
  Calendar, 
  FileCheck2, 
  Clock, 
  CheckCircle2, 
  Briefcase,
  AlertCircle
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
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-white/10 text-blue-200">
            <FileText className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-300">
            Seguimiento de Postulaciones Docentes
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          Mis Postulaciones a Escuelas
        </h2>
        <p className="text-sm text-blue-100/90 mt-1">
          Consulta en tiempo real el estado de tus candidaturas, convocatorias a clase muestra o entrevistas.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs">
          <Briefcase className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">
            Aún no te has postulado a ninguna vacante
          </h3>
          <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
            Explora las plazas disponibles para escuelas públicas y privadas y postula tu expediente en 1 solo clic.
          </p>
          <button
            onClick={onBrowseClick}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-sm"
          >
            Explorar Vacantes Docentes
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider inline-block mb-1.5 ${
                  app.status === 'recibida' ? 'bg-slate-100 text-slate-700' :
                  app.status === 'en_revision' ? 'bg-blue-100 text-blue-800' :
                  app.status === 'clase_muestra' ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse' :
                  app.status === 'entrevista' ? 'bg-purple-100 text-purple-800' :
                  app.status === 'aceptada' ? 'bg-emerald-100 text-emerald-800 font-black' :
                  'bg-red-100 text-red-800'
                }`}>
                  {app.status === 'clase_muestra' ? '🎓 ¡Invitado a Clase Muestra!' :
                   app.status === 'recibida' ? 'Postulación Recibida' :
                   app.status === 'en_revision' ? 'En Revisión por Dirección' :
                   app.status === 'entrevista' ? 'Entrevista Agendada' :
                   app.status === 'aceptada' ? 'Aceptado / Contratado' : 'Descartado'}
                </span>

                <h3 className="text-base font-bold text-slate-900">{app.vacancyTitle}</h3>
                
                <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    {app.schoolName}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    Postulado el {app.appliedDate}
                  </span>
                  <span className="flex items-center gap-1 text-blue-700 font-medium">
                    <FileCheck2 className="w-3.5 h-3.5" />
                    {app.attachedDocuments.length} documentos adjuntados
                  </span>
                </div>
              </div>

              <div className="w-full sm:w-auto text-right">
                <span className="text-xs text-slate-400 block sm:inline">
                  Expediente digital verificado
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
