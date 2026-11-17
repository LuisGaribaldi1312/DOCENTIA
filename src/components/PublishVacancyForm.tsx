'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  PlusCircle, 
  Trash2, 
  DollarSign, 
  Clock, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  FileCheck2, 
  MapPin, 
  Flame, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { 
  JobVacancy, 
  EducationalLevel, 
  ContractType, 
  Modality, 
  Shift, 
  SchoolType,
  SchoolProfile,
  UserAccount 
} from '@/types';
import { STANDARD_REQUIRED_DOCUMENTS, MEXICAN_STATES } from '@/lib/mockData';

interface PublishVacancyFormProps {
  schoolProfile: SchoolProfile;
  currentUser?: UserAccount | null;
  onRequireAuth?: () => void;
  onRequirePlan?: () => void;
  onSubmit: (newVacancy: Omit<JobVacancy, 'id' | 'createdAt' | 'applicantsCount' | 'status'>) => void;
  onCancel: () => void;
}

export const PublishVacancyForm: React.FC<PublishVacancyFormProps> = ({
  schoolProfile,
  currentUser,
  onRequireAuth,
  onRequirePlan,
  onSubmit,
  onCancel
}) => {
  // Form State
  const [title, setTitle] = useState('');
  const [schoolName, setSchoolName] = useState(schoolProfile.name);
  const [schoolType, setSchoolType] = useState<SchoolType>(schoolProfile.type || 'privada');
  const [cct, setCct] = useState(schoolProfile.cct || '');
  const [educationalLevel, setEducationalLevel] = useState<EducationalLevel>('secundaria');
  const [subjectsInput, setSubjectsInput] = useState('');
  const [subjects, setSubjects] = useState<string[]>(['Matemáticas']);
  const [description, setDescription] = useState('');
  
  // Salario
  const [salaryMin, setSalaryMin] = useState<number>(15000);
  const [salaryMax, setSalaryMax] = useState<number>(20000);
  const [salaryPeriod, setSalaryPeriod] = useState<'mensual' | 'quincenal' | 'hora'>('mensual');

  // Contratación (Requerimiento del usuario)
  const [contractType, setContractType] = useState<ContractType>('planta_permanente');
  const [contractDuration, setContractDuration] = useState('Ciclo Escolar 2026-2027 (Con opción a definitividad)');

  // Jornada & Modalidad
  const [scheduleType, setScheduleType] = useState<'tiempo_completo' | 'medio_tiempo' | 'por_horas'>('tiempo_completo');
  const [shift, setShift] = useState<Shift>('matutino');
  const [modality, setModality] = useState<Modality>('presencial');

  // Ubicación
  const [state, setState] = useState(schoolProfile.state || 'Ciudad de México');
  const [city, setCity] = useState(schoolProfile.city || 'Benito Juárez');
  const [address, setAddress] = useState(schoolProfile.address || '');
  const [postalCode, setPostalCode] = useState('03100');

  // Lista de Documentos Requeridos (Requerimiento del usuario)
  const [requiredDocs, setRequiredDocs] = useState<string[]>([
    'Título Profesional',
    'Cédula Profesional (Federal / Estatal)',
    'Currículum Vitae (CV) Actualizado',
    'Constancia de No Antecedentes Penales'
  ]);
  const [customDocInput, setCustomDocInput] = useState('');

  // Perfil Académico
  const [minDegree, setMinDegree] = useState('Licenciatura Titulada');
  const [requireProfessionalLicense, setRequireProfessionalLicense] = useState(true);
  const [minExperienceYears, setMinExperienceYears] = useState(2);
  const [specialRequirements, setSpecialRequirements] = useState('');

  // SOS Interinato Express
  const [isUrgentSubstitute, setIsUrgentSubstitute] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAddSubject = () => {
    if (subjectsInput.trim() && !subjects.includes(subjectsInput.trim())) {
      setSubjects([...subjects, subjectsInput.trim()]);
      setSubjectsInput('');
    }
  };

  const handleRemoveSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const toggleStandardDoc = (doc: string) => {
    if (requiredDocs.includes(doc)) {
      setRequiredDocs(requiredDocs.filter(d => d !== doc));
    } else {
      setRequiredDocs([...requiredDocs, doc]);
    }
  };

  const handleAddCustomDoc = () => {
    if (customDocInput.trim() && !requiredDocs.includes(customDocInput.trim())) {
      setRequiredDocs([...requiredDocs, customDocInput.trim()]);
      setCustomDocInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !schoolName.trim() || !description.trim()) {
      alert('Por favor completa el título, nombre de escuela y descripción de la vacante.');
      return;
    }

    const newVacancy = {
      title,
      schoolName,
      schoolType,
      cct,
      educationalLevel,
      subjects: subjects.length > 0 ? subjects : ['General'],
      description,
      salaryMin: Number(salaryMin),
      salaryMax: salaryMax ? Number(salaryMax) : undefined,
      salaryPeriod,
      contractDuration,
      contractType,
      scheduleType,
      shift,
      modality,
      location: {
        state,
        city,
        address,
        postalCode
      },
      requiredDocuments: requiredDocs,
      requirements: {
        minDegree,
        requireProfessionalLicense,
        minExperienceYears: Number(minExperienceYears),
        specialRequirements
      },
      isUrgentSubstitute
    };

    onSubmit(newVacancy);
    setIsSubmitted(true);
  };

  // Super Administrador tiene pase total
  const isSuper = Boolean(currentUser?.isSuperAdmin);

  // 1. Candado si no está autenticado
  if (!currentUser) {
    return (
      <div className="w-full max-w-3xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center mx-auto mb-2">
            <Building2 className="w-8 h-8 text-serene-600" />
          </div>
          <h3 className="text-2xl font-black text-brand-950">
            Registro o Inicio de Sesión Requerido
          </h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Para publicar convocatorias y plazas docentes en el portal y aplicación de DOCENTIA, necesitas acceder con tu cuenta de Institución Educativa.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onRequireAuth}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-900 text-white font-extrabold text-xs shadow-md hover:bg-brand-800 transition-colors"
            >
              Iniciar Sesión o Crear Cuenta de Escuela
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
            >
              Volver a Vacantes
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Candado si el rol es Docente (omitido para SuperAdmin)
  if (!isSuper && currentUser.role !== 'escuela') {
    return (
      <div className="w-full max-w-3xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-2">
            <GraduationCap className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-2xl font-black text-brand-950">
            Perfil de Docente / Maestro Detectado
          </h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Tu cuenta actual está registrada como <strong>Docente</strong>. La publicación de convocatorias y contratación escolar está reservada para cuentas de <strong>Institución Educativa</strong>.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onRequireAuth}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-900 text-white font-extrabold text-xs shadow-md hover:bg-brand-800 transition-colors"
            >
              Cambiar a Cuenta de Institución
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
            >
              Volver a Vacantes
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Candado si no tiene contratado el Plan Escuela ($10 USD) (omitido para SuperAdmin)
  if (!isSuper && currentUser.subscription.status !== 'activo') {
    return (
      <div className="w-full max-w-3xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-serene-50 text-serene-700 flex items-center justify-center mx-auto mb-2">
            <ShieldCheck className="w-8 h-8 text-serene-600" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-prestige-100 text-prestige-900 font-extrabold text-xs">
            Plan Institución Requerido ($10 USD / mes)
          </span>
          <h3 className="text-2xl font-black text-brand-950">
            Activa el Plan Escuela para Publicar Convocatorias
          </h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Tu cuenta institucional <strong>{currentUser.institutionName || currentUser.name}</strong> requiere el Plan Escuela para publicar vacantes ilimitadas, acceder a expedientes con Cédula verificada y citar a Clase Muestra.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onRequirePlan}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-950 via-brand-900 to-serene-700 hover:from-brand-900 hover:to-serene-600 text-white font-extrabold text-xs shadow-md transition-all"
            >
              Contratar Plan Escuela ($10 USD / mes)
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-3xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-brand-950 mb-2">
            ¡Convocatoria Publicada Exitosamente!
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            La vacante para <strong>{title}</strong> ya se encuentra activa en el portal y aplicación de DOCENTIA.
          </p>
          <button
            onClick={onCancel}
            className="px-6 py-2.5 rounded-xl bg-brand-900 text-white font-bold text-xs hover:bg-brand-800 transition-colors shadow-sm"
          >
            Ir al Panel de Vacantes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8">
      
      {/* Banner Corporativo Superior */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-serene-900 text-white p-6 sm:p-10 rounded-3xl shadow-xl mb-8 border border-brand-800/60">
        <div className="flex items-center gap-3 mb-2">
          <span className="p-2.5 rounded-xl bg-white/10 text-serene-300">
            <Building2 className="w-6 h-6" />
          </span>
          <span className="text-xs uppercase font-extrabold tracking-widest text-serene-300">
            Módulo Institucional de Contratación
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
          Publicar Convocatoria Docente
        </h2>
        <p className="text-sm text-slate-300/90 mt-2 max-w-3xl">
          Genera una publicación institucional precisa para escuelas públicas o privadas de cualquier nivel académico, especificando el esquema salarial, régimen laboral y la lista oficial de documentos requeridos.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Sección 1: Datos de la Escuela */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-brand-950 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 className="w-5 h-5 text-serene-600" />
            1. Datos de la Escuela o Plantel Educativo
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nombre Oficial de la Escuela / Colegio *
              </label>
              <input
                type="text"
                required
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Ej. Colegio Bilingüe Nueva Inglaterra"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tipo de Sostenimiento *
              </label>
              <select
                value={schoolType}
                onChange={(e) => setSchoolType(e.target.value as SchoolType)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white font-medium focus:outline-hidden focus:border-serene-500"
              >
                <option value="privada">Escuela Privada / Particular</option>
                <option value="publica">Escuela Pública (Federal / Estatal)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Clave de Centro de Trabajo (CCT) o Registro
              </label>
              <input
                type="text"
                value={cct}
                onChange={(e) => setCct(e.target.value.toUpperCase())}
                placeholder="Ej. 09PES0412X"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Estado / Entidad Federativa *
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-serene-500"
              >
                {MEXICAN_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Municipio / Alcaldía *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ej. Benito Juárez"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dirección Física del Plantel o Campus
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Calle, número, colonia o campus donde laborará el docente"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500"
              />
            </div>
          </div>
        </div>

        {/* Sección 2: Vacante, Nivel y Materias */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-brand-950 flex items-center gap-2 border-b border-slate-100 pb-3">
            <GraduationCap className="w-5 h-5 text-serene-600" />
            2. Puesto Docente, Nivel Educativo y Asignaturas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Título del Puesto Docente *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Profesor(a) Titular de Matemáticas y Física - Nivel Secundaria"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500 font-bold text-brand-950"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nivel Educativo *
              </label>
              <select
                value={educationalLevel}
                onChange={(e) => setEducationalLevel(e.target.value as EducationalLevel)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white font-bold text-brand-900 focus:outline-hidden focus:border-serene-500"
              >
                <option value="inicial_preescolar">Inicial / Preescolar</option>
                <option value="primaria">Primaria</option>
                <option value="secundaria">Secundaria</option>
                <option value="preparatoria_bachillerato">Preparatoria / Bachillerato</option>
                <option value="universidad_superior">Universidad / Nivel Superior</option>
                <option value="posgrado">Posgrado / Maestría</option>
                <option value="educacion_especial">Educación Especial / Inclusiva</option>
                <option value="idiomas">Idiomas y Extensión</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Modalidad de Enseñanza *
              </label>
              <select
                value={modality}
                onChange={(e) => setModality(e.target.value as Modality)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white font-medium focus:outline-hidden focus:border-serene-500"
              >
                <option value="presencial">Presencial (en aula)</option>
                <option value="hibrido">Híbrida (presencial + virtual)</option>
                <option value="remoto">100% En Línea / Remota</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Materias o Asignaturas a Cargo
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={subjectsInput}
                  onChange={(e) => setSubjectsInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSubject();
                    }
                  }}
                  placeholder="Escribe una materia (ej. Física I, Cálculo, Español) y pulsa Agregar"
                  className="flex-1 text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500"
                />
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="px-5 py-2.5 rounded-xl bg-brand-900 text-white text-xs font-bold hover:bg-brand-800 transition-colors"
                >
                  Agregar
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {subjects.map((sub, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-900 border border-brand-200 rounded-lg text-xs font-semibold">
                    {sub}
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(i)}
                      className="text-brand-500 hover:text-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Descripción Concisa y Clara de la Vacante *
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe el enfoque didáctico, responsabilidades frente a grupo, recursos tecnológicos del colegio y ambiente institucional..."
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500"
              />
            </div>
          </div>
        </div>

        {/* Sección 3: Contratación, Salario & Duración */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-brand-950 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Briefcase className="w-5 h-5 text-serene-600" />
            3. Régimen Laboral, Duración y Esquema Salarial
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Régimen de Contratación *
              </label>
              <select
                value={contractType}
                onChange={(e) => setContractType(e.target.value as ContractType)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white font-bold text-brand-900 focus:outline-hidden focus:border-serene-500"
              >
                <option value="planta_permanente">Planta Permanente / Base Definitiva</option>
                <option value="contrato_determinado">Por Contrato (Tiempo Determinado)</option>
                <option value="honorarios">Por Honorarios / Hora Clase</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ¿Por cuánto tiempo será la contratación? *
              </label>
              <input
                type="text"
                required
                value={contractDuration}
                onChange={(e) => setContractDuration(e.target.value)}
                placeholder="Ej. Ciclo Escolar Anual 2026-2027 / Indefinido / Semestre Enero-Junio"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Salario Mínimo ($) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  required
                  min={1}
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(Number(e.target.value))}
                  className="w-full text-sm pl-7 p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500 font-bold text-serene-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Salario Máximo (Opcional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  min={1}
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(Number(e.target.value))}
                  className="w-full text-sm pl-7 p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500 font-bold text-serene-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Periodicidad del Salario *
              </label>
              <select
                value={salaryPeriod}
                onChange={(e) => setSalaryPeriod(e.target.value as any)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white font-medium focus:outline-hidden focus:border-serene-500"
              >
                <option value="mensual">Mensual</option>
                <option value="quincenal">Quincenal</option>
                <option value="hora">Por Hora / Clase</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tipo de Jornada
              </label>
              <select
                value={scheduleType}
                onChange={(e) => setScheduleType(e.target.value as any)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-serene-500"
              >
                <option value="tiempo_completo">Tiempo Completo</option>
                <option value="medio_tiempo">Medio Tiempo</option>
                <option value="por_horas">Por Horas Sueltas</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Turno de Clase
              </label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value as Shift)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-serene-500"
              >
                <option value="matutino">Turno Matutino</option>
                <option value="vespertino">Turno Vespertino</option>
                <option value="mixto">Turno Mixto</option>
                <option value="sabatino">Sabatino</option>
              </select>
            </div>

            {/* Switch SOS */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-prestige-50 border border-prestige-200">
              <input
                type="checkbox"
                id="urgentSos"
                checked={isUrgentSubstitute}
                onChange={(e) => setIsUrgentSubstitute(e.target.checked)}
                className="w-4 h-4 text-prestige-600 rounded"
              />
              <label htmlFor="urgentSos" className="text-xs font-bold text-prestige-900 cursor-pointer">
                🔥 Vacante Urgente / Reemplazo Express ("Docente SOS")
              </label>
            </div>
          </div>
        </div>

        {/* Sección 4: LISTA DE DOCUMENTOS SOLICITADOS (CORE USER REQUIREMENT) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-brand-950 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-serene-600" />
                4. Lista de Documentos Solicitados para Aplicar
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Define los documentos requeridos que el maestro adjuntará desde su expediente digital.
              </p>
            </div>
            <span className="text-xs font-bold text-serene-800 bg-serene-50 px-3 py-1 rounded-full border border-serene-200">
              {requiredDocs.length} seleccionados
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {STANDARD_REQUIRED_DOCUMENTS.map((doc, idx) => {
              const isChecked = requiredDocs.includes(doc);
              return (
                <div
                  key={idx}
                  onClick={() => toggleStandardDoc(doc)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-serene-50/80 border-serene-400 text-serene-950 font-bold shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-4 h-4 text-serene-600 rounded"
                  />
                  <span>{doc}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ¿Solicitas algún documento adicional o especial?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customDocInput}
                onChange={(e) => setCustomDocInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomDoc();
                  }
                }}
                placeholder="Ej. Certificación CENNI Nivel 15, Constancia de primeros auxilios..."
                className="flex-1 text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500"
              />
              <button
                type="button"
                onClick={handleAddCustomDoc}
                className="px-5 py-2.5 rounded-xl bg-brand-900 text-white text-xs font-bold hover:bg-brand-800 transition-colors"
              >
                Añadir Documento
              </button>
            </div>
          </div>
        </div>

        {/* Sección 5: Requisitos Académicos Mínimos */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-brand-950 flex items-center gap-2 border-b border-slate-100 pb-3">
            <GraduationCap className="w-5 h-5 text-serene-600" />
            5. Grado Académico Mínimo y Experiencia
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Grado Académico Mínimo *
              </label>
              <select
                value={minDegree}
                onChange={(e) => setMinDegree(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-serene-500"
              >
                <option value="Pasante de Licenciatura">Pasante de Licenciatura</option>
                <option value="Licenciatura Titulada">Licenciatura Titulada / Normalista</option>
                <option value="Maestría">Maestría</option>
                <option value="Doctorado">Doctorado</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Años de Experiencia Mínima
              </label>
              <input
                type="number"
                min={0}
                value={minExperienceYears}
                onChange={(e) => setMinExperienceYears(Number(e.target.value))}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="reqLicense"
                checked={requireProfessionalLicense}
                onChange={(e) => setRequireProfessionalLicense(e.target.checked)}
                className="w-4 h-4 text-serene-600 rounded"
              />
              <label htmlFor="reqLicense" className="text-xs font-bold text-slate-800 cursor-pointer">
                Cédula Profesional Indispensable
              </label>
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Requerimientos Adicionales o Proceso de Selección
              </label>
              <input
                type="text"
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                placeholder="Ej. Se solicitará clase muestra de 20 minutos con alumnos durante la segunda etapa de entrevistas."
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500"
              />
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-brand-900 via-brand-800 to-serene-700 hover:from-brand-800 hover:to-serene-600 text-white font-black text-sm shadow-lg shadow-brand-900/15 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Publicar Vacante Institucional
          </button>
        </div>

      </form>
    </div>
  );
};
