import { JobVacancy } from '@/types';

// Helper to play an audible chime on notification dispatch
export function playNotificationChime() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Pleasant two-tone chime (E5 -> B5)
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now); // E5
    osc1.frequency.setValueAtTime(987.77, now + 0.12); // B5
    
    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    
    osc1.start(now);
    osc1.stop(now + 0.5);
  } catch {
    // Audio synthesis fallback silent
  }
}

// Check notification support
export function isNotificationSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'Notification' in window && 'serviceWorker' in navigator;
}

// Get current permission status
export function getNotificationPermission(): NotificationPermission {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
}

// Request permission from the user
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (err) {
    console.error('Error solicitando permisos de notificación:', err);
    return 'denied';
  }
}

// Dispatch a notification for a vacancy to the mobile / desktop system
export async function dispatchVacancyNotification(
  vacancy: JobVacancy, 
  isTest: boolean = false
): Promise<{ success: boolean; message: string }> {
  if (typeof window === 'undefined') {
    return { success: false, message: 'Entorno no soportado.' };
  }

  if (!('Notification' in window)) {
    return { 
      success: false, 
      message: 'Las notificaciones no están soportadas en este navegador.' 
    };
  }

  // Request permission if not already decided
  let permission = Notification.permission;
  if (permission === 'default') {
    permission = await requestNotificationPermission();
  }

  if (permission !== 'granted') {
    return { 
      success: false, 
      message: 'Permiso de notificaciones denegado. Actívalo en la configuración de tu navegador o celular.' 
    };
  }

  // Format notification content
  const isUrgent = vacancy.isUrgentSubstitute;
  const levelLabels: Record<string, string> = {
    inicial_preescolar: 'Preescolar',
    primaria: 'Primaria',
    secundaria: 'Secundaria',
    preparatoria_bachillerato: 'Bachillerato',
    universidad_superior: 'Universidad',
    posgrado: 'Posgrado',
    educacion_especial: 'Educación Especial',
    idiomas: 'Idiomas'
  };

  const levelName = levelLabels[vacancy.educationalLevel] || vacancy.educationalLevel;
  const salaryText = vacancy.salaryMin ? `$${vacancy.salaryMin.toLocaleString()} ${vacancy.salaryPeriod}` : 'A convenir';

  const title = isUrgent
    ? `🚨 DOCENTIA SOS: ${vacancy.title}`
    : `📢 Nueva Vacante: ${vacancy.title}`;

  const body = isUrgent
    ? `¡URGENTE! ${vacancy.schoolName} (${vacancy.location.city}) requiere profesor de ${levelName}. Sueldo: ${salaryText}. ¡Toca para postularte ya!`
    : `${vacancy.schoolName} (${vacancy.location.city}) publicó convocatoria para ${levelName}. Sueldo: ${salaryText}. ¡Toca para ver requisitos!`;

  const payload = {
    title: isTest ? `🔔 [PRUEBA CELULAR] ${title}` : title,
    body,
    icon: '/icons/icon-192.png',
    badge: '/images/docentia-isotype.png',
    image: isUrgent ? '/images/docentia-avatar-sos.png' : '/images/docentia-avatar-vacantes.png',
    vibrate: isUrgent ? [300, 150, 300, 150, 300] : [200, 100, 200, 100, 200],
    data: {
      url: `/?tab=vacantes&id=${vacancy.id}`,
      vacancyId: vacancy.id
    },
    tag: `docentia-vacancy-${vacancy.id}`
  };

  // Play audio alert on device
  playNotificationChime();

  // 1. Try Service Worker Registration (native background & lockscreen notification on Android/iOS/Desktop)
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.ready;
      if (reg && reg.showNotification) {
        await reg.showNotification(payload.title, {
          body: payload.body,
          icon: payload.icon,
          badge: payload.badge,
          vibrate: payload.vibrate,
          data: payload.data,
          tag: payload.tag,
          renotify: true,
          requireInteraction: true
        } as any);

        // Also post message to SW to keep clients synced
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'SHOW_VACANCY_NOTIFICATION',
            payload
          });
        }

        return { 
          success: true, 
          message: isTest 
            ? '¡Notificación de prueba enviada con éxito a tu celular! Revisa la barra de estado.'
            : '¡Notificación de vacante transmitida a todos los dispositivos instalados!'
        };
      }
    } catch (swErr) {
      console.warn('SW notification fallback to window Notification:', swErr);
    }
  }

  // 2. Direct Notification Fallback
  try {
    const notif = new Notification(payload.title, {
      body: payload.body,
      icon: payload.icon,
      badge: payload.badge,
      vibrate: payload.vibrate,
      data: payload.data,
      tag: payload.tag
    } as any);

    notif.onclick = () => {
      window.focus();
      if (payload.data?.url) {
        window.location.href = payload.data.url;
      }
      notif.close();
    };

    return { 
      success: true, 
      message: isTest 
        ? '¡Notificación de prueba enviada a tu dispositivo!'
        : '¡Alerta de vacante generada exitosamente!'
    };
  } catch (err: any) {
    return { 
      success: false, 
      message: `Error al emitir notificación: ${err?.message || 'Permiso o configuración no permitida'}` 
    };
  }
}
