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
  Check,
  AlertCircle,
  ExternalLink,
  ArrowRight
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
  const price = isDocente ? '6.65' : '13.20';
  const priceMxn = isDocente ? '135' : '269';
  const title = isDocente ? 'Certificación Oficial Docente' : 'Plan Institución Educativa';

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePayWithStripe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!currentUser) {
      if (onNeedLogin) {
        onClose();
        onNeedLogin();
      }
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType,
          userEmail: currentUser.email,
          userName: currentUser.name,
          userId: currentUser.id,
          origin: typeof window !== 'undefined' ? window.location.origin : ''
        })
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // Redirigir a la pasarela oficial y encriptada de Stripe Checkout
        window.location.href = data.url;
        return;
      }

      // Si Stripe reporta un error (por ejemplo, cuenta en proceso de activación)
      console.error('Error desde Stripe Checkout API:', data);
      setErrorMessage(
        data.error || 'No se pudo generar la sesión de pago con Stripe. Por favor verifica que tu cuenta de Stripe tenga los cobros activados en su Dashboard.'
      );
    } catch (err: any) {
      console.error('Error de red al llamar a Stripe:', err);
      setErrorMessage(
        'Error de conexión con el servidor de pagos. Por seguridad, no se ha otorgado acceso hasta que Stripe confirme la transacción.'
      );
    } finally {
      setIsProcessing(false);
    }
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

          <div className="mb-2.5">
            <img 
              src="/images/docentia-logo-white.png" 
              alt="DOCENTIA Red Educativa" 
              className="h-6 sm:h-7 w-auto object-contain" 
            />
          </div>

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

          <div className="mt-3.5 flex flex-wrap items-baseline gap-2 bg-white/10 p-3 rounded-2xl border border-white/15">
            <span className="text-2xl sm:text-3xl font-black text-white">${price}</span>
            <span className="text-xs sm:text-sm font-bold text-slate-300">USD / mes</span>
            <span className="text-xs font-semibold text-slate-300">(aprox. ${priceMxn} MXN)</span>
            <span className="ml-auto text-[10px] sm:text-[11px] font-semibold text-serene-200 bg-white/10 px-2.5 py-0.5 rounded-full">
              IVA y comisiones incluidos
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
              <span className="font-bold">Inicia sesión primero:</span> Debes tener una cuenta registrada para vincular tu certificación de ${price} USD (${priceMxn} MXN).
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

        {/* Mensaje de error si Stripe rechaza el cobro */}
        {errorMessage && (
          <div className="p-4 m-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-950 text-xs space-y-2 animate-in fade-in">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-black text-rose-900">Aviso de la Pasarela de Pagos Stripe:</p>
                <p className="text-[11px] text-rose-800 leading-relaxed mt-0.5">
                  {errorMessage}
                </p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/80 border border-rose-200 text-[11px] text-slate-700">
              <span className="font-bold">🔒 Regla de Acceso Estricta:</span> DOCENTIA no desbloquea permisos ni certificaciones hasta que Stripe confirme que el cobro fue completado y liquidado en tu cuenta bancaria.
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
                  <span>Expediente digital resguardado en Supabase Cloud Storage.</span>
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

        {/* Pasarela Oficial de Stripe Checkout */}
        <form onSubmit={handlePayWithStripe} className="p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-serene-50/40 border border-slate-200/90 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-brand-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Pasarela Oficial Stripe
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                <Lock className="w-3 h-3 text-emerald-600" /> Cifrado Bancario SSL 256-bit
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Serás redirigido a la página oficial y segura de <strong>Stripe Checkout</strong> para ingresar tus datos bancarios (tarjeta de crédito, débito, Apple Pay o Google Pay).
            </p>
            <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs">
              <span className="text-slate-500">Monto total a cobrar:</span>
              <span className="font-black text-brand-950 text-sm">
                ${price} USD <span className="text-slate-500 font-medium">(${priceMxn} MXN / mes)</span>
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing || !currentUser}
            className={`w-full py-4 rounded-2xl text-white font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
              isDocente
                ? 'bg-gradient-to-r from-serene-700 to-serene-600 hover:from-serene-600 hover:to-serene-500 shadow-serene-900/20'
                : 'bg-gradient-to-r from-brand-950 via-brand-900 to-serene-700 hover:from-brand-900 hover:to-serene-600 shadow-brand-900/20'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Conectando con Stripe Seguro...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Continuar al Pago Seguro con Stripe</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>

          <p className="text-[10px] text-center text-slate-400">
            Tus datos financieros son procesados directamente por Stripe, Inc. DOCENTIA no almacena números de tarjeta.
          </p>
        </form>
        </div>

      </div>
    </div>
  );
};
