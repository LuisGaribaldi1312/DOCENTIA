'use client';

import React from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar, 
  FileCheck2, 
  Flame, 
  GraduationCap, 
  BadgeCheck, 
  Users,
  Briefcase
} from 'lucide-react';
import { JobVacancy, EducationalLevel, ContractType } from '@/types';

interface VacancyCardProps {
  vacancy: JobVacancy;
  onSelect: (vacancy: JobVacancy) => void;
  hasApplied?: boolean;
}

export const LEVEL_LABELS: Record<EducationalLevel, { label: string; color: string }> = {
  inicial_preescolar: { label: 'Inicial / Preescolar', color: 'bg-pink-100 text-pink-800 border-pink-200' },
  primaria: { label: 'Primaria', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  secundaria: { label: 'Secundaria', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  preparatoria_bachillerato: { label: 'Bachillerato / Prepa', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  universidad_superior: { label: 'Universidad / Superior', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  posgrado: { label: 'Posgrado / Maestría', color: 'bg-violet-100 text-violet-800 border-violet-200' },
  educacion_especial: { label: 'Educación Especial', color: 'bg-teal-100 text-teal-800 border-teal-200' },
  idiomas: { label: 'Idiomas & Extensión', color: 'bg-amber-100 text-amber-800 border-amber-200' }
};

export const CONTRACT_LABELS: Record<ContractType, { label: string; badge: string }> = {
  planta_permanente: { label: 'Planta Permanente / Base', badge: 'bg-emerald-50 text-emerald-700 border-emerald-300' },
  contrato_determinado: { label: 'Por Contrato Temporal', badge: 'bg-blue-50 text-blue-700 border-blue-300' },
  honorarios: { label: 'Por Honorarios / Hora Clase', badge: 'bg-amber-50 text-amber-700 border-amber-300' }
};

export const VacancyCard: React.FC<VacancyCardProps> = ({
  vacancy,
  onSelect,
  hasApplied
}) => {
  const levelInfo = LEVEL_LABELS[vacancy.educationalLevel] || { label: 'Educación', color: 'bg-slate-100 text-slate-800' };
  const contractInfo = CONTRACT_LABELS[vacancy.contractType] || { label: 'Contrato', badge: 'bg-slate-50 text-slate-700' };

  return (
    <div 
      onClick={() => onSelect(vacancy)}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all p-5 sm:p-6 cursor-pointer relative flex flex-col justify-between"
    >
      {/* Top badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Level badge */}
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${levelInfo.color}`}>
            {levelInfo.label}
          </span>

          {/* School type badge */}
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
            vacancy.schoolType === 'publica'
              ? 'bg-slate-100 text-slate-700 border-slate-200'
              : 'bg-sky-50 text-sky-700 border-sky-200'
          }`}>
            Escuela {vacancy.schoolType === 'publica' ? 'Pública' : 'Privada'}
          </span>

          {/* Urgent SOS badge */}
          {vacancy.isUrgentSubstitute && (
            <span className="flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-amber-500 text-white shadow-xs animate-pulse">
              <Flame className="w-3 h-3" />
              Interinato Urgente SOS
            </span>
          )}
        </div>

        {hasApplied && (
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
            <BadgeCheck className="w-3.5 h-3.5" />
            Ya te postulaste
          </span>
        )}
      </div>

      {/* Main Title & School */}
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {vacancy.title}
        </h3>
        
        <div className="flex items-center gap-2 mt-1.5 text-sm text-slate-600">
          <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-800">{vacancy.schoolName}</span>
          {vacancy.cct && (
            <span className="text-xs text-slate-400 hidden sm:inline">
              (CCT: {vacancy.cct})
            </span>
          )}
        </div>
      </div>

      {/* Subjects Tags */}
      {vacancy.subjects && vacancy.subjects.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {vacancy.subjects.map((sub, i) => (
            <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
              {sub}
            </span>
          ))}
        </div>
      )}

      {/* Description Snippet */}
      <p className="text-sm text-slate-600 line-clamp-2 mb-4">
        {vacancy.description}
      </p>

      {/* Grid of Key Educational Details */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3 border-t border-slate-100 text-xs text-slate-600 mb-4">
        
        {/* Salario */}
        <div className="flex items-center gap-1.5 font-bold text-emerald-700 bg-emerald-50/70 p-2 rounded-lg">
          <DollarSign className="w-4 h-4 shrink-0 text-emerald-600" />
          <span className="truncate">
            ${vacancy.salaryMin.toLocaleString('es-MX')}
            {vacancy.salaryMax ? ` - $${vacancy.salaryMax.toLocaleString('es-MX')}` : ''}
            <span className="font-normal text-[10px] text-slate-500"> /{vacancy.salaryPeriod}</span>
          </span>
        </div>

        {/* Tipo de Contrato */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg">
          <Briefcase className="w-4 h-4 shrink-0 text-slate-500" />
          <span className="truncate font-medium">{contractInfo.label}</span>
        </div>

        {/* Duración */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg col-span-2 sm:col-span-1">
          <Calendar className="w-4 h-4 shrink-0 text-slate-500" />
          <span className="truncate" title={vacancy.contractDuration}>{vacancy.contractDuration}</span>
        </div>

        {/* Modalidad & Turno */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg">
          <Clock className="w-4 h-4 shrink-0 text-slate-500" />
          <span className="capitalize">{vacancy.modality} · {vacancy.shift}</span>
        </div>

        {/* Ubicación */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg col-span-2">
          <MapPin className="w-4 h-4 shrink-0 text-slate-500" />
          <span className="truncate">{vacancy.location.city}, {vacancy.location.state}</span>
        </div>
      </div>

      {/* Bottom Footer: Document Checklist Preview & Action */}
      <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 text-blue-700 font-medium">
          <FileCheck2 className="w-4 h-4 text-blue-600" />
          <span>{vacancy.requiredDocuments.length} documentos requeridos</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-400">
            {vacancy.applicantsCount} postulantes
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(vacancy);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs"
          >
            Ver Vacante
          </button>
        </div>
      </div>
    </div>
  );
};
