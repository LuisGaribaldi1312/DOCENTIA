'use client';

import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  Award, 
  GraduationCap, 
  Building2,
  Check,
  AlertCircle
} from 'lucide-react';
import { UserAccount } from '@/types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  planType: 'docente_5usd' | 'escuela_10usd';
  currentUser: UserAccount | null;
  onActivate: (planType: 'docente_5usd' | 'escuela_10usd') => void;
  onNeedLogin?: () => void;
  contextReason?: string;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  planType,
  currentUser,
  onActivate,
  onNeedLogin,
  contextReason
}) => {
  if (!isOpen) return null;

  const isDocente = planType === 'docente_5usd';
  const price = isDocente ? 5 : 10;
  const title = isDocente ? 'Certificación Oficial Docente' : 'Plan Institución Educativa';

  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');
  const [cardHolder, setCardHolder] = useState(currentUser?.name || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      if (onNeedLogin) {
        onClose();
        onNeedLogin();
      }
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      onActivate(planType);
      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1800);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200/90 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header con Colores Psicológicos y Elegantes */}
        <div className={`p-5 sm:p-6 text-white relative shrink-0 ${
          isDocente 
            ? 'bg-gradient-to-r from-brand-950 via-serene-900 to-serene-800' 
            : 'bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800'
        }`}>
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-prestige-400" />
            <span>{isDocente ? 'Plan Maestro Certificado' : 'Plan Escuelas & Colegios'}</span>
          </div>

          <div className="flex items-center gap-3 mb-1">
            {isDocente && (
              <img
                src="/images/docentia-avatar-bust.png"
                alt="Docente Certificado"
                className="w-11 h-11 rounded-xl object-cover border border-serene-400/80 shadow-md bg-white/10 shrink-0"
              />
            )}
            <div>
              <h3 className="text-lg sm:text-xl font-black">{title}</h3>
              <p className="text-xs text-slate-200 mt-0.5">
                {contextReason || (isDocente 
                  ? 'Valida tu Cédula y postúlate a las mejores vacantes con expediente garantizado.' 
                  : 'Publica convocatorias ilimitadas y accede al expediente verificado de los profesores.')}
              </p>
            </div>
          </div>

          <div className="mt-3.5 flex items-baseline gap-2 bg-white/10 p-3 rounded-2xl border border-white/15">
            <span className="text-2xl sm:text-3xl font-black text-white">${price}</span>
            <span className="text-xs sm:text-sm font-bold text-slate-300">USD / mes</span>
            <span className="ml-auto text-[10px] sm:text-[11px] font-semibold text-serene-200 bg-white/10 px-2.5 py-0.5 rounded-full">
              Cancela cuando quieras
            </span>
          </div>
        </div>

        {/* Scrollable Container for Landscape & Mobile */}
        <div className="overflow-y-auto overscroll-contain flex-1">
          {/* Notificación si no ha iniciado sesión */}
        {!currentUser && (
          <div className="p-4 bg-amber-50 border-b border-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900">
              <span className="font-bold">Inicia sesión primero:</span> Debes tener una cuenta registrada para vincular tu certificación de ${price} USD.
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onNeedLogin) onNeedLogin();
                }}
                className="block mt-1.5 text-xs font-black text-amber-900 underline hover:text-amber-950"
              >
                Clic aquí para Iniciar Sesión o Registrarte
              </button>
            </div>
          </div>
        )}

        {/* Beneficios Incluidos */}
        <div className="p-5 bg-slate-50 border-b border-slate-200/80">
          <span className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">
            Lo que incluye tu plan:
          </span>
          <ul className="space-y-2 text-xs text-slate-700">
            {isDocente ? (
              <>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-serene-600 shrink-0" />
                  <span><strong>Postulaciones ilimitadas</strong> a todas las plazas docentes.</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-serene-600 shrink-0" />
                  <span><strong>Validación de Cédula Profesional</strong> e insignia dorada oficial.</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-serene-600 shrink-0" />
                  <span><strong>Bolsa urgente Docente SOS</strong> para suplencias en menos de 48 hrs.</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-serene-600 shrink-0" />
                  <span>Expediente digital seguro en la nube.</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-brand-700 shrink-0" />
                  <span><strong>Publicación ilimitada</strong> de vacantes y convocatorias.</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-brand-700 shrink-0" />
                  <span><strong>Descarga de expedientes</strong> y títulos verificados de docentes.</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-brand-700 shrink-0" />
                  <span>Panel ATS escolar y citatorio a <strong>"Clase Muestra"</strong>.</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-brand-700 shrink-0" />
                  <span>Sello de institución verificada ante los profesores.</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Pasarela de Pago */}
        <form onSubmit={handlePay} className="p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-serene-600" />
              Datos de Facturación y Pago
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Lock className="w-3 h-3" /> Conexión Segura SSL
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Nombre en la Tarjeta
            </label>
            <input
              type="text"
              required
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="Nombre como aparece en el plástico"
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-serene-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Número de Tarjeta (Débito o Crédito)
            </label>
            <input
              type="text"
              required
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="•••• •••• •••• ••••"
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-serene-600 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Vencimiento
              </label>
              <input
                type="text"
                required
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/AA"
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-serene-600 text-center font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                CVV / CVC
              </label>
              <input
                type="text"
                required
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="123"
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-serene-600 text-center font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-3.5 rounded-xl text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
              isDocente
                ? 'bg-gradient-to-r from-serene-800 to-serene-600 hover:from-serene-700 hover:to-serene-500'
                : 'bg-gradient-to-r from-brand-950 via-brand-900 to-serene-700 hover:from-brand-900 hover:to-serene-600'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Procesando Pago Seguro...
              </span>
            ) : (
              <span>
                Pagar ${price} USD y Activar {isDocente ? 'Certificación Docente' : 'Plan Escuela'}
              </span>
            )}
          </button>
        </form>
        </div>

        {/* Modal de Confirmación Exitosa */}
        {isSuccess && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <Award className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-brand-950 mb-1">
              ¡Plan Activado con Éxito!
            </h3>
            <p className="text-xs text-slate-600 max-w-sm">
              Tu cuenta ahora cuenta con el distintivo <strong>{title}</strong>. Los permisos han sido desbloqueados de inmediato.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
