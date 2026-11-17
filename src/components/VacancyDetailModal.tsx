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
  Lock,
  Sparkles
} from 'lucide-react';
import { JobVacancy, TeacherProfile, UserAccount } from '@/types';
import { LEVEL_LABELS, CONTRACT_LABELS } from './VacancyCard';

interface VacancyDetailModalProps {
  vacancy: JobVacancy | null;
  onClose: () => void;
  onApply: (vacancy: JobVacancy, attachedDocs: string[], coverNote?: string) => void;
  hasApplied: boolean;
  teacherProfile: TeacherProfile;
  currentUser?: UserAccount | null;
  onRequireAuth?: () => void;
  onRequirePlan?: () => void;
}

export const VacancyDetailModal: React.FC<VacancyDetailModalProps> = ({
  vacancy,
  onClose,
  onApply,
  hasApplied,
  teacherProfile,
  currentUser,
  onRequireAuth,
  onRequirePlan
}) => {
  if (!vacancy) return null;

  const [selectedDocs, setSelectedDocs] = useState<string[]>(vacancy.requiredDocuments);
  const [coverNote, setCoverNote] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const levelInfo = LEVEL_LABELS[vacancy.educationalLevel] || { label: 'Educación', badge: 'bg-slate-50 text-slate-700' };
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
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200/90 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Modal - Academic & Corporate */}
        <div className="p-4 sm:p-7 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-brand-50/70 via-slate-50 to-serene-50/50 shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className={`text-xs font-bold px-3 py-1 rounded-md border ${levelInfo.badge}`}>
                {levelInfo.label}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 shadow-xs">
                Escuela {vacancy.schoolType === 'publica' ? 'Pública' : 'Privada Particular'}
              </span>
              {vacancy.isUrgentSubstitute && (
                <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-md bg-prestige-500 text-white shadow-xs animate-pulse">
                  <Flame className="w-3.5 h-3.5" />
                  Interinato Urgente SOS
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-brand-950 leading-snug">
              {vacancy.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-bold text-brand-900">
                <Building2 className="w-4 h-4 text-serene-600" />
                {vacancy.schoolName}
              </span>
              {vacancy.cct && (
                <span className="text-xs bg-slate-200/60 text-slate-700 px-2 py-0.5 rounded-md font-mono">
                  CCT: {vacancy.cct}
                </span>
              )}
              <span className="flex items-center gap-1 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {vacancy.location.address}, {vacancy.location.city}, {vacancy.location.state}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 text-sm">
          
          {/* Key Facts Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            
            {/* Salario */}
            <div className="bg-serene-50/80 border border-serene-200/80 rounded-2xl p-4">
              <span className="text-xs text-serene-800 font-bold flex items-center gap-1 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-serene-600" />
                Remuneración Ofrecida
              </span>
              <p className="text-xl font-black text-serene-950">
                ${vacancy.salaryMin.toLocaleString('es-MX')}
                {vacancy.salaryMax ? ` - $${vacancy.salaryMax.toLocaleString('es-MX')}` : ''}
              </p>
              <p className="text-[11px] text-serene-700 font-medium mt-0.5">
                Pago {vacancy.salaryPeriod} con prestaciones de ley
              </p>
            </div>

            {/* Tipo de Contrato & Duración */}
            <div className="bg-brand-50/80 border border-brand-200/80 rounded-2xl p-4">
              <span className="text-xs text-brand-800 font-bold flex items-center gap-1 mb-1">
                <Briefcase className="w-3.5 h-3.5 text-brand-600" />
                Régimen y Duración
              </span>
              <p className="text-sm font-extrabold text-brand-950">
                {contractInfo.label}
              </p>
              <p className="text-[11px] text-brand-700 font-medium mt-0.5">
                Vigencia: {vacancy.contractDuration}
              </p>
            </div>

            {/* Jornada & Modalidad */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4">
              <span className="text-xs text-slate-600 font-bold flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Modalidad & Turno
              </span>
              <p className="text-sm font-extrabold text-slate-900 capitalize">
                {vacancy.scheduleType.replace('_', ' ')} · {vacancy.shift}
              </p>
              <p className="text-[11px] text-slate-600 font-medium capitalize mt-0.5">
                Modalidad {vacancy.modality}
              </p>
            </div>
          </div>

          {/* Asignaturas */}
          {vacancy.subjects.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Asignaturas o Materias a Cargo
              </h4>
              <div className="flex flex-wrap gap-2">
                {vacancy.subjects.map((sub, i) => (
                  <span key={i} className="px-3 py-1 bg-brand-50 text-brand-900 border border-brand-200 rounded-lg text-xs font-semibold">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Descripción */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Descripción de la Plaza Docente
            </h4>
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 text-slate-700 leading-relaxed whitespace-pre-line text-xs sm:text-sm">
              {vacancy.description}
            </div>
          </div>

          {/* Requisitos Académicos */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Perfil Académico Solicitado
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-serene-600" />
                <span>Grado Mínimo: <strong>{vacancy.requirements.minDegree}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Cédula Profesional: <strong>{vacancy.requirements.requireProfessionalLicense ? 'Indispensable' : 'Deseable'}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-brand-700" />
                <span>Experiencia frente a grupo: <strong>{vacancy.requirements.minExperienceYears} años mínimo</strong></span>
              </div>
              {vacancy.requirements.specialRequirements && (
                <div className="col-span-1 sm:col-span-2 text-slate-600 pt-2 border-t border-slate-200">
                  <strong>Requerimientos Especiales:</strong> {vacancy.requirements.specialRequirements}
                </div>
              )}
            </div>
          </div>

          {/* CHECKLIST DE DOCUMENTOS SOLICITADOS PARA APLICAR (CORE REQUIREMENT) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-serene-50/60 via-slate-50 to-white border border-serene-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-extrabold text-brand-950 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-serene-600" />
                Lista de Documentos Solicitados para Postular
              </h4>
              <span className="text-xs font-bold text-serene-800 bg-white px-2.5 py-0.5 rounded-md border border-serene-200">
                {selectedDocs.length} de {vacancy.requiredDocuments.length} seleccionados
              </span>
            </div>
            
            <p className="text-xs text-slate-600 mb-3">
              Marca los documentos que adjuntarás desde tu Expediente Digital Docente para postularte:
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
                        ? 'bg-white border-serene-400 shadow-xs' 
                        : 'bg-white/60 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-serene-600" />
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

            {/* Expediente del docente preview */}
            <div className="mt-4 pt-3 border-t border-serene-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-brand-900">
              <span className="flex items-center gap-1 font-medium">
                <FileText className="w-3.5 h-3.5 text-serene-600" />
                Expediente Digital del Maestro: <strong>{teacherProfile.fullName}</strong>
              </span>
              <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Cédula: {teacherProfile.professionalLicense || 'Verificada'}
              </span>
            </div>
          </div>

          {/* Mensaje o Carta de Presentación */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Mensaje o Carta de Presentación Pedagógica (Opcional)
            </label>
            <textarea
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              placeholder="Presenta tu experiencia docente, áreas de especialidad o interés pedagógico en la institución..."
              rows={2}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500 focus:ring-1 focus:ring-serene-500"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            {hasApplied ? (
              <span className="text-emerald-800 font-bold flex items-center gap-1">
                <BadgeCheck className="w-4 h-4 text-emerald-600" /> Ya te has postulado a esta vacante.
              </span>
            ) : !currentUser ? (
              <span className="text-slate-600 font-medium">Inicia sesión como docente para postularte con tu expediente verificado.</span>
            ) : currentUser.isSuperAdmin ? (
              <span className="text-purple-800 font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-purple-600" /> Super Administrador · Acceso y permisos totales sin restricciones.
              </span>
            ) : currentUser.role !== 'docente' ? (
              <span className="text-amber-800 font-semibold">Conectado como Escuela. Cambia a cuenta de Docente para postularte.</span>
            ) : !currentUser.subscription.isCertified ? (
              <span className="text-amber-800 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-prestige-600" /> Requiere Plan Docente Certificado ($5 USD/mes) para aplicar.
              </span>
            ) : (
              <span className="text-emerald-800 font-bold flex items-center gap-1">
                <BadgeCheck className="w-4 h-4 text-emerald-600" /> Docente Certificado Oficial · Se adjuntarán {selectedDocs.length} documentos.
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors"
            >
              Cerrar
            </button>

            {hasApplied ? (
              <button
                disabled
                className="px-5 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs cursor-default flex items-center gap-1.5"
              >
                <BadgeCheck className="w-4 h-4" />
                Postulación Enviada
              </button>
            ) : !currentUser ? (
              <button
                onClick={() => {
                  onClose();
                  if (onRequireAuth) onRequireAuth();
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-extrabold text-xs shadow-md shadow-brand-900/15 transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                Iniciar Sesión para Postularme
              </button>
            ) : currentUser.isSuperAdmin ? (
              <button
                onClick={handleApplyClick}
                disabled={selectedDocs.length === 0}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-900 via-brand-900 to-serene-700 hover:from-purple-800 hover:to-serene-600 disabled:opacity-50 text-white font-extrabold text-xs shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Postularme (SuperAdmin)
              </button>
            ) : currentUser.role !== 'docente' ? (
              <button
                onClick={() => {
                  onClose();
                  if (onRequireAuth) onRequireAuth();
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md transition-all"
              >
                Cambiar a Perfil Docente
              </button>
            ) : !currentUser.subscription.isCertified ? (
              <button
                onClick={() => {
                  if (onRequirePlan) onRequirePlan();
                }}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-prestige-600 to-amber-600 hover:from-prestige-500 hover:to-amber-500 text-white font-extrabold text-xs shadow-md shadow-amber-600/20 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Certificar Plan ($5 USD) y Postularme
              </button>
            ) : (
              <button
                onClick={handleApplyClick}
                disabled={selectedDocs.length === 0}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-900 to-serene-700 hover:from-brand-800 hover:to-serene-600 disabled:opacity-50 text-white font-extrabold text-xs shadow-md shadow-brand-900/15 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Postularme con mi Expediente
              </button>
            )}
          </div>
        </div>

        {/* Success Overlay */}
        {showConfirmation && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <BadgeCheck className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-brand-950 mb-1">
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
