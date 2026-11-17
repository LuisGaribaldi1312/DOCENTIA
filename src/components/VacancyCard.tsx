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
  BadgeCheck, 
  Briefcase,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { JobVacancy, EducationalLevel, ContractType } from '@/types';

interface VacancyCardProps {
  vacancy: JobVacancy;
  onSelect: (vacancy: JobVacancy) => void;
  hasApplied?: boolean;
}

export const LEVEL_LABELS: Record<EducationalLevel, { label: string; badge: string }> = {
  inicial_preescolar: { label: 'Inicial / Preescolar', badge: 'bg-rose-50 text-rose-800 border-rose-200' },
  primaria: { label: 'Primaria', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  secundaria: { label: 'Secundaria', badge: 'bg-blue-50 text-blue-800 border-blue-200' },
  preparatoria_bachillerato: { label: 'Bachillerato / Prepa', badge: 'bg-purple-50 text-purple-800 border-purple-200' },
  universidad_superior: { label: 'Universidad / Superior', badge: 'bg-brand-50 text-brand-900 border-brand-200' },
  posgrado: { label: 'Posgrado / Maestría', badge: 'bg-indigo-50 text-indigo-900 border-indigo-200' },
  educacion_especial: { label: 'Educación Especial', badge: 'bg-serene-50 text-serene-800 border-serene-200' },
  idiomas: { label: 'Idiomas & Extensión', badge: 'bg-amber-50 text-amber-800 border-amber-200' }
};

export const CONTRACT_LABELS: Record<ContractType, { label: string; badge: string }> = {
  planta_permanente: { label: 'Planta Permanente', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  contrato_determinado: { label: 'Contrato Temporal', badge: 'bg-sky-50 text-sky-800 border-sky-200' },
  honorarios: { label: 'Por Honorarios', badge: 'bg-slate-100 text-slate-800 border-slate-200' }
};

export const VacancyCard: React.FC<VacancyCardProps> = ({
  vacancy,
  onSelect,
  hasApplied
}) => {
  const levelInfo = LEVEL_LABELS[vacancy.educationalLevel] || { label: 'Educación', badge: 'bg-slate-50 text-slate-700 border-slate-200' };
  const contractInfo = CONTRACT_LABELS[vacancy.contractType] || { label: 'Contrato', badge: 'bg-slate-50 text-slate-700 border-slate-200' };

  return (
    <div 
      onClick={() => onSelect(vacancy)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-serene-500/80 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-200 p-5 sm:p-6 cursor-pointer flex flex-col justify-between relative overflow-hidden"
    >
      {/* Decorative top accent border on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-900 via-serene-600 to-brand-700 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Top Badges Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${levelInfo.badge}`}>
              {levelInfo.label}
            </span>

            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200">
              {vacancy.schoolType === 'publica' ? 'Pública' : 'Privada'}
            </span>

            {vacancy.isUrgentSubstitute && (
              <span className="flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-prestige-500 text-white shadow-xs animate-pulse">
                <Flame className="w-3 h-3" />
                Interinato SOS
              </span>
            )}
          </div>

          {hasApplied && (
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              <BadgeCheck className="w-3.5 h-3.5" />
              Postulado
            </span>
          )}
        </div>

        {/* Title & School */}
        <div className="mb-3">
          <h3 className="text-base sm:text-lg font-extrabold text-brand-950 group-hover:text-serene-700 transition-colors line-clamp-2 leading-snug">
            {vacancy.title}
          </h3>

          <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-serene-600 shrink-0" />
            <span className="font-semibold text-slate-800 truncate">{vacancy.schoolName}</span>
            {vacancy.cct && (
              <span className="text-[10px] text-slate-400 hidden sm:inline">
                · CCT: {vacancy.cct}
              </span>
            )}
          </div>
        </div>

        {/* Subjects Badges */}
        {vacancy.subjects && vacancy.subjects.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {vacancy.subjects.slice(0, 3).map((sub, i) => (
              <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-medium">
                {sub}
              </span>
            ))}
            {vacancy.subjects.length > 3 && (
              <span className="text-[11px] text-slate-400 font-medium">
                +{vacancy.subjects.length - 3} más
              </span>
            )}
          </div>
        )}

        {/* Description preview */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {vacancy.description}
        </p>
      </div>

      <div>
        {/* Core Job Details Grid */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs text-slate-600 mb-3.5">
          
          {/* Salario */}
          <div className="flex items-center gap-1.5 font-bold text-serene-800 bg-serene-50/70 p-2 rounded-xl border border-serene-100">
            <DollarSign className="w-3.5 h-3.5 shrink-0 text-serene-600" />
            <span className="truncate">
              ${vacancy.salaryMin.toLocaleString('es-MX')}
              {vacancy.salaryMax ? ` - $${vacancy.salaryMax.toLocaleString('es-MX')}` : ''}
              <span className="font-normal text-[10px] text-slate-500"> /{vacancy.salaryPeriod}</span>
            </span>
          </div>

          {/* Tipo de Contrato */}
          <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
            <Briefcase className="w-3.5 h-3.5 shrink-0 text-slate-500" />
            <span className="truncate font-semibold text-slate-700">{contractInfo.label}</span>
          </div>

          {/* Modalidad & Turno */}
          <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
            <Clock className="w-3.5 h-3.5 shrink-0 text-slate-500" />
            <span className="capitalize truncate text-slate-700">{vacancy.modality} · {vacancy.shift}</span>
          </div>

          {/* Ubicación */}
          <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-500" />
            <span className="truncate text-slate-700">{vacancy.location.city}, {vacancy.location.state}</span>
          </div>
        </div>

        {/* Footer: Documents Count & Action */}
        <div className="flex items-center justify-between pt-2 text-xs">
          <div className="flex items-center gap-1 text-slate-500 font-medium text-[11px]">
            <FileCheck2 className="w-3.5 h-3.5 text-serene-600" />
            <span>{vacancy.requiredDocuments.length} docs requeridos</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">
              {vacancy.applicantsCount} candidatos
            </span>
            <span className="p-1 rounded-lg bg-brand-50 text-brand-900 group-hover:bg-serene-600 group-hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
