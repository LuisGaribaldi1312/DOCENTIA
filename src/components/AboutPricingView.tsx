'use client';

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Flame, 
  FileCheck2, 
  CreditCard, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  Users, 
  Target, 
  Eye, 
  Award, 
  Check, 
  X,
  ChevronDown,
  Lock
} from 'lucide-react';
import { EducationalLevel, UserAccount } from '@/types';

interface AboutPricingViewProps {
  onGoToVacancies: () => void;
  onGoToRegisterTeacher: () => void;
  onGoToRegisterSchool: () => void;
  currentUser?: UserAccount | null;
  onSelectPlan?: (plan: 'docente_5usd' | 'escuela_10usd') => void;
}

export const AboutPricingView: React.FC<AboutPricingViewProps> = ({
  onGoToVacancies,
  onGoToRegisterTeacher,
  onGoToRegisterSchool,
  currentUser,
  onSelectPlan
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'docente' | 'escuela' | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Checkout modal form
  const [checkoutModal, setCheckoutModal] = useState<boolean>(false);
  const [billingPeriod, setBillingPeriod] = useState<'mensual' | 'anual'>('mensual');
  const [checkoutName, setCheckoutName] = useState(currentUser?.name || '');
  const [checkoutEmail, setCheckoutEmail] = useState(currentUser?.email || '');
  const [checkoutCard, setCheckoutCard] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleOpenPlan = (plan: 'docente' | 'escuela') => {
    if (onSelectPlan) {
      onSelectPlan(plan === 'docente' ? 'docente_5usd' : 'escuela_10usd');
    } else {
      setSelectedPlan(plan);
      setCheckoutModal(true);
    }
  };

  const handleProcessCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setCheckoutModal(false);
      if (selectedPlan === 'docente') {
        onGoToRegisterTeacher();
      } else {
        onGoToRegisterSchool();
      }
    }, 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 3000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: '¿Qué es DOCENTIA y en qué se diferencia de otras bolsas de trabajo?',
      a: 'DOCENTIA es la primera plataforma y aplicación web (PWA) diseñada exclusivamente para el ámbito educativo. A diferencia de bolsas de trabajo genéricas como LinkedIn, Computrabajo o Indeed, en DOCENTIA validamos la Cédula Profesional del maestro, cotejamos su expediente de documentos obligatorios (título, antecedentes no penales, certificaciones) y permitimos a las escuelas públicas y privadas publicar convocatorias con esquemas claros (planta, contrato determinado u honorarios), además de cubrir interinatos de emergencia en 48 horas con el sistema "Docente SOS".'
    },
    {
      q: '¿Por qué tiene un costo la suscripción de docentes ($5 USD/mes)?',
      a: 'La cuota de $5 USD mensuales (aprox. $95 - $100 MXN) cubre el proceso de cotejo documental y la certificación oficial de tu Cédula Profesional y expediente ante las escuelas aliadas. Como Docente Verificado, obtienes el distintivo oficial de confianza, almacenamiento ilimitado de tus documentos en la nube, postulación en un solo clic y prioridad absoluta en las alertas de interinatos urgentes de tu zona.'
    },
    {
      q: '¿Qué incluye la suscripción institucional para escuelas ($10 USD/mes)?',
      a: 'Por solo $10 USD mensuales (aprox. $190 - $200 MXN), las instituciones educativas (públicas o colegios privados) obtienen publicaciones ilimitadas de plazas docentes para todos los niveles educativos, acceso completo a los expedientes de maestros certificados, un panel ATS con gestión de etapas de selección, agenda de Clases Muestra y difusión de vacantes urgentes por suplencias e incapacidades.'
    },
    {
      q: '¿Cómo funciona el sistema "Docente SOS" de interinatos urgentes?',
      a: 'Cuando una escuela sufre una baja intempestiva o incapacidad médica y requiere un profesor en menos de 48 horas, activa la alerta "Docente SOS". La plataforma notifica de inmediato a los maestros certificados disponibles que residen en el mismo municipio o alcaldía para asegurar la continuidad de clases de los alumnos.'
    },
    {
      q: '¿Puedo cancelar mi suscripción en cualquier momento?',
      a: 'Sí, totalmente. No existen contratos forzosos. Tanto docentes como instituciones pueden cancelar o pausar su suscripción mensual en cualquier momento con un solo clic.'
    }
  ];

  return (
    <div className="w-full space-y-16 pb-12 animate-in fade-in duration-300">
      
      {/* 1. HERO INSTITUCIONAL CORPORATIVO (Edge-to-Edge) */}
      <section className="w-full bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative overflow-hidden border-b border-brand-800/60">
        
        {/* Psychological calming gradient orbs */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-serene-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[250px] bg-prestige-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-full relative z-10 max-w-5xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-serene-300 text-xs font-black tracking-wide backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-prestige-400" />
            <span>LA RED INSTITUCIONAL DE EMPLEO DOCENTE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
            Transformamos la Contratación de Maestros con <span className="text-serene-400">Rigor, Transparencia y Paz</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            DOCENTIA es la plataforma especializada y certificadora que conecta a las escuelas públicas y privadas de todos los niveles educativos con los docentes más calificados, verificando expedientes y garantizando vacantes claras y dignas.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                const el = document.getElementById('planes-precios');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-serene-600 to-serene-700 hover:from-serene-500 hover:to-serene-600 text-white font-black text-sm shadow-xl shadow-serene-900/30 transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              <span>Ver Planes y Certificación</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onGoToVacancies}
              className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-extrabold text-sm backdrop-blur-md transition-all"
            >
              Explorar Bolsa de Vacantes
            </button>
          </div>

          {/* Métricas de Impacto */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 border-t border-white/10 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-serene-400">100%</p>
              <p className="text-xs text-slate-300 font-semibold mt-1">Especializado en Educación</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-prestige-400">48 hrs</p>
              <p className="text-xs text-slate-300 font-semibold mt-1">Cobertura "Docente SOS"</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-serene-400">Cédula</p>
              <p className="text-xs text-slate-300 font-semibold mt-1">Verificación Oficial</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-prestige-400">PWA</p>
              <p className="text-xs text-slate-300 font-semibold mt-1">Android & iOS Instalable</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ¿QUÉ ES DOCENTIA? MISIÓN, VISIÓN Y VALORES */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-serene-50 text-serene-800 border border-serene-200 text-xs font-bold">
              <Award className="w-4 h-4 text-serene-600" />
              <span>NUESTRA RAZÓN DE SER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-brand-950 tracking-tight leading-snug">
              Una plataforma creada por y para la comunidad pedagógica
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              En las bolsas de empleo comunes, los directores de colegios tardan semanas en filtrar currículums no especializados, y los maestros sufren vacantes opacas sin salario explícito o condiciones laborales ambiguas. 
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              <strong>DOCENTIA</strong> nació para resolver esa brecha: somos la plataforma de empleo y certificación docente que brinda un entorno transparente, pacífico y profesional donde cada escuela encuentra a su maestro ideal con su expediente legal y pedagógico en orden.
            </p>
          </div>

          {/* Cards Misión y Visión */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center font-bold">
                <Target className="w-6 h-6 text-brand-700" />
              </div>
              <h3 className="text-lg font-black text-brand-950">Nuestra Misión</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Conectar con rigor pedagógico, agilidad y máxima transparencia a las instituciones educativas con profesores calificados y certificados, asegurando que ninguna aula se quede sin un maestro con verdadera vocación.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-serene-50 text-serene-800 flex items-center justify-center font-bold">
                <Eye className="w-6 h-6 text-serene-700" />
              </div>
              <h3 className="text-lg font-black text-brand-950">Nuestra Visión</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ser el estándar de certificación y empleo docente de mayor confianza y prestigio en Hispanoamérica, dignificando la profesión docente y elevando la calidad educativa de nuestras escuelas.
              </p>
            </div>

            <div className="sm:col-span-2 bg-gradient-to-r from-brand-950 to-serene-950 text-white p-6 sm:p-7 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-serene-400" />
                  Nuestros Valores Centrales
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Rigor Pedagógico · Transparencia Salarial · Seguridad Documental · Vocación Humana
                </p>
              </div>
              <span className="text-xs font-black text-serene-300 px-3 py-1 bg-white/10 rounded-xl shrink-0">
                Ética Educativa
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* 3. SERVICIOS INTEGRALES PARA AMBOS PERFILES */}
      <section className="w-full bg-slate-100/70 py-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 border-y border-slate-200/80">
        <div className="w-full text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold tracking-widest text-serene-700 uppercase">
            SOLUCIONES ESPECIALIZADAS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-950 tracking-tight">
            Todo lo que DOCENTIA ofrece al ecosistema educativo
          </h2>
          <p className="text-sm text-slate-600">
            Diseñamos herramientas a la medida tanto para directores de colegios e instituciones públicas como para maestros titulados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Servicios para Escuelas */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-900 text-white flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6 text-serene-300" />
              </div>
              <div>
                <h3 className="text-xl font-black text-brand-950">Servicios para Instituciones & Escuelas</h3>
                <p className="text-xs text-slate-500 font-semibold">Para escuelas públicas y colegios privados de cualquier nivel</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-serene-600 shrink-0 mt-0.5" />
                <span><strong>Publicador Asistido de Convocatorias:</strong> Define nivel educativo, materias, horario, salario y régimen (planta, contrato u honorarios).</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-serene-600 shrink-0 mt-0.5" />
                <span><strong>Checklist Documental Personalizado:</strong> Solicita en automático título, cédula, antecedentes no penales y certificaciones específicas.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-serene-600 shrink-0 mt-0.5" />
                <span><strong>Panel ATS Escolar:</strong> Gestiona a tus postulantes con etapas claras: <em>En Revisión, Clase Muestra, Entrevista y Aceptado</em>.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-serene-600 shrink-0 mt-0.5" />
                <span><strong>Bolsa de Emergencia "Docente SOS":</strong> Recluta suplentes e interinatos urgentes en menos de 48 horas ante incapacidades.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-serene-600 shrink-0 mt-0.5" />
                <span><strong>Sello de Escuela Verificada con CCT:</strong> Mayor atractivo y reputación para captar a los docentes más capacitados.</span>
              </li>
            </ul>

            <button
              onClick={() => handleOpenPlan('escuela')}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-black text-xs transition-colors shadow-sm"
            >
              Registrar Mi Escuela · $10 USD / mes
            </button>
          </div>

          {/* Servicios para Maestros */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-serene-700 text-white flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-brand-950">Servicios para Maestros & Profesores</h3>
                <p className="text-xs text-slate-500 font-semibold">Desde nivel inicial hasta nivel universitario y posgrados</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-serene-600 shrink-0 mt-0.5" />
                <span><strong>Expediente Digital Docente:</strong> Resguarda tus títulos, cédula, CV y diplomas en la nube protegida para postular en 1 clic.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-serene-600 shrink-0 mt-0.5" />
                <span><strong>Certificación Oficial de Cédula:</strong> Distintivo de "Docente Verificado" que destaca tu perfil frente a los reclutadores escolares.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-serene-600 shrink-0 mt-0.5" />
                <span><strong>Filtros por Cercanía Geográfica:</strong> Encuentra colegios y escuelas cercanas a tu domicilio para optimizar tu tiempo de traslado.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-serene-600 shrink-0 mt-0.5" />
                <span><strong>Alertas Inmediatas "Docente SOS":</strong> Recibe convocatorias de interinatos y horas clase de ingreso express.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-serene-600 shrink-0 mt-0.5" />
                <span><strong>PWA Móvil en tu Teléfono:</strong> Postula, recibe invitaciones a clase muestra y da seguimiento desde tu celular Android o iOS.</span>
              </li>
            </ul>

            <button
              onClick={() => handleOpenPlan('docente')}
              className="w-full py-3.5 px-4 rounded-xl bg-serene-700 hover:bg-serene-600 text-white font-black text-xs transition-colors shadow-sm"
            >
              Certificar Mi Perfil Docente · $5 USD / mes
            </button>
          </div>

        </div>
      </section>

      {/* 4. PLANES DE PAGO Y CERTIFICACIÓN (CORE USER REQUIREMENT) */}
      <section id="planes-precios" className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 scroll-mt-24">
        
        <div className="w-full text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prestige-100 text-prestige-900 font-extrabold text-xs">
            <CreditCard className="w-3.5 h-3.5 text-prestige-600" />
            <span>TRANSPARENCIA TOTAL SIN COSTOS OCULTOS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-brand-950 tracking-tight">
            Planes de Suscripción & Certificación
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Precios accesibles diseñados para empoderar a la comunidad educativa y garantizar un servicio de calidad premium.
          </p>

          {/* Toggle Mensual / Anual */}
          <div className="flex items-center justify-center gap-3 pt-3">
            <span className={`text-xs font-bold ${billingPeriod === 'mensual' ? 'text-brand-950' : 'text-slate-400'}`}>
              Facturación Mensual
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'mensual' ? 'anual' : 'mensual')}
              className="w-12 h-6 bg-brand-900 rounded-full p-0.5 transition-colors relative"
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${billingPeriod === 'anual' ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-xs font-bold ${billingPeriod === 'anual' ? 'text-serene-700' : 'text-slate-400'}`}>
              Anual <span className="text-[10px] bg-serene-100 text-serene-800 px-1.5 py-0.5 rounded-full">Ahorra 2 meses</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Plan Docente: $5 USD / mes */}
          <div className="bg-white rounded-3xl border-2 border-serene-400/80 p-8 shadow-xl relative flex flex-col justify-between hover:scale-[1.01] transition-transform">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-serene-600 text-white text-[11px] font-black uppercase px-4 py-1 rounded-full shadow-md">
              Para Maestros y Profesores
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-serene-50 text-serene-700 flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-brand-950">Plan Docente Certificado</h3>
                  <p className="text-xs text-slate-500">Acreditación profesional y empleo prioritario</p>
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-brand-950">
                    ${billingPeriod === 'mensual' ? '5' : '50'}
                  </span>
                  <span className="text-sm font-bold text-slate-500">
                    USD / {billingPeriod === 'mensual' ? 'mes' : 'año'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Aprox. $95 MXN al mes · Cancela cuando quieras</p>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-serene-600 shrink-0" />
                  <span><strong>Distintivo Oficial de Docente Verificado</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-serene-600 shrink-0" />
                  <span><strong>Postulaciones Ilimitadas</strong> a escuelas públicas y privadas</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-serene-600 shrink-0" />
                  <span><strong>Expediente Digital Resguardado</strong> (CV, títulos, cédula en PDF)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-serene-600 shrink-0" />
                  <span><strong>Acceso VIP a "Docente SOS"</strong> (Interinatos y reemplazos en 48 hrs)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-serene-600 shrink-0" />
                  <span>Notificaciones push de convocatorias en tu zona de residencia</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-serene-600 shrink-0" />
                  <span>Soporte prioritario y asesoría de perfil pedagógico</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleOpenPlan('docente')}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-serene-600 to-serene-700 hover:from-serene-500 hover:to-serene-600 text-white font-black text-sm shadow-md transition-all hover:shadow-lg"
            >
              Comenzar Certificación Docente ($5 USD)
            </button>
          </div>

          {/* Plan Escuela: $10 USD / mes */}
          <div className="bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-8 shadow-2xl relative flex flex-col justify-between border-2 border-brand-700/80 hover:scale-[1.01] transition-transform">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-prestige-500 text-white text-[11px] font-black uppercase px-4 py-1 rounded-full shadow-md">
              Para Instituciones y Escuelas
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-serene-300 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Plan Institución Verificada</h3>
                  <p className="text-xs text-slate-300">Reclutamiento escolar y ATS ilimitado</p>
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white">
                    ${billingPeriod === 'mensual' ? '10' : '100'}
                  </span>
                  <span className="text-sm font-bold text-slate-300">
                    USD / {billingPeriod === 'mensual' ? 'mes' : 'año'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Aprox. $190 MXN al mes · Factura fiscal disponible</p>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-200 mb-8">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-prestige-400 shrink-0" />
                  <span><strong>Publicación Ilimitada de Plazas y Vacantes</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-prestige-400 shrink-0" />
                  <span><strong>Acceso Completo a Expedientes</strong> de maestros certificados</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-prestige-400 shrink-0" />
                  <span><strong>Panel ATS Escolar:</strong> Pipeline de selección y agenda de clase muestra</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-prestige-400 shrink-0" />
                  <span><strong>Llamados de Emergencia "Docente SOS"</strong> sin costo adicional</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-prestige-400 shrink-0" />
                  <span><strong>Insignia de Escuela Verificada con CCT</strong> oficial</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-prestige-400 shrink-0" />
                  <span>Soporte institucional dedicado y atención a directivos</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleOpenPlan('escuela')}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-prestige-500 to-prestige-600 hover:from-prestige-400 hover:to-prestige-500 text-white font-black text-sm shadow-md transition-all hover:shadow-lg"
            >
              Registrar Institución ($10 USD)
            </button>
          </div>

        </div>

      </section>

      {/* 5. PREGUNTAS FRECUENTES (FAQ) */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-extrabold text-serene-700 uppercase tracking-widest">
            RESOLVEMOS TUS DUDAS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-950 mt-1">
            Preguntas Frecuentes
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-brand-950 hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-serene-600' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONTACTO INSTITUCIONAL */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-serene-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-brand-800/60 max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-serene-300">
                ATENCIÓN INSTITUCIONAL
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                ¿Tienes dudas sobre convenios escolares o certificación?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Nuestro equipo pedagógico y legal está listo para asesorar a tu colegio o resolver cualquier inquietud de registro docente.
              </p>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-serene-400" />
                  <span>contacto@docentia.edu.mx · soporte@docentia.edu.mx</span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Línea Directa / WhatsApp: +52 55 1234 5678</span>
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-prestige-400" />
                  <span>Ciudad de México · Cobertura Nacional e Internacional</span>
                </p>
              </div>
            </div>

            {/* Formulario de Contacto Rápido */}
            <form onSubmit={handleContactSubmit} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Nombre o Institución</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Tu nombre o nombre del colegio"
                  className="w-full p-2.5 rounded-xl bg-white/15 border border-white/20 text-white placeholder:text-slate-400 focus:outline-hidden focus:border-serene-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="w-full p-2.5 rounded-xl bg-white/15 border border-white/20 text-white placeholder:text-slate-400 focus:outline-hidden focus:border-serene-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Mensaje o Consulta</label>
                <textarea
                  required
                  rows={3}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Escribe tu consulta institucional..."
                  className="w-full p-2.5 rounded-xl bg-white/15 border border-white/20 text-white placeholder:text-slate-400 focus:outline-hidden focus:border-serene-400"
                />
              </div>

              {contactSent ? (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-center font-bold">
                  ✓ ¡Mensaje enviado con éxito! Nos comunicaremos en breve.
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-serene-600 hover:bg-serene-500 text-white font-black text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Enviar Consulta
                </button>
              )}
            </form>

          </div>

        </div>
      </section>

      {/* 7. MODAL DE REGISTRO & CHECKOUT DE SUSCRIPCIÓN */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 text-slate-800">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-serene-700">
                  {selectedPlan === 'docente' ? 'Plan Docente Certificado' : 'Plan Institución Verificada'}
                </span>
                <h3 className="text-xl font-black text-brand-950">
                  {selectedPlan === 'docente' ? '$5 USD / Mes' : '$10 USD / Mes'}
                </h3>
              </div>

              <button
                onClick={() => setCheckoutModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {checkoutSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-black text-brand-950">¡Suscripción Confirmada!</h4>
                <p className="text-xs text-slate-500">
                  Redirigiendo a tu panel de {selectedPlan === 'docente' ? 'Expediente Docente' : 'Publicación Escolar'}...
                </p>
              </div>
            ) : (
              <form onSubmit={handleProcessCheckout} className="space-y-3.5 text-xs">
                
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {selectedPlan === 'docente' ? 'Nombre Completo del Maestro' : 'Nombre Oficial de la Escuela / Plantel'}
                  </label>
                  <input
                    type="text"
                    required
                    value={checkoutName}
                    onChange={(e) => setCheckoutName(e.target.value)}
                    placeholder={selectedPlan === 'docente' ? 'Mtro. Luis Alberto Garibaldi' : 'Colegio Bilingüe Nueva Inglaterra'}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Correo Electrónico de la Cuenta</label>
                  <input
                    type="email"
                    required
                    value={checkoutEmail}
                    onChange={(e) => setCheckoutEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Número de Tarjeta (Simulación Segura)</label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={checkoutCard}
                      onChange={(e) => setCheckoutCard(e.target.value)}
                      placeholder="4532 •••• •••• 8921"
                      className="w-full pl-9 p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-serene-500 font-mono"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-slate-600 text-[11px]">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    Pago encriptado con protocolo SSL 256-bit
                  </span>
                  <span className="font-bold text-brand-950">
                    Total: {selectedPlan === 'docente' ? '$5.00 USD' : '$10.00 USD'}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-950 to-serene-700 text-white font-black text-xs transition-all shadow-md hover:scale-[1.01]"
                >
                  Activar Suscripción & Acceder
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
