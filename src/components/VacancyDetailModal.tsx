'use client';

import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Briefcase, 
  Clock, 
  GraduationCap, 
  FileCheck2, 
  CheckSquare, 
  Square, 
  Send, 
  Flame, 
  BadgeCheck, 
  FileText, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { JobVacancy, TeacherProfile } from '@/types';
import { LEVEL_LABELS, CONTRACT_LABELS } from './VacancyCard';

interface VacancyDetailModalProps {
  vacancy: JobVacancy | null;
  onClose: () => void;
  onApply: (vacancy: JobVacancy, attachedDocs: string[], coverNote?: string) => void;
  hasApplied: boolean;
  teacherProfile: TeacherProfile;
}

export const VacancyDetailModal: React.FC<VacancyDetailModalProps> = ({
  vacancy,
  onClose,
  onApply,
  hasApplied,
  teacherProfile
}) => {
  if (!vacancy) return null;

  const [selectedDocs, setSelectedDocs] = useState<string[]>(vacancy.requiredDocuments);
  const [coverNote, setCoverNote] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const levelInfo = LEVEL_LABELS[vacancy.educationalLevel] || { label: 'Educación', color: 'bg-slate-100 text-slate-800' };
  const contractInfo = CONTRACT_LABELS[vacancy.contractType] || { label: 'Contrato', badge: 'bg-slate-50 text-slate-700' };

  const toggleDocument = (doc: string) => {
    if (selectedDocs.includes(doc)) {
      setSelectedDocs(selectedDocs.filter(d => d !== doc));
    } else {
      setSelectedDocs([...selectedDocs, doc]);
    }
  };

  const handleApplyClick = () => {
    onApply(vacancy, selectedDocs, coverNote);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Modal */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-slate-50 to-blue-50/40">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${levelInfo.color}`}>
                {levelInfo.label}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200">
                Escuela {vacancy.schoolType === 'publica' ? 'Pública' : 'Privada'}
              </span>
              {vacancy.isUrgentSubstitute && (
                <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500 text-white animate-pulse">
                  <Flame className="w-3.5 h-3.5" />
                  Interinato Urgente SOS
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
              {vacancy.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-600">
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <Building2 className="w-4 h-4 text-blue-600" />
                {vacancy.schoolName}
              </span>
              {vacancy.cct && (
                <span className="text-xs bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded-md">
                  CCT: {vacancy.cct}
                </span>
              )}
              <span className="flex items-center gap-1 text-slate-500 text-xs">
                <MapPin className="w-3.5 h-3.5" />
                {vacancy.location.address}, {vacancy.location.city}, {vacancy.location.state}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 text-sm">
          
          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Salario */}
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4">
              <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1 mb-1">
                <DollarSign className="w-3.5 h-3.5" />
                Remuneración Ofrecida
              </span>
              <p className="text-lg font-black text-emerald-950">
                ${vacancy.salaryMin.toLocaleString('es-MX')}
                {vacancy.salaryMax ? ` - $${vacancy.salaryMax.toLocaleString('es-MX')}` : ''}
              </p>
              <p className="text-[11px] text-emerald-700 font-medium">
                Pago {vacancy.salaryPeriod} con prestaciones correspondientes
              </p>
            </div>

            {/* Régimen de Contratación */}
            <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-4">
              <span className="text-xs text-blue-800 font-semibold flex items-center gap-1 mb-1">
                <Briefcase className="w-3.5 h-3.5" />
                Tipo de Contratación
              </span>
              <p className="text-sm font-bold text-blue-950">
                {contractInfo.label}
              </p>
              <p className="text-[11px] text-blue-700 font-medium mt-1">
                Duración: {vacancy.contractDuration}
              </p>
            </div>

            {/* Jornada y Modalidad */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <span className="text-xs text-slate-600 font-semibold flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5" />
                Horario & Modalidad
              </span>
              <p className="text-sm font-bold text-slate-900 capitalize">
                {vacancy.scheduleType.replace('_', ' ')} · {vacancy.shift}
              </p>
              <p className="text-[11px] text-slate-600 font-medium capitalize mt-1">
                Modalidad {vacancy.modality}
              </p>
            </div>
          </div>

          {/* Asignaturas */}
          {vacancy.subjects.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Asignaturas o Materias a Impartir
              </h4>
              <div className="flex flex-wrap gap-2">
                {vacancy.subjects.map((sub, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg text-xs font-semibold">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Descripción de la Vacante */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Descripción del Puesto Docente
            </h4>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 leading-relaxed whitespace-pre-line">
              {vacancy.description}
            </div>
          </div>

          {/* Requisitos Académicos */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Perfil Académico Solicitado
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Grado Mínimo: <strong>{vacancy.requirements.minDegree}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Cédula Profesional: <strong>{vacancy.requirements.requireProfessionalLicense ? 'Indispensable' : 'Deseable'}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span>Experiencia frente a grupo: <strong>{vacancy.requirements.minExperienceYears} años mínimo</strong></span>
              </div>
              {vacancy.requirements.specialRequirements && (
                <div className="col-span-1 sm:col-span-2 text-xs text-slate-600 pt-1 border-t border-slate-200">
                  <strong>Requerimientos Especiales:</strong> {vacancy.requirements.specialRequirements}
                </div>
              )}
            </div>
          </div>

          {/* LISTA DE DOCUMENTOS SOLICITADOS PARA APLICAR (CORE REQUIREMENT) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-white border-2 border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-extrabold text-blue-950 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-blue-600" />
                Lista de Documentos Solicitados para Postular
              </h4>
              <span className="text-xs font-bold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                {selectedDocs.length} de {vacancy.requiredDocuments.length} seleccionados
              </span>
            </div>
            
            <p className="text-xs text-slate-600 mb-3">
              La escuela solicita los siguientes documentos para validar tu perfil docente. Marca los que adjuntarás desde tu Expediente Digital:
            </p>

            <div className="space-y-2">
              {vacancy.requiredDocuments.map((doc, idx) => {
                const isSelected = selectedDocs.includes(doc);
                return (
                  <div 
                    key={idx}
                    onClick={() => toggleDocument(doc)}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-white border-blue-400 shadow-xs' 
                        : 'bg-white/60 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-semibold ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                        {doc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Nota de expediente del profesor */}
            <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between text-xs text-blue-900">
              <span className="flex items-center gap-1 font-medium">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                Expediente Digital del Maestro: <strong>{teacherProfile.fullName}</strong>
              </span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                Cédula: {teacherProfile.professionalLicense || 'Verificada'}
              </span>
            </div>
          </div>

          {/* Mensaje o Nota Opcional para la Escuela */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Mensaje o Carta de Presentación Docente (Opcional)
            </label>
            <textarea
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              placeholder="Presenta tu experiencia docente, áreas de especialidad o interés pedagógico en la institución..."
              rows={2}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            {hasApplied ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <BadgeCheck className="w-4 h-4" /> Ya te has postulado a esta vacante.
              </span>
            ) : (
              <span>Se enviará tu expediente docente con los {selectedDocs.length} documentos marcados.</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors"
            >
              Cerrar
            </button>

            {!hasApplied ? (
              <button
                onClick={handleApplyClick}
                disabled={selectedDocs.length === 0}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
              >
                <Send className="w-3.5 h-3.5" />
                Postularme con mi Expediente
              </button>
            ) : (
              <button
                disabled
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs cursor-default"
              >
                Postulación Enviada
              </button>
            )}
          </div>
        </div>

        {/* Floating Success Overlay */}
        {showConfirmation && (
          <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <BadgeCheck className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">
              ¡Postulación Exitosa!
            </h3>
            <p className="text-xs text-slate-600 max-w-sm">
              Tu expediente y los documentos seleccionados han sido enviados a la dirección académica de <strong>{vacancy.schoolName}</strong>.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
