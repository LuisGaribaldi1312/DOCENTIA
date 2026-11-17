export type EducationalLevel =
  | 'inicial_preescolar'
  | 'primaria'
  | 'secundaria'
  | 'preparatoria_bachillerato'
  | 'universidad_superior'
  | 'posgrado'
  | 'educacion_especial'
  | 'idiomas';

export type ContractType =
  | 'planta_permanente'
  | 'contrato_determinado'
  | 'honorarios';

export type Modality = 'presencial' | 'hibrido' | 'remoto';

export type Shift = 'matutino' | 'vespertino' | 'mixto' | 'sabatino';

export type SchoolType = 'publica' | 'privada';

export interface JobVacancy {
  id: string;
  title: string;
  schoolName: string;
  schoolType: SchoolType;
  schoolLogo?: string;
  cct?: string; // Clave de Centro de Trabajo
  educationalLevel: EducationalLevel;
  subjects: string[];
  description: string;
  salaryMin: number;
  salaryMax?: number;
  salaryPeriod: 'mensual' | 'quincenal' | 'hora';
  contractDuration: string; // ej: "Ciclo Escolar 2026-2027", "Indefinido"
  contractType: ContractType;
  scheduleType: 'tiempo_completo' | 'medio_tiempo' | 'por_horas';
  shift: Shift;
  modality: Modality;
  location: {
    state: string;
    city: string;
    address: string;
    postalCode?: string;
  };
  requiredDocuments: string[];
  requirements: {
    minDegree: string;
    requireProfessionalLicense: boolean; // Cédula obligatoria
    minExperienceYears: number;
    specialRequirements?: string;
  };
  isUrgentSubstitute: boolean; // Docente SOS / Interinato express
  status: 'activa' | 'en_proceso' | 'cerrada';
  createdAt: string;
  applicantsCount: number;
}

export interface TeacherProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  residenceCity: string;
  residenceState: string;
  postalCode: string;
  professionalLicense: string; // Cédula profesional
  highestDegree: string;
  major: string;
  specialties: string[];
  levelsTaught: EducationalLevel[];
  yearsOfExperience: number;
  bio: string;
  availableForUrgentSubstitute: boolean;
  uploadedDocuments: {
    id: string;
    name: string;
    category: string;
    uploadDate: string;
  }[];
}

export interface SchoolProfile {
  id: string;
  name: string;
  cct: string;
  type: SchoolType;
  state: string;
  city: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  levelsOffered: EducationalLevel[];
  description: string;
  verified: boolean;
}

export interface Application {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  schoolName: string;
  teacherId: string;
  teacherName: string;
  teacherEmail: string;
  teacherPhone: string;
  appliedDate: string;
  status: 'recibida' | 'en_revision' | 'clase_muestra' | 'entrevista' | 'aceptada' | 'rechazada';
  attachedDocuments: string[];
  coverNote?: string;
}
