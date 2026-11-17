'use client';

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Home, 
  GraduationCap, 
  ShieldCheck, 
  FileText, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  Flame
} from 'lucide-react';
import { TeacherProfile, EducationalLevel } from '@/types';
import { MEXICAN_STATES } from '@/lib/mockData';

interface TeacherProfileFormProps {
  profile: TeacherProfile;
  onSave: (updated: TeacherProfile) => void;
}

export const TeacherProfileForm: React.FC<TeacherProfileFormProps> = ({
  profile,
  onSave
}) => {
  // Personal & Contact Info (Mandatory fields requested by user)
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);
  const [residenceCity, setResidenceCity] = useState(profile.residenceCity);
  const [residenceState, setResidenceState] = useState(profile.residenceState);
  const [postalCode, setPostalCode] = useState(profile.postalCode);

  // Professional & Academic Info
  const [professionalLicense, setProfessionalLicense] = useState(profile.professionalLicense);
  const [highestDegree, setHighestDegree] = useState(profile.highestDegree);
  const [major, setMajor] = useState(profile.major);
  const [yearsOfExperience, setYearsOfExperience] = useState(profile.yearsOfExperience);
  const [bio, setBio] = useState(profile.bio);
  const [availableForUrgentSubstitute, setAvailableForUrgentSubstitute] = useState(profile.availableForUrgentSubstitute);

  // Documents
  const [documents, setDocuments] = useState(profile.uploadedDocuments);
  const [newDocCategory, setNewDocCategory] = useState('CV');
  const [newDocName, setNewDocName] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddMockDocument = () => {
    if (!newDocName.trim()) return;
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: newDocName.trim().endsWith('.pdf') ? newDocName.trim() : `${newDocName.trim()}.pdf`,
      category: newDocCategory,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    setDocuments([...documents, newDoc]);
    setNewDocName('');
  };

  const handleRemoveDocument = (docId: string) => {
    setDocuments(documents.filter(d => d.id !== docId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: TeacherProfile = {
      ...profile,
      fullName,
      email,
      phone,
      address,
      residenceCity,
      residenceState,
      postalCode,
      professionalLicense,
      highestDegree,
      major,
      yearsOfExperience: Number(yearsOfExperience),
      bio,
      availableForUrgentSubstitute,
      uploadedDocuments: documents
    };

    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="p-2 rounded-xl bg-white/10 text-blue-200">
            <GraduationCap className="w-6 h-6" />
          </span>
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-300">
            Perfil & Expediente Digital del Docente
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          Registro del Profesor
        </h2>
        <p className="text-sm text-blue-100/90 mt-1 max-w-2xl">
          Mantén actualizada tu información de contacto, lugar de residencia, cédula profesional y expedientes PDF para postularte a vacantes escolares en 1 solo clic.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Sección 1: Datos Personales y de Contacto Obligatorios */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-5 h-5 text-blue-600" />
            1. Datos Personales y Contacto (Obligatorios)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nombre Completo del Maestro(a) *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ej. Mtro. Luis Alberto Garibaldi"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Correo Electrónico *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="profesor@ejemplo.com"
                  className="w-full text-sm pl-9 p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Número de Teléfono / WhatsApp *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="55 1234 5678"
                  className="w-full text-sm pl-9 p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Sección 2: Dirección y Lugar de Residencia (Requisito Explícito) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Home className="w-5 h-5 text-blue-600" />
            2. Dirección y Lugar de Residencia
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dirección Completa (Calle, Número, Colonia) *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej. Calle Río Churubusco 420, Int. 3B"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Estado / Entidad de Residencia *
              </label>
              <select
                value={residenceState}
                onChange={(e) => setResidenceState(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-blue-500"
              >
                {MEXICAN_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Municipio / Alcaldía de Residencia *
              </label>
              <input
                type="text"
                required
                value={residenceCity}
                onChange={(e) => setResidenceCity(e.target.value)}
                placeholder="Ej. Coyoacán"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Código Postal *
              </label>
              <input
                type="text"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="04100"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
            </div>

          </div>
        </div>

        {/* Sección 3: Formación Pedagógica y Cédula Profesional */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            3. Acreditación Profesional & Cédula
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Número de Cédula Profesional Federal *
              </label>
              <input
                type="text"
                value={professionalLicense}
                onChange={(e) => setProfessionalLicense(e.target.value)}
                placeholder="Ej. 12894562"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 font-mono font-bold text-blue-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Grado Máximo de Estudios *
              </label>
              <select
                value={highestDegree}
                onChange={(e) => setHighestDegree(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white font-medium focus:outline-hidden focus:border-blue-500"
              >
                <option value="Licenciatura">Licenciatura / Normalista</option>
                <option value="Maestría">Maestría</option>
                <option value="Doctorado">Doctorado</option>
                <option value="Especialidad">Especialidad Docente</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Años de Experiencia Frente a Grupo
              </label>
              <input
                type="number"
                min={0}
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 font-bold"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Carrera / Especialidad Académica
              </label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="Ej. Lic. en Matemáticas / Pedagogía / Enseñanza del Inglés"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reseña Pedagógica / Filosofía de Enseñanza
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Escribe brevemente tu metodología, áreas de fortaleza y compromiso educativo..."
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            {/* Disponibilidad para Docente SOS (Interinatos) */}
            <div className="sm:col-span-3 flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <input
                type="checkbox"
                id="availSos"
                checked={availableForUrgentSubstitute}
                onChange={(e) => setAvailableForUrgentSubstitute(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded"
              />
              <label htmlFor="availSos" className="text-xs text-amber-950 font-bold cursor-pointer">
                🔥 Activar "Docente SOS": Deseo recibir alertas inmediatas de reemplazos e interinatos urgentes de escuelas cercanas a mi residencia.
              </label>
            </div>

          </div>
        </div>

        {/* Sección 4: Expediente Digital de Documentos (Archivos para Postular) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                4. Expediente Digital Docente (Documentos Guardados)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Los documentos cargados aquí se adjuntarán automáticamente a las vacantes escolares que los requieran.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
              {documents.length} documentos listos
            </span>
          </div>

          {/* Lista de documentos guardados */}
          <div className="space-y-2">
            {documents.map((doc) => (
              <div 
                key={doc.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 font-bold flex items-center justify-center text-[10px]">
                    PDF
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{doc.name}</p>
                    <p className="text-[11px] text-slate-500">
                      Categoría: <span className="font-medium text-blue-700">{doc.category}</span> · Subido el {doc.uploadDate}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveDocument(doc.id)}
                  className="text-slate-400 hover:text-red-600 p-1.5 transition-colors"
                  title="Eliminar documento"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Formulario para agregar nuevo documento al expediente */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3">
            <h4 className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-blue-600" />
              Subir Nuevo Documento al Expediente
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <select
                  value={newDocCategory}
                  onChange={(e) => setNewDocCategory(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="CV">Curriculum Vitae (CV)</option>
                  <option value="Cédula">Cédula Profesional</option>
                  <option value="Título">Título Universitario</option>
                  <option value="Antecedentes">Antecedentes No Penales</option>
                  <option value="Certificación">Certificación de Idioma / Pedagógica</option>
                  <option value="Recomendación">Carta de Recomendación</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="Nombre del archivo (ej. Titulo_Maestria)"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleAddMockDocument}
                  className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors shadow-xs"
                >
                  Adjuntar al Expediente
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> ¡Perfil y Expediente Guardados Exitosamente!
            </span>
          ) : (
            <span className="text-xs text-slate-500">
              Todos los cambios se guardan de forma segura en tu dispositivo.
            </span>
          )}

          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01]"
          >
            Guardar Mi Perfil Docente
          </button>
        </div>

      </form>
    </div>
  );
};
