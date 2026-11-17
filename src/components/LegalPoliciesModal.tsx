'use client';

import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Lock, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  GraduationCap, 
  UserCheck, 
  Eye, 
  HelpCircle,
  Download
} from 'lucide-react';

interface LegalPoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'terminos' | 'privacidad' | 'manejo_datos' | 'seguridad';
  onAcceptAndAuthorize?: () => void;
  showAcceptButton?: boolean;
}

export const LegalPoliciesModal: React.FC<LegalPoliciesModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'terminos',
  onAcceptAndAuthorize,
  showAcceptButton = false
}) => {
  const [activeTab, setActiveTab] = useState<'terminos' | 'privacidad' | 'manejo_datos' | 'seguridad'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200/90 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header Institucional */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-brand-950 via-brand-900 to-serene-900 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Marco Legal y Jurídico Oficial
            </span>
            <span className="text-slate-400 text-xs">• Vigencia 2026-2027</span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
            Términos de Uso, Privacidad y Manejo Seguro de Datos Personales
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Protección legal integral para Docentes e Instituciones Educativas en cumplimiento con la legislación de protección de datos personales, deslinde patronal y verificación documental.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto scrollbar-none px-4 pt-2 gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('terminos')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'terminos'
                ? 'bg-white text-brand-950 border-serene-600 shadow-xs'
                : 'text-slate-600 hover:text-brand-900 border-transparent hover:bg-slate-100'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-serene-600" />
            <span>Términos y Condiciones</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacidad')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'privacidad'
                ? 'bg-white text-brand-950 border-serene-600 shadow-xs'
                : 'text-slate-600 hover:text-brand-900 border-transparent hover:bg-slate-100'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Aviso de Privacidad (LFPDPPP)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('manejo_datos')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'manejo_datos'
                ? 'bg-white text-brand-950 border-serene-600 shadow-xs'
                : 'text-slate-600 hover:text-brand-900 border-transparent hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Manejo de Expedientes & Consentimiento</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('seguridad')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'seguridad'
                ? 'bg-white text-brand-950 border-serene-600 shadow-xs'
                : 'text-slate-600 hover:text-brand-900 border-transparent hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>Seguridad & Privacidad entre Escuelas</span>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto overscroll-contain flex-1 p-5 sm:p-8 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-6">
          
          {/* TAB 1: TÉRMINOS Y CONDICIONES */}
          {activeTab === 'terminos' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-950 text-xs">
                <p className="font-extrabold flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  IMPORTANTE: DESLINDE DE RESPONSABILIDAD LABORAL Y PATRONAL
                </p>
                <p>
                  DOCENTIA Red Educativa opera exclusivamente como una plataforma tecnológica y certificadora de vinculación académica. DOCENTIA <strong>NO</strong> es patrón, ni empleador sustituto, ni solidario, ni intermediario laboral subordinado en ninguna relación de trabajo que se pacte entre instituciones educativas y profesores.
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">1. Aceptación del Contrato de Adhesión</h4>
                <p>
                  El acceso, registro y uso de la plataforma DOCENTIA (en su versión web, aplicación móvil instalable o panel administrativo) constituye un contrato vinculante entre el Usuario (Docente o Institución Educativa) y DOCENTIA Red Educativa. Al registrarse o utilizar cualquier servicio, el usuario manifiesta su pleno consentimiento y aceptación expresa a los presentes Términos y Condiciones.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">2. Naturaleza del Servicio y Ausencia de Relación Laboral con DOCENTIA</h4>
                <p>
                  DOCENTIA pone a disposición de la comunidad educativa herramientas de publicación de convocatorias, filtrado ATS, verificación documental de Cédula Profesional y postulación libre. Toda relación jurídica, contractual, salarial, prestacional o de seguridad social derivada de un proceso de selección se celebra de forma directa y exclusiva entre la Institución Educativa contratante y el Docente seleccionado.
                </p>
                <p>
                  DOCENTIA queda exenta de toda reclamación por despido injustificado, retención de salarios, accidentes de trabajo, cargas de seguridad social (IMSS, ISSSTE), prestaciones o litigios laborales colectivos o individuales.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">3. Declaración de Veracidad bajo Protesta de Decir Verdad</h4>
                <p>
                  Los usuarios docentes declaran bajo protesta de decir verdad que toda la información, currículum vitae, títulos universitarios, Cédulas Profesionales, constancias de antecedentes y certificados ingresados a su Expediente Digital son fidedignos, legítimos y vigentes.
                </p>
                <p>
                  Las Instituciones Educativas declaran que cuentan con facultades legales, RVOE o acreditación oficial ante las autoridades educativas competentes (SEP u organismos estatales) para ofertar las vacantes publicadas y que no realizarán cobro alguno a los aspirantes por participar en los procesos.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">4. Sanciones por Falsedad Documental y Fraude</h4>
                <p>
                  Cualquier intento de suplantación de identidad, falsificación de documentos oficiales o emisión de convocatorias ficticias derivará en la baja inmediata y definitiva de la cuenta, la revocación de certificaciones y, de ser el caso, la notificación formal a las autoridades judiciales y a la Dirección General de Profesiones.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">5. Suscripciones y Pagos de Certificación</h4>
                <p>
                  Para habilitar la postulación completa y la publicación institucional, DOCENTIA maneja planes oficiales: Plan Docente de $5 USD mensuales y Plan Escuela de $10 USD mensuales. Las suscripciones son de renovación mensual voluntaria y pueden cancelarse en cualquier momento desde el perfil sin penalización. No proceden reembolsos de mensualidades devengadas con servicio habilitado.
                </p>
              </section>
            </div>
          )}

          {/* TAB 2: AVISO DE PRIVACIDAD */}
          {activeTab === 'privacidad' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/90 text-emerald-950 text-xs">
                <p className="font-extrabold flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
                  CUMPLIMIENTO DE PROTECCIÓN DE DATOS PERSONALES
                </p>
                <p>
                  En apego a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y estándares internacionales de privacidad, tus datos personales, biométricos y académicos se encuentran protegidos bajo los más altos estándares éticos y tecnológicos.
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">1. Responsable del Tratamiento</h4>
                <p>
                  DOCENTIA Red Educativa, con portal oficial en <span className="font-bold text-serene-700">docentia-two.vercel.app</span>, es responsable de recabar, tratar y salvaguardar los datos personales y documentación proporcionada por docentes y directivos escolares.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">2. Datos Personales Recabados</h4>
                <p>Para la prestación del servicio de vinculación docente, se recaban de manera enunciativa más no limitativa:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>Docentes:</strong> Nombre completo, correo electrónico, teléfono, ciudad y estado de residencia, Cédula Profesional, grado máximo de estudios, especialidad pedagógica, historial laboral, cartas de recomendación y constancia de antecedentes no penales.</li>
                  <li><strong>Instituciones:</strong> Razón social de la institución, Clave de Centro de Trabajo (CCT), nombre del directivo responsable, teléfono institucional, dirección del plantel y condiciones laborales de las vacantes.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">3. Finalidades Primarias del Tratamiento</h4>
                <p>Los datos recabados son indispensables para:</p>
                <ol className="list-decimal pl-5 space-y-1 text-slate-600">
                  <li>Crear y autenticar la cuenta de usuario.</li>
                  <li>Generar el Expediente Digital Certificado del maestro.</li>
                  <li>Verificar la autenticidad de la Cédula Profesional ante registros públicos oficiales.</li>
                  <li>Permitir que el docente se postule voluntariamente a las convocatorias emitidas por colegios.</li>
                  <li>Permitir a las escuelas revisar a los candidatos que hayan aplicado expresamente a sus convocatorias.</li>
                </ol>
              </section>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">4. No Comercialización de Datos</h4>
                <p>
                  DOCENTIA se compromete a <strong>NO comercializar, vender, alquilar ni ceder</strong> las bases de datos de docentes ni de instituciones a empresas de telemarketing, financieras, aseguradoras ni a terceros no vinculados con el proceso educativo.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">5. Ejercicio de Derechos ARCO</h4>
                <p>
                  Usted tiene derecho en todo momento a ejercer sus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong> respecto a sus datos personales. Para solicitar la eliminación definitiva de su cuenta o modificación de su expediente, puede enviar una solicitud a <span className="font-mono font-bold text-serene-700">privacidad@docentia.com</span>.
                </p>
              </section>
            </div>
          )}

          {/* TAB 3: MANEJO DE EXPEDIENTES & CONSENTIMIENTO */}
          {activeTab === 'manejo_datos' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/90 text-blue-950 text-xs">
                <p className="font-extrabold flex items-center gap-2 mb-1">
                  <UserCheck className="w-4 h-4 text-blue-700 shrink-0" />
                  CONSENTIMIENTO EXPRESO PARA EL EXPEDIENTE DIGITAL
                </p>
                <p>
                  Al activar tu cuenta, autorizas de manera informada y expresa el tratamiento de tus constancias y documentos académicos exclusivamente para fines de contratación docente.
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">1. Transferencia Controlada de Expedientes</h4>
                <p>
                  El Expediente Digital del Docente (que incluye Cédula, currículum y documentos acreditativos) se encuentra en un entorno de acceso restringido. Dicho expediente <strong>SOLAMENTE</strong> se comparte y se hace visible para una escuela cuando el docente hace clic voluntario en "Postularme a esta Vacante".
                </p>
                <p>
                  Ninguna institución puede navegar o descargar expedientes de docentes que no hayan solicitado plaza de trabajo en sus convocatorias.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">2. Deber de Secreto y Confidencialidad de las Escuelas</h4>
                <p>
                  Las escuelas e instituciones que reciban expedientes docentes asumen la obligación ineludible de confidencialidad y secreto profesional. Queda estrictamente prohibido compartir, transferir o duplicar los expedientes recibidos para fines ajenos al reclutamiento escolar de la vacante en cuestión.
                </p>
                <p>
                  Cualquier mal uso por parte de una institución escolar será de su exclusiva responsabilidad civil y penal, facultando a DOCENTIA a rescindir su acceso de forma inmediata.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">3. Protocolo de Cotejo de Antecedentes y RVOE</h4>
                <p>
                  DOCENTIA podrá realizar validaciones automatizadas de registro de Cédulas y CCT escolares. El usuario acepta que los resultados de certificación (Perfil Verificado) se muestren de forma pública como distintivo de autenticidad institucional.
                </p>
              </section>
            </div>
          )}

          {/* TAB 4: SEGURIDAD & PRIVACIDAD ENTRE ESCUELAS */}
          {activeTab === 'seguridad' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200/90 text-purple-950 text-xs">
                <p className="font-extrabold flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0" />
                  AISLAMIENTO ESTRICTO DE PRIVACIDAD INSTITUCIONAL
                </p>
                <p>
                  Diseñado con arquitectura de compartimentación estricta para garantizar que ninguna institución escolar tenga acceso a los aspirantes ni a las métricas de contratación de escuelas competidoras.
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">1. Regla de Oro: Privacidad Entre Instituciones</h4>
                <p>
                  Cada institución escolar registrada cuenta con un panel ATS aislado. Ninguna escuela puede visualizar:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Los postulantes de otra escuela pública o privada.</li>
                  <li>Las notas de entrevista o evaluaciones internas de candidatos ajenos.</li>
                  <li>Los salarios o paquetes de contratación no publicados abiertamente.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">2. Encriptación en Tránsito y Reposo</h4>
                <p>
                  Todas las comunicaciones y archivos transmitidos a través de DOCENTIA utilizan cifrado de grado bancario (TLS 1.3 / HTTPS), asegurando la integridad de los documentos frente a accesos no autorizados o intercepciones en la red.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">3. Auditoría y Registro de Accesos</h4>
                <p>
                  Cada apertura de expediente y postulación queda registrada con marca de tiempo e identificador de sesión para auditoría forense en caso de controversia legal sobre divulgación de datos.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-black text-brand-950 text-sm sm:text-base">4. Jurisdicción y Ley Aplicable</h4>
                <p>
                  Para la interpretación y cumplimiento de estas políticas, las partes se someten expresamente a la legislación federal aplicable en los Estados Unidos Mexicanos y a los tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles por razón de sus domicilios presentes o futuros.
                </p>
              </section>
            </div>
          )}

        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 text-center sm:text-left">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Documento Jurídico Vinculante para todos los Usuarios de DOCENTIA</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors w-full sm:w-auto"
            >
              Cerrar
            </button>

            {showAcceptButton && onAcceptAndAuthorize && (
              <button
                onClick={() => {
                  onAcceptAndAuthorize();
                  onClose();
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-950 via-brand-900 to-serene-700 hover:from-brand-900 hover:to-serene-600 text-white font-black text-xs shadow-md transition-all w-full sm:w-auto flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>He Leído y Autorizo</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
