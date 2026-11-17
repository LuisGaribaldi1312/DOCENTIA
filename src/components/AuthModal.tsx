'use client';

import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  Building2, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  FileCheck2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { UserRole, UserAccount } from '@/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, role?: UserRole) => UserAccount;
  onRegister: (data: {
    email: string;
    name: string;
    role: UserRole;
    phone?: string;
    institutionName?: string;
    cct?: string;
    professionalLicense?: string;
  }) => UserAccount;
  initialRole?: UserRole;
  promptMessage?: string;
  onSuccess?: (user: UserAccount) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  initialRole = 'docente',
  promptMessage,
  onSuccess
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<UserRole>(initialRole);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [cct, setCct] = useState('');
  const [license, setLicense] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Por favor ingresa tu correo y contraseña.');
      return;
    }

    if (mode === 'login') {
      try {
        const user = onLogin(email, role);
        setSuccessMsg(`¡Bienvenido de nuevo, ${user.name}!`);
        setTimeout(() => {
          setSuccessMsg(null);
          onClose();
          if (onSuccess) onSuccess(user);
        }, 1200);
      } catch (err) {
        setError('Error al iniciar sesión.');
      }
    } else {
      if (!name.trim()) {
        setError('Por favor ingresa tu nombre completo o de la institución.');
        return;
      }

      try {
        const user = onRegister({
          email,
          name,
          role,
          phone,
          institutionName: role === 'escuela' ? (institutionName || name) : undefined,
          cct: role === 'escuela' ? cct : undefined,
          professionalLicense: role === 'docente' ? license : undefined
        });

        setSuccessMsg(`¡Cuenta creada con éxito! Bienvenido, ${user.name}.`);
        setTimeout(() => {
          setSuccessMsg(null);
          onClose();
          if (onSuccess) onSuccess(user);
        }, 1200);
      } catch (err) {
        setError('Error al registrar la cuenta.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200/90 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Modal */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-brand-950 via-brand-900 to-serene-900 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 flex items-center justify-center text-serene-300">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-lg sm:text-xl font-black tracking-tight">
              DOCEN<span className="text-serene-400">TIA</span>
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white">
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta Oficial'}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {promptMessage || 'Accede a la red educativa especializada para docentes e instituciones escolares.'}
          </p>
        </div>

        {/* Scrollable Container for Landscape & Mobile */}
        <div className="overflow-y-auto overscroll-contain flex-1">
          {/* Selector de Rol */}
        <div className="p-4 bg-slate-50 border-b border-slate-200/80">
          <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">
            Tipo de Cuenta
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole('docente')}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all ${
                role === 'docente'
                  ? 'bg-serene-700 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Docente / Maestro</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('escuela')}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all ${
                role === 'escuela'
                  ? 'bg-brand-900 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Escuela / Institución</span>
            </button>
          </div>
        </div>

        {/* Tabs de Modo: Iniciar Sesión vs Registro */}
        <div className="flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-3 text-xs font-extrabold text-center transition-colors border-b-2 ${
              mode === 'login'
                ? 'border-serene-600 text-brand-950 bg-white'
                : 'border-transparent text-slate-500 bg-slate-50 hover:text-slate-800'
            }`}
          >
            Tengo una Cuenta
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex-1 py-3 text-xs font-extrabold text-center transition-colors border-b-2 ${
              mode === 'register'
                ? 'border-serene-600 text-brand-950 bg-white'
                : 'border-transparent text-slate-500 bg-slate-50 hover:text-slate-800'
            }`}
          >
            Registrarme Nuevo
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              {successMsg}
            </div>
          )}

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {role === 'docente' ? 'Nombre Completo del Docente' : 'Nombre del Colegio o Institución'} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={role === 'docente' ? 'Ej. Mtra. Sofía Morales Ruiz' : 'Ej. Instituto Pedagógico Siglo XXI'}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-serene-600 focus:ring-1 focus:ring-serene-600"
                  />
                </div>
              </div>

              {role === 'docente' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Cédula Profesional (Opcional al inicio)
                  </label>
                  <div className="relative">
                    <FileCheck2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={license}
                      onChange={(e) => setLicense(e.target.value)}
                      placeholder="Ej. 12894562 (Para certificar tu perfil)"
                      className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-serene-600"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      CCT (Clave de Centro de Trabajo)
                    </label>
                    <input
                      type="text"
                      value={cct}
                      onChange={(e) => setCct(e.target.value)}
                      placeholder="Ej. 09PES0412X"
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-serene-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Teléfono Institucional
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="55 1234 5678"
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-serene-600"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Correo Electrónico *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'docente' ? 'maestro@docentia.com' : 'direccion@colegio.edu.mx'}
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-serene-600 focus:ring-1 focus:ring-serene-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Contraseña *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-serene-600 focus:ring-1 focus:ring-serene-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-950 via-brand-900 to-serene-700 hover:from-brand-900 hover:to-serene-600 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{mode === 'login' ? 'Acceder a mi Cuenta' : 'Registrar y Continuar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        </div>

      </div>
    </div>
  );
};
