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
  HelpCircle
} from 'lucide-react';
import { 
  JobVacancy, 
  EducationalLevel, 
  ContractType, 
  Modality, 
  Shift, 
  SchoolType,
  SchoolProfile 
} from '@/types';
import { STANDARD_REQUIRED_DOCUMENTS, MEXICAN_STATES } from '@/lib/mockData';

interface PublishVacancyFormProps {
  schoolProfile: SchoolProfile;
  onSubmit: (newVacancy: Omit<JobVacancy, 'id' | 'createdAt' | 'applicantsCount' | 'status'>) => void;
  onCancel: () => void;
}

export const PublishVacancyForm: React.FC<PublishVacancyFormProps> = ({
  schoolProfile,
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

  // Subject helpers
  const handleAddSubject = () => {
    if (subjectsInput.trim() && !subjects.includes(subjectsInput.trim())) {
      setSubjects([...subjects, subjectsInput.trim()]);
      setSubjectsInput('');
    }
  };

  const handleRemoveSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  // Document helpers
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

  const handleRemoveDoc = (doc: string) => {
    setRequiredDocs(requiredDocs.filter(d => d !== doc));
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

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-3xl p-8 max-w-2xl mx-auto border border-slate-200 text-center shadow-lg my-8">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">
          ¡Vacante Publicada Exitosamente!
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          La vacante para <strong>{title}</strong> ya se encuentra visible para los maestros registrados en DOCENTIA.
        </p>
        <button
          onClick={onCancel}
          className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors"
        >
          Ir al Panel de Vacantes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      
      {/* Title & Introduction */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="p-2 rounded-xl bg-white/10 text-blue-200">
            <Building2 className="w-6 h-6" />
          </span>
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-300">
            Módulo Escolar de Reclutamiento
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          Publicar Nueva Vacante para Maestros
        </h2>
        <p className="text-sm text-blue-100/90 mt-1 max-w-2xl">
          Diseña una publicación clara y concisa para escuelas públicas o privadas de cualquier nivel educativo, definiendo el régimen de contratación, salario y la lista de documentos obligatorios.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Sección 1: Datos de la Escuela e Institución */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 className="w-5 h-5 text-blue-600" />
            1. Datos de la Institución Educativa
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nombre Oficial de la Escuela / Plantel *
              </label>
              <input
                type="text"
                required
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Ej. Colegio Bilingüe Nueva Inglaterra"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tipo de Sostenimiento *
              </label>
              <select
                value={schoolType}
                onChange={(e) => setSchoolType(e.target.value as SchoolType)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white font-medium focus:outline-hidden focus:border-blue-500"
              >
                <option value="privada">Escuela Privada / Particular</option>
                <option value="publica">Escuela Pública (Federal / Estatal)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Clave de Centro de Trabajo (CCT) o Registro Oficial
              </label>
              <input
                type="text"
                value={cct}
                onChange={(e) => setCct(e.target.value.toUpperCase())}
                placeholder="Ej. 09PES0412X"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Estado / Entidad Federativa *
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-blue-500"
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
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dirección Física del Plantel Escolar
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Calle, número, colonia o campus donde laborará el docente"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Sección 2: Definición de la Vacante & Nivel Educativo */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            2. Puesto Docente, Nivel Educativo y Materias
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Título de la Vacante *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Profesor(a) de Matemáticas y Física para 2º y 3º de Secundaria"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nivel Educativo de la Vacante *
              </label>
              <select
                value={educationalLevel}
                onChange={(e) => setEducationalLevel(e.target.value as EducationalLevel)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white font-semibold text-blue-900 focus:outline-hidden focus:border-blue-500"
              >
                <option value="inicial_preescolar">Inicial / Preescolar</option>
                <option value="primaria">Primaria</option>
                <option value="secundaria">Secundaria</option>
                <option value="preparatoria_bachillerato">Preparatoria / Bachillerato</option>
                <option value="universidad_superior">Universidad / Nivel Superior</option>
                <option value="posgrado">Posgrado / Maestría</option>
                <option value="educacion_especial">Educación Especial / Inclusiva</option>
                <option value="idiomas">Idiomas y Extensión Académica</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Modalidad de Impartición *
              </label>
              <select
                value={modality}
                onChange={(e) => setModality(e.target.value as Modality)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white font-medium focus:outline-hidden focus:border-blue-500"
              >
                <option value="presencial">Presencial (en aula)</option>
                <option value="hibrido">Híbrida (presencial + aula virtual)</option>
                <option value="remoto">100% En Línea / Remota</option>
              </select>
            </div>

            {/* Asignaturas */}
            <div className="sm:col-span-2">
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
                  placeholder="Escribe una materia (ej. Álgebra, Química, Historia) y pulsa Agregar"
                  className="flex-1 text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Agregar
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {subjects.map((sub, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg text-xs font-semibold">
                    {sub}
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(i)}
                      className="text-blue-500 hover:text-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Descripción Detallada */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Descripción Concisa y Detallada de la Vacante *
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe los objetivos de aprendizaje, número aproximado de alumnos por grupo, metodología didáctica deseada y ambiente de trabajo en la institución..."
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
            </div>

          </div>
        </div>

        {/* Sección 3: Contratación, Salario & Duración (Requisitos Clave del Usuario) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Briefcase className="w-5 h-5 text-blue-600" />
            3. Esquema de Contratación, Duración y Salario
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Régimen de Contratación */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Régimen de Contratación *
              </label>
              <select
                value={contractType}
                onChange={(e) => setContractType(e.target.value as ContractType)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500"
              >
                <option value="planta_permanente">Planta Permanente / Base Definitiva</option>
                <option value="contrato_determinado">Por Contrato (Tiempo Determinado)</option>
                <option value="honorarios">Por Honorarios / Servicios Profesionales</option>
              </select>
            </div>

            {/* Duración de la Contratación */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ¿Por cuánto tiempo será la contratación? *
              </label>
              <input
                type="text"
                required
                value={contractDuration}
                onChange={(e) => setContractDuration(e.target.value)}
                placeholder="Ej. Ciclo Escolar Anual 2026-2027 / Indefinido / 6 Meses"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            {/* Salario Mínimo */}
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
                  className="w-full text-sm pl-7 p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 font-bold text-emerald-800"
                />
              </div>
            </div>

            {/* Salario Máximo */}
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
                  className="w-full text-sm pl-7 p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 font-bold text-emerald-800"
                />
              </div>
            </div>

            {/* Periodicidad del Pago */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Periodicidad del Salario *
              </label>
              <select
                value={salaryPeriod}
                onChange={(e) => setSalaryPeriod(e.target.value as any)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white font-medium focus:outline-hidden focus:border-blue-500"
              >
                <option value="mensual">Mensual</option>
                <option value="quincenal">Quincenal</option>
                <option value="hora">Por Hora / Clase</option>
              </select>
            </div>

            {/* Tipo de Jornada */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tipo de Jornada
              </label>
              <select
                value={scheduleType}
                onChange={(e) => setScheduleType(e.target.value as any)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-blue-500"
              >
                <option value="tiempo_completo">Tiempo Completo</option>
                <option value="medio_tiempo">Medio Tiempo</option>
                <option value="por_horas">Por Horas Sueltas</option>
              </select>
            </div>

            {/* Turno */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Turno de Clase
              </label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value as Shift)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-blue-500"
              >
                <option value="matutino">Turno Matutino</option>
                <option value="vespertino">Turno Vespertino</option>
                <option value="mixto">Turno Mixto</option>
                <option value="sabatino">Sabatino</option>
              </select>
            </div>

            {/* Switch Docente SOS */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
              <input
                type="checkbox"
                id="urgentSos"
                checked={isUrgentSubstitute}
                onChange={(e) => setIsUrgentSubstitute(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="urgentSos" className="text-xs font-bold text-amber-900 cursor-pointer">
                🔥 Es una Vacante Urgente / Reemplazo Express ("Docente SOS")
              </label>
            </div>

          </div>
        </div>

        {/* Sección 4: LISTA DE DOCUMENTOS SOLICITADOS PARA APLICAR (CORE REQUIREMENT) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-blue-600" />
                4. Lista de Documentos Solicitados para Aplicar
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Marca los documentos que el profesor debe presentar al postularse a esta plaza escolar.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
              {requiredDocs.length} seleccionados
            </span>
          </div>

          {/* Quick Select Standard Documents */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {STANDARD_REQUIRED_DOCUMENTS.map((doc, idx) => {
              const isChecked = requiredDocs.includes(doc);
              return (
                <div
                  key={idx}
                  onClick={() => toggleStandardDoc(doc)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-blue-50/80 border-blue-400 text-blue-950 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span>{doc}</span>
                </div>
              );
            })}
          </div>

          {/* Añadir documento personalizado */}
          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ¿Solicitas algún documento adicional o específico?
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
                className="flex-1 text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddCustomDoc}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Añadir Documento
              </button>
            </div>
          </div>
        </div>

        {/* Sección 5: Requisitos Académicos Mínimos */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            5. Requisitos Académicos y Experiencia
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Grado Académico Mínimo *
              </label>
              <select
                value={minDegree}
                onChange={(e) => setMinDegree(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-blue-500"
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
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="reqLicense"
                checked={requireProfessionalLicense}
                onChange={(e) => setRequireProfessionalLicense(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label htmlFor="reqLicense" className="text-xs font-bold text-slate-800 cursor-pointer">
                Cédula Profesional Obligatoria
              </label>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Requerimientos Adicionales o Dinámica de Selección
              </label>
              <input
                type="text"
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                placeholder="Ej. Se solicitará clase muestra de 20 minutos con alumnos durante la segunda etapa de entrevistas."
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01]"
          >
            <PlusCircle className="w-4 h-4" />
            Publicar Vacante en DOCENTIA
          </button>
        </div>

      </form>
    </div>
  );
};
