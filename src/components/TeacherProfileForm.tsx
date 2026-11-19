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
  Briefcase,
  Flame,
  Check,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { TeacherProfile } from '@/types';
import { MEXICAN_STATES } from '@/lib/mockData';
import { uploadDocumentToSupabase } from '@/lib/supabase/storageService';

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
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const result = await uploadDocumentToSupabase(profile.id || 'teacher-default', file, newDocCategory);
      setDocuments(prev => [...prev, {
        id: result.id,
        name: result.name,
        category: result.category,
        uploadDate: result.uploadDate,
        url: result.url
      }]);
    } catch (err) {
      console.error('Error al subir a Supabase Storage:', err);
    } finally {
      setIsUploading(false);
      // Reset input value
      e.target.value = '';
    }
  };

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
    <div className="w-full px-3.5 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 sm:py-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-serene-900 text-white p-5 sm:p-10 rounded-3xl shadow-xl mb-6 sm:mb-8 border border-brand-800/60">
        <div className="flex items-center gap-3 mb-2">
          <span className="p-2 sm:p-2.5 rounded-xl bg-white/10 text-serene-300">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
          <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-serene-300">
            Expediente Digital del Profesor
          </span>
        </div>
        <h2 className="text-xl sm:text-4xl font-black tracking-tight">
          Registro & Perfil Docente
        </h2>
        <p className="text-xs sm:text-sm text-slate-300/90 mt-2 max-w-3xl">
          Administra tus datos de contacto, lugar de residencia, cédula profesional y expedientes PDF para que las instituciones educativas públicas y privadas puedan contratarte de inmediato.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        
        {/* Sección 1: Datos Personales y Contacto */}
        <div className="bg-white p-4 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-sm sm:text-base font-extrabold text-brand-950 flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-5 h-5 text-serene-600" />
            1. Datos Personales y de Contacto Oficial
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
            <div className="sm:col-span-2 md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nombre Completo del Profesor(a) *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ej. Mtro. Luis Alberto Garibaldi"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500 font-bold text-brand-950"
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
                  className="w-full text-sm pl-9 p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Teléfono / WhatsApp de Contacto *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="55 1234 5678"
                  className="w-full text-sm pl-9 p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Número de Cédula Profesional *
              </label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={professionalLicense}
                  onChange={(e) => setProfessionalLicense(e.target.value)}
                  placeholder="Ej. 12894562"
                  className="w-full text-sm pl-9 p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500 font-mono font-bold text-brand-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sección 2: Dirección y Lugar de Residencia */}
        <div className="bg-white p-4 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-sm sm:text-base font-extrabold text-brand-950 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Home className="w-5 h-5 text-serene-600" />
            2. Dirección y Lugar de Residencia
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
            <div className="sm:col-span-2 md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dirección Completa (Calle, Número, Colonia) *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej. Calle Río Churubusco 420, Int. 3B"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Estado / Entidad Federativa de Residencia *
              </label>
              <select
                value={residenceState}
                onChange={(e) => setResidenceState(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-serene-500"
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
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500"
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
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Sección 3: Formación Pedagógica */}
        <div className="bg-white p-4 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-sm sm:text-base font-extrabold text-brand-950 flex items-center gap-2 border-b border-slate-100 pb-3">
            <GraduationCap className="w-5 h-5 text-serene-600" />
            3. Acreditación Académica y Experiencia Docente
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Grado Máximo de Estudios *
              </label>
              <select
                value={highestDegree}
                onChange={(e) => setHighestDegree(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white font-medium focus:outline-hidden focus:border-serene-500"
              >
                <option value="Licenciatura">Licenciatura / Normalista</option>
                <option value="Maestría">Maestría</option>
                <option value="Doctorado">Doctorado</option>
                <option value="Especialidad">Especialidad Docente</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Años de Experiencia en Aula
              </label>
              <input
                type="number"
                min={0}
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500 font-bold"
              />
            </div>

            <div className="sm:col-span-2 md:col-span-1">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Carrera / Licenciatura Cursada
              </label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="Ej. Licenciatura en Pedagogía / Matemáticas"
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500"
              />
            </div>

            <div className="sm:col-span-2 md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reseña Pedagógica / Filosofía de Enseñanza
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Escribe brevemente tu metodología, áreas de fortaleza y compromiso pedagógico..."
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500"
              />
            </div>

            <div className="sm:col-span-2 md:col-span-3 flex items-center gap-3 p-4 rounded-2xl bg-prestige-50 border border-prestige-200">
              <input
                type="checkbox"
                id="availSos"
                checked={availableForUrgentSubstitute}
                onChange={(e) => setAvailableForUrgentSubstitute(e.target.checked)}
                className="w-4 h-4 text-prestige-600 rounded"
              />
              <label htmlFor="availSos" className="text-xs text-prestige-950 font-bold cursor-pointer">
                🔥 Activar "Docente SOS": Deseo recibir alertas inmediatas de reemplazos e interinatos urgentes de escuelas cercanas a mi lugar de residencia.
              </label>
            </div>
          </div>
        </div>

        {/* Sección 4: Expediente Digital (Archivos PDF) */}
        <div className="bg-white p-4 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-brand-950 flex items-center gap-2">
                <FileText className="w-5 h-5 text-serene-600" />
                4. Expediente Digital Docente (Documentos Guardados)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Los documentos resguardados aquí se adjuntarán automáticamente a las vacantes escolares que los requieran.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {documents.length} documentos listos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {documents.map((doc) => (
              <div 
                key={doc.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs"
              >
                <div className="flex items-center gap-3 truncate">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 font-extrabold flex items-center justify-center text-[10px] shrink-0">
                    PDF
                  </div>
                  <div className="truncate">
                    <p className="font-extrabold text-brand-950 truncate">{doc.name}</p>
                    <p className="text-[11px] text-slate-500">
                      Categoría: <span className="font-semibold text-serene-700">{doc.category}</span> · {doc.uploadDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {doc.url && (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-serene-700 hover:text-serene-900 p-1.5 transition-colors"
                      title="Ver documento en Supabase Storage"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveDocument(doc.id)}
                    className="text-slate-400 hover:text-red-600 p-1.5 transition-colors"
                    title="Eliminar documento"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-serene-50/50 border border-serene-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-brand-950 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-serene-600" />
                Subir Nuevo Documento a Supabase Storage
              </h4>
              <span className="text-[10px] font-bold text-serene-700 bg-white px-2 py-0.5 rounded-md border border-serene-200">
                Almacenamiento Cloud Seguro
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Categoría</label>
                <select
                  value={newDocCategory}
                  onChange={(e) => setNewDocCategory(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="CV">Curriculum Vitae (CV)</option>
                  <option value="Cédula">Cédula Profesional</option>
                  <option value="Título">Título Universitario</option>
                  <option value="Antecedentes">Antecedentes No Penales</option>
                  <option value="Certificación">Certificación de Idioma / Pedagógica</option>
                  <option value="Recomendación">Carta de Recomendación</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Archivo desde tu dispositivo (PDF, JPG, PNG)
                </label>
                <div className="flex items-center gap-2">
                  <label className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-dashed border-serene-400 bg-white hover:bg-serene-50/50 cursor-pointer text-xs font-semibold text-slate-700 transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 text-serene-600 animate-spin" />
                        <span>Subiendo a Supabase Storage...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-serene-600" />
                        <span>Seleccionar archivo oficial...</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Alternativa de registro por nombre rápido */}
            <div className="pt-2 border-t border-serene-200/60 flex flex-col sm:flex-row items-center gap-2">
              <span className="text-[11px] text-slate-500 shrink-0 font-medium">O registrar por nombre:</span>
              <input
                type="text"
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                placeholder="Nombre del documento (ej. Cedula_Profesional_Licenciatura)"
                className="flex-1 w-full text-xs p-2 rounded-xl border border-slate-200 bg-white"
              />
              <button
                type="button"
                onClick={handleAddMockDocument}
                className="w-full sm:w-auto py-2 px-3.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors shrink-0"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {savedSuccess ? (
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> ¡Expediente Guardado Exitosamente!
            </span>
          ) : (
            <span className="text-xs text-slate-500">
              Información resguardada con cifrado para postulaciones seguras.
            </span>
          )}

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-950 via-brand-900 to-serene-700 hover:from-brand-900 hover:to-serene-600 text-white font-black text-sm shadow-lg shadow-brand-900/15 transition-all"
          >
            Guardar Mi Perfil & Expediente Docente
          </button>
        </div>

      </form>
    </div>
  );
};
