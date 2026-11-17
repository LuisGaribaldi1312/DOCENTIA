'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Send,
  Volume2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { JobVacancy } from '@/types';
import { 
  getNotificationPermission, 
  requestNotificationPermission, 
  dispatchVacancyNotification 
} from '@/lib/notifications';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancies: JobVacancy[];
  onSelectVacancy?: (vacancy: JobVacancy) => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  vacancies,
  onSelectVacancy
}) => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPermission(getNotificationPermission());
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    const res = await requestNotificationPermission();
    setPermission(res);
    if (res === 'granted') {
      setTestResult('¡Permiso concedido! Ahora puedes probar cómo llegan las alertas a tu celular.');
    } else {
      setTestResult('No se concedieron permisos. Si deseas recibirlas, habilítalas en los ajustes de tu navegador o celular.');
    }
  };

  const handleSendTest = async (type: 'sos' | 'normal') => {
    setIsSending(true);
    setTestResult(null);

    // Pick appropriate vacancy to test
    const sosVacancy = vacancies.find(v => v.isUrgentSubstitute) || vacancies[0];
    const normalVacancy = vacancies.find(v => !v.isUrgentSubstitute) || vacancies[0];
    const targetVacancy = type === 'sos' ? sosVacancy : normalVacancy;

    const result = await dispatchVacancyNotification(targetVacancy, true);
    setIsSending(false);
    setPermission(getNotificationPermission());
    setTestResult(result.message);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
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

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-serene-500/20 text-serene-300 border border-serene-400/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <Bell className="w-3 h-3 text-serene-400" />
              Notificaciones Push para Celulares
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white">
            Alertas Inmediatas de Vacantes en tu Celular
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Recibe avisos en la barra de estado y pantalla de bloqueo de tu dispositivo cada vez que una escuela pública o privada publique una plaza o interinato.
          </p>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto overscroll-contain flex-1 p-5 sm:p-6 space-y-5 text-slate-700 text-xs sm:text-sm">
          
          {/* Permission Status Box */}
          <div className={`p-4 rounded-2xl border transition-all ${
            permission === 'granted'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : permission === 'denied'
              ? 'bg-rose-50 border-rose-200 text-rose-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                {permission === 'granted' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : permission === 'denied' ? (
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                ) : (
                  <Smartphone className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-extrabold text-xs sm:text-sm mb-0.5">
                  {permission === 'granted'
                    ? 'Notificaciones Activas en este Celular ✓'
                    : permission === 'denied'
                    ? 'Notificaciones Bloqueadas en el Navegador'
                    : 'Activa los Permisos en tu Dispositivo'}
                </h4>
                <p className="text-[11px] sm:text-xs opacity-90 leading-relaxed">
                  {permission === 'granted'
                    ? 'Tu dispositivo está listo para recibir avisos instantáneos de convocatorias docentes y coberturas de emergencia.'
                    : permission === 'denied'
                    ? 'Para activarlas, toca el icono de candado 🔒 junto a la dirección web y selecciona "Permitir notificaciones".'
                    : 'Permite las notificaciones para que tu teléfono te avise al instante de nuevas vacantes con sonido y vibración.'}
                </p>

                {permission !== 'granted' && permission !== 'denied' && (
                  <button
                    onClick={handleRequestPermission}
                    className="mt-3 px-4 py-2 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Activar Notificaciones Ahora</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Feedback Test Result */}
          {testResult && (
            <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
              <Volume2 className="w-4 h-4 text-serene-600 shrink-0" />
              <span>{testResult}</span>
            </div>
          )}

          {/* Testing Panel for Existing Vacancies */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-brand-950 uppercase tracking-wider flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-serene-600" />
              <span>Probar Alerta en este Celular Ahora</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Prueba cómo vibrará y sonará tu teléfono cuando las escuelas publiquen una vacante de las que ya están registradas:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Test SOS Button */}
              <button
                type="button"
                disabled={isSending}
                onClick={() => handleSendTest('sos')}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-prestige-500/10 via-amber-500/10 to-transparent border border-prestige-300 hover:border-prestige-500 text-left transition-all hover:scale-[1.01] group shadow-2xs"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="p-1.5 rounded-lg bg-prestige-100 text-prestige-700 group-hover:bg-prestige-500 group-hover:text-white transition-colors">
                    <Flame className="w-4 h-4" />
                  </span>
                  <span className="font-black text-xs text-prestige-800">Alerta Urgente SOS</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Simula una suplencia escolar inmediata en menos de 48 hrs con sonido y vibración urgente.
                </p>
                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-extrabold text-prestige-700">
                  <span>Enviar a mi Celular</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              {/* Test Normal Vacancy Button */}
              <button
                type="button"
                disabled={isSending}
                onClick={() => handleSendTest('normal')}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-serene-500/10 via-emerald-500/10 to-transparent border border-serene-300 hover:border-serene-500 text-left transition-all hover:scale-[1.01] group shadow-2xs"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="p-1.5 rounded-lg bg-serene-100 text-serene-700 group-hover:bg-serene-600 group-hover:text-white transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <span className="font-black text-xs text-serene-800">Vacante Regular</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Simula la publicación de una plaza de primaria, secundaria o preparatoria.
                </p>
                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-extrabold text-serene-700">
                  <span>Enviar a mi Celular</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </div>
          </div>

          {/* Automations Info */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h5 className="text-[11px] font-black text-brand-950 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Transmisión Automática en Producción</span>
            </h5>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Cada vez que una institución educativa llena el formulario y publica una nueva vacante en el panel, el sistema emite automáticamente la señal a todos los celulares y tablets donde DOCENTIA se encuentre instalada.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 font-medium">
            Compatible con Android, iOS (Safari) y Escritorio
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold text-xs transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
