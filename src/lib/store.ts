'use client';

import { useState, useEffect } from 'react';
import { JobVacancy, TeacherProfile, SchoolProfile, Application } from '@/types';
import { INITIAL_VACANCIES } from './mockData';

const VACANCIES_KEY = 'docentia_vacancies';
const TEACHER_PROFILE_KEY = 'docentia_teacher_profile';
const SCHOOL_PROFILE_KEY = 'docentia_school_profile';
const APPLICATIONS_KEY = 'docentia_applications';
const ACTIVE_ROLE_KEY = 'docentia_active_role';

export const DEFAULT_TEACHER: TeacherProfile = {
  id: 'teacher-default',
  fullName: 'Mtro. Luis Alberto Garibaldi',
  email: 'luisalbertogaribaldileciwr@gmail.com',
  phone: '55 1234 5678',
  address: 'Calle Río Churubusco 420, Int. 3B',
  residenceCity: 'Coyoacán',
  residenceState: 'Ciudad de México',
  postalCode: '04100',
  professionalLicense: '12894562',
  highestDegree: 'Maestría',
  major: 'Educación y Tecnologías Digitales',
  specialties: ['Matemáticas', 'Física', 'Informática y TIC'],
  levelsTaught: ['secundaria', 'preparatoria_bachillerato', 'universidad_superior'],
  yearsOfExperience: 6,
  bio: 'Docente con amplia experiencia en metodologías activas, aula invertida y proyectos de innovación educativa. Compromiso con el aprendizaje significativo y la excelencia pedagógica.',
  availableForUrgentSubstitute: true,
  uploadedDocuments: [
    { id: 'doc-1', name: 'Curriculum_Vitae_Garibaldi_2026.pdf', category: 'CV', uploadDate: '2026-11-10' },
    { id: 'doc-2', name: 'Cedula_Profesional_Federal.pdf', category: 'Cédula', uploadDate: '2026-11-08' },
    { id: 'doc-3', name: 'Titulo_Maestria_Educacion.pdf', category: 'Título', uploadDate: '2026-11-08' },
    { id: 'doc-4', name: 'Constancia_Antecedentes_No_Penales.pdf', category: 'Antecedentes', uploadDate: '2026-11-12' }
  ]
};

export const DEFAULT_SCHOOL: SchoolProfile = {
  id: 'school-default',
  name: 'Colegio Bilingüe Nueva Inglaterra',
  cct: '09PES0412X',
  type: 'privada',
  state: 'Ciudad de México',
  city: 'Benito Juárez',
  address: 'Av. Coyoacán 1420, Col. Del Valle',
  contactEmail: 'direccion.academica@nuevainglaterra.edu.mx',
  contactPhone: '55 5534 8900',
  levelsOffered: ['inicial_preescolar', 'primaria', 'secundaria', 'preparatoria_bachillerato'],
  description: 'Institución educativa privada de alto rendimiento académico con más de 30 años formando líderes con valores y bilingüismo integral.',
  verified: true
};

export function useDocentiaStore() {
  const [vacancies, setVacancies] = useState<JobVacancy[]>([]);
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>(DEFAULT_TEACHER);
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>(DEFAULT_SCHOOL);
  const [applications, setApplications] = useState<Application[]>([]);
  const [currentRole, setCurrentRole] = useState<'docente' | 'escuela'>('docente');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Cargar Vacantes
    const storedVacancies = localStorage.getItem(VACANCIES_KEY);
    if (storedVacancies) {
      try {
        setVacancies(JSON.parse(storedVacancies));
      } catch {
        setVacancies(INITIAL_VACANCIES);
      }
    } else {
      setVacancies(INITIAL_VACANCIES);
      localStorage.setItem(VACANCIES_KEY, JSON.stringify(INITIAL_VACANCIES));
    }

    // Cargar Perfil Docente
    const storedTeacher = localStorage.getItem(TEACHER_PROFILE_KEY);
    if (storedTeacher) {
      try {
        setTeacherProfile(JSON.parse(storedTeacher));
      } catch {
        setTeacherProfile(DEFAULT_TEACHER);
      }
    }

    // Cargar Perfil Escuela
    const storedSchool = localStorage.getItem(SCHOOL_PROFILE_KEY);
    if (storedSchool) {
      try {
        setSchoolProfile(JSON.parse(storedSchool));
      } catch {
        setSchoolProfile(DEFAULT_SCHOOL);
      }
    }

    // Cargar Postulaciones
    const storedApps = localStorage.getItem(APPLICATIONS_KEY);
    if (storedApps) {
      try {
        setApplications(JSON.parse(storedApps));
      } catch {
        setApplications([]);
      }
    }

    // Cargar Rol
    const storedRole = localStorage.getItem(ACTIVE_ROLE_KEY) as 'docente' | 'escuela' | null;
    if (storedRole) {
      setCurrentRole(storedRole);
    }

    setIsLoaded(true);
  }, []);

  const addVacancy = (newVacancy: Omit<JobVacancy, 'id' | 'createdAt' | 'applicantsCount' | 'status'>) => {
    const vacancy: JobVacancy = {
      ...newVacancy,
      id: `vac-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      applicantsCount: 0,
      status: 'activa'
    };
    const updated = [vacancy, ...vacancies];
    setVacancies(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(VACANCIES_KEY, JSON.stringify(updated));
    }
    return vacancy;
  };

  const updateTeacherProfile = (updated: TeacherProfile) => {
    setTeacherProfile(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(TEACHER_PROFILE_KEY, JSON.stringify(updated));
    }
  };

  const updateSchoolProfile = (updated: SchoolProfile) => {
    setSchoolProfile(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SCHOOL_PROFILE_KEY, JSON.stringify(updated));
    }
  };

  const applyToVacancy = (vacancy: JobVacancy, attachedDocs: string[], coverNote?: string) => {
    const newApp: Application = {
      id: `app-${Date.now()}`,
      vacancyId: vacancy.id,
      vacancyTitle: vacancy.title,
      schoolName: vacancy.schoolName,
      teacherId: teacherProfile.id,
      teacherName: teacherProfile.fullName,
      teacherEmail: teacherProfile.email,
      teacherPhone: teacherProfile.phone,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'recibida',
      attachedDocuments: attachedDocs,
      coverNote
    };

    const updatedApps = [newApp, ...applications];
    setApplications(updatedApps);

    // Incrementar contador de postulantes en la vacante
    const updatedVacancies = vacancies.map(v => 
      v.id === vacancy.id ? { ...v, applicantsCount: v.applicantsCount + 1 } : v
    );
    setVacancies(updatedVacancies);

    if (typeof window !== 'undefined') {
      localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updatedApps));
      localStorage.setItem(VACANCIES_KEY, JSON.stringify(updatedVacancies));
    }
    return newApp;
  };

  const updateApplicationStatus = (appId: string, status: Application['status']) => {
    const updated = applications.map(app => 
      app.id === appId ? { ...app, status } : app
    );
    setApplications(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
    }
  };

  const switchRole = (role: 'docente' | 'escuela') => {
    setCurrentRole(role);
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACTIVE_ROLE_KEY, role);
    }
  };

  return {
    vacancies,
    teacherProfile,
    schoolProfile,
    applications,
    currentRole,
    isLoaded,
    addVacancy,
    updateTeacherProfile,
    updateSchoolProfile,
    applyToVacancy,
    updateApplicationStatus,
    switchRole
  };
}
