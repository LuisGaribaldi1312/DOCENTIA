import { JobVacancy, EducationalLevel, ContractType } from '@/types';

export const INITIAL_VACANCIES: JobVacancy[] = [
  {
    id: 'vac-001',
    title: 'Profesor(a) de Matemáticas y Física - Nivel Secundaria',
    schoolName: 'Colegio Bilingüe Nueva Inglaterra',
    schoolType: 'privada',
    cct: '09PES0412X',
    educationalLevel: 'secundaria',
    subjects: ['Matemáticas', 'Física', 'Álgebra'],
    description: 'Buscamos docente apasionado(a) por la enseñanza de ciencias exactas con metodología activa y proyectos STEAM para grupos de 1º a 3º de secundaria. Excelente ambiente laboral, grupos reducidos y equipamiento tecnológico de vanguardia.',
    salaryMin: 18000,
    salaryMax: 24000,
    salaryPeriod: 'mensual',
    contractDuration: 'Ciclo Escolar 2026-2027 (Renovable a planta)',
    contractType: 'planta_permanente',
    scheduleType: 'tiempo_completo',
    shift: 'matutino',
    modality: 'presencial',
    location: {
      state: 'Ciudad de México',
      city: 'Benito Juárez',
      address: 'Av. Coyoacán 1420, Col. Del Valle',
      postalCode: '03100'
    },
    requiredDocuments: [
      'Título Profesional en Pedagogía, Matemáticas, Física o Ingeniería',
      'Cédula Profesional Federal',
      'Currículum Vitae con Fotografía',
      'Constancia de Situación Fiscal (SAT)',
      'Constancia de No Antecedentes Penales (vigencia no mayor a 3 meses)',
      '2 Cartas de Recomendación Laboral / Académica'
    ],
    requirements: {
      minDegree: 'Licenciatura Titulada',
      requireProfessionalLicense: true,
      minExperienceYears: 2,
      specialRequirements: 'Manejo de plataformas educativas (Google Classroom / Canvas) y dinámicas STEAM.'
    },
    isUrgentSubstitute: false,
    status: 'activa',
    createdAt: '2026-11-14',
    applicantsCount: 6
  },
  {
    id: 'vac-002',
    title: 'Docente de Inglés Avanzado (Certificación Cambridge / TOEFL)',
    schoolName: 'Instituto Tecnológico & Preparatoria Vallarta',
    schoolType: 'privada',
    cct: '14PBH0198Z',
    educationalLevel: 'preparatoria_bachillerato',
    subjects: ['Lengua Extranjera Inglés', 'Business English'],
    description: 'Se solicita profesor para impartir inglés en bachillerato con preparación para exámenes internacionales. Horario flexible por horas clase o medio tiempo según disponibilidad.',
    salaryMin: 350,
    salaryMax: 450,
    salaryPeriod: 'hora',
    contractDuration: 'Semestre Enero - Julio 2027',
    contractType: 'honorarios',
    scheduleType: 'por_horas',
    shift: 'vespertino',
    modality: 'hibrido',
    location: {
      state: 'Jalisco',
      city: 'Puerto Vallarta',
      address: 'Boulevard Francisco Medina Ascencio 2100',
      postalCode: '48333'
    },
    requiredDocuments: [
      'Título Profesional o Licenciatura en Enseñanza del Idioma Inglés',
      'Cédula Profesional',
      'Certificación CENNI Nivel 14+ o TOEFL iBT 100+ / C1 Advanced',
      'CV Actualizado',
      'Constancia de Situación Fiscal con régimen de honorarios'
    ],
    requirements: {
      minDegree: 'Licenciatura o Certificación Internacional equivalente',
      requireProfessionalLicense: true,
      minExperienceYears: 3,
      specialRequirements: 'Acreditación vigente como examinador Cambridge deseable.'
    },
    isUrgentSubstitute: false,
    status: 'activa',
    createdAt: '2026-11-15',
    applicantsCount: 11
  },
  {
    id: 'vac-003',
    title: 'URGENTE: Maestro(a) de Primaria 3er Grado (Interinato por Incapacidad)',
    schoolName: 'Escuela Primaria Federalizada Lic. Benito Juárez',
    schoolType: 'publica',
    cct: '15DPR1890A',
    educationalLevel: 'primaria',
    subjects: ['Español', 'Matemáticas', 'Ciencias Naturales', 'Geografía'],
    description: 'COBERTURA URGENTE ("Docente SOS"): Interinato de 4 meses con posibilidad de extensión para atender grupo de 3º grado de primaria. Turno matutino. Incorporación inmediata en 48 horas.',
    salaryMin: 14500,
    salaryMax: 16800,
    salaryPeriod: 'mensual',
    contractDuration: '4 Meses (Diciembre 2026 - Marzo 2027)',
    contractType: 'contrato_determinado',
    scheduleType: 'tiempo_completo',
    shift: 'matutino',
    modality: 'presencial',
    location: {
      state: 'Estado de México',
      city: 'Toluca',
      address: 'Calle Independencia 504, Centro',
      postalCode: '50000'
    },
    requiredDocuments: [
      'Título Profesional de Licenciatura en Educación Primaria / Normalista',
      'Cédula Profesional',
      'Acta de Nacimiento y CURP',
      'Constancia de No Inhabilitación para el Servicio Público',
      'Carta de Antecedentes No Penales'
    ],
    requirements: {
      minDegree: 'Licenciatura en Educación Primaria',
      requireProfessionalLicense: true,
      minExperienceYears: 1,
      specialRequirements: 'Disponibilidad de incorporación inmediata esta misma semana.'
    },
    isUrgentSubstitute: true,
    status: 'activa',
    createdAt: '2026-11-16',
    applicantsCount: 3
  },
  {
    id: 'vac-004',
    title: 'Catedrático(a) Universitario de Inteligencia Artificial y Algoritmos',
    schoolName: 'Universidad Politécnica Metropolitana',
    schoolType: 'publica',
    cct: '19MSU0045B',
    educationalLevel: 'universidad_superior',
    subjects: ['Inteligencia Artificial', 'Estructuras de Datos', 'Machine Learning'],
    description: 'Impartición de cátedra en Ingeniería en Software y Ciencias Computacionales. Enfoque práctico con proyectos de investigación aplicada y vinculación tecnológica.',
    salaryMin: 28000,
    salaryMax: 36000,
    salaryPeriod: 'mensual',
    contractDuration: 'Ciclo Anual con Prestaciones Superiores de Ley',
    contractType: 'planta_permanente',
    scheduleType: 'tiempo_completo',
    shift: 'mixto',
    modality: 'hibrido',
    location: {
      state: 'Nuevo León',
      city: 'Monterrey',
      address: 'Av. Universidad 1200, Ciudad Universitaria',
      postalCode: '66455'
    },
    requiredDocuments: [
      'Título y Cédula de Maestría o Doctorado en Ciencias Computacionales / IA',
      'CV Académico detallado con publicaciones o experiencia industrial',
      'Constancia de Antecedentes No Penales',
      'Constancia de Situación Fiscal',
      'Comprobante de Domicilio no mayor a 2 meses'
    ],
    requirements: {
      minDegree: 'Maestría o Doctorado Indispensable',
      requireProfessionalLicense: true,
      minExperienceYears: 4,
      specialRequirements: 'Dominio de Python, PyTorch/TensorFlow y experiencia docente a nivel licenciatura/posgrado.'
    },
    isUrgentSubstitute: false,
    status: 'activa',
    createdAt: '2026-11-12',
    applicantsCount: 8
  },
  {
    id: 'vac-005',
    title: 'Educadora / Docente Titular de Preescolar (Kinder 2 y 3)',
    schoolName: 'Centro Infantil y Colegio Montessori Campestre',
    schoolType: 'privada',
    cct: '11PJN0876P',
    educationalLevel: 'inicial_preescolar',
    subjects: ['Desarrollo Infantil', 'Iniciación a la Lectoescritura', 'Psicomotricidad'],
    description: 'Buscamos licenciada en educación preescolar o pedagogía con vocación, paciencia y gusto por metodologías activas y estimulación temprana. Capacitación continua pagada.',
    salaryMin: 13000,
    salaryMax: 16500,
    salaryPeriod: 'mensual',
    contractDuration: 'Contrato Anual con Seguro de Gastos Médicos Mayores',
    contractType: 'planta_permanente',
    scheduleType: 'tiempo_completo',
    shift: 'matutino',
    modality: 'presencial',
    location: {
      state: 'Guanajuato',
      city: 'León',
      address: 'Paseo del Moral 840, Col. Jardines del Moral',
      postalCode: '37160'
    },
    requiredDocuments: [
      'Título en Educación Preescolar / Pedagogía / Psicopedagogía',
      'Cédula Profesional',
      'Certificado Médico y Psicométrico',
      'CV con Referencias Verificables',
      'Constancia de Antecedentes No Penales'
    ],
    requirements: {
      minDegree: 'Licenciatura Terminada',
      requireProfessionalLicense: true,
      minExperienceYears: 1,
      specialRequirements: 'Certificación en primeros auxilios pediátricos es un plus.'
    },
    isUrgentSubstitute: false,
    status: 'activa',
    createdAt: '2026-11-10',
    applicantsCount: 14
  }
];

export const STANDARD_REQUIRED_DOCUMENTS: string[] = [
  'Título Profesional',
  'Cédula Profesional (Federal / Estatal)',
  'Currículum Vitae (CV) Actualizado',
  'Constancia de Situación Fiscal (SAT / RFC)',
  'Constancia de No Antecedentes Penales',
  'Certificado Médico de Salud',
  'Comprobante de Domicilio reciente',
  'Certificación de Idioma (TOEFL / CENNI / Cambridge)',
  'Cartas de Recomendación Académica o Laboral',
  'Constancia de No Inhabilitación (para escuelas públicas)',
  'Plan o Planeación Didáctica de Muestra'
];

export const MEXICAN_STATES = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima',
  'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo',
  'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca',
  'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
  'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];
