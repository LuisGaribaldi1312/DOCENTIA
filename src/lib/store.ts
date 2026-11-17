'use client';

import { useState, useEffect } from 'react';
import { 
  JobVacancy, 
  TeacherProfile, 
  SchoolProfile, 
  Application, 
  UserAccount, 
  UserRole,
  UserSubscription
} from '@/types';
import { INITIAL_VACANCIES } from './mockData';

const VACANCIES_KEY = 'docentia_vacancies';
const TEACHER_PROFILE_KEY = 'docentia_teacher_profile';
const SCHOOL_PROFILE_KEY = 'docentia_school_profile';
const APPLICATIONS_KEY = 'docentia_applications';
const ACTIVE_ROLE_KEY = 'docentia_active_role';
const CURRENT_USER_KEY = 'docentia_current_user';
const REGISTERED_USERS_KEY = 'docentia_registered_users';

export const SUPERADMIN_USER: UserAccount = {
  id: 'user-superadmin-master',
  email: 'admin@docentia.com',
  name: 'Mtro. Luis Alberto Garibaldi',
  role: 'admin',
  isSuperAdmin: true,
  phone: '55 1234 5678',
  institutionName: 'DOCENTIA Red Educativa Nacional',
  cct: '00DIR0001A',
  professionalLicense: '12894562',
  subscription: {
    planType: 'superadmin_ilimitado',
    status: 'activo',
    isCertified: true,
    amountUsd: 0,
    activatedAt: '2026-01-01',
    renewsAt: '2099-12-31'
  },
  createdAt: '2026-01-01'
};

export const DEMO_USERS: UserAccount[] = [
  SUPERADMIN_USER
];

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
  const [currentRole, setCurrentRole] = useState<UserRole>('docente');
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
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

    // Cargar Usuario Autenticado
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setCurrentUser(parsed);
        if (parsed.role) {
          setCurrentRole(parsed.role);
        }
      } catch {
        setCurrentUser(null);
      }
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
    const storedRole = localStorage.getItem(ACTIVE_ROLE_KEY) as UserRole | null;
    if (storedRole) {
      setCurrentRole(storedRole);
    }

    setIsLoaded(true);
  }, []);

  // Login de Usuario
  const login = (email: string, role?: UserRole) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // 1. Cuenta Especial de Super Administrador (Acceso total a ambos perfiles)
    if (
      cleanEmail === 'admin@docentia.com' ||
      cleanEmail === 'luisalbertogaribaldileciwr@gmail.com' ||
      cleanEmail === 'admin' ||
      cleanEmail.includes('superadmin')
    ) {
      const superUser: UserAccount = {
        ...SUPERADMIN_USER,
        email: cleanEmail
      };
      setCurrentUser(superUser);
      const activeRole = role === 'escuela' ? 'escuela' : 'docente';
      setCurrentRole(activeRole);
      if (typeof window !== 'undefined') {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(superUser));
        localStorage.setItem(ACTIVE_ROLE_KEY, activeRole);
      }
      return superUser;
    }

    // 2. Buscar en usuarios registrados previamente
    const storedUsersJson = typeof window !== 'undefined' ? localStorage.getItem(REGISTERED_USERS_KEY) : null;
    let registeredUsers: UserAccount[] = storedUsersJson ? JSON.parse(storedUsersJson) : [];
    const foundUser = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (foundUser) {
      setCurrentUser(foundUser);
      setCurrentRole(foundUser.role);
      if (typeof window !== 'undefined') {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
        localStorage.setItem(ACTIVE_ROLE_KEY, foundUser.role);
      }
      return foundUser;
    }

    // 3. Crear o iniciar sesión genérica
    const targetRole = role || currentRole;
    const isDocente = targetRole === 'docente';
    const genericUser: UserAccount = {
      id: `user-${Date.now()}`,
      email: cleanEmail,
      name: isDocente ? cleanEmail.split('@')[0] : `Colegio ${cleanEmail.split('@')[0]}`,
      role: targetRole,
      phone: '55 1234 5678',
      subscription: {
        planType: 'ninguno',
        status: 'sin_plan',
        isCertified: false,
        amountUsd: 0
      },
      createdAt: new Date().toISOString().split('T')[0]
    };

    registeredUsers.push(genericUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registeredUsers));
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(genericUser));
      localStorage.setItem(ACTIVE_ROLE_KEY, targetRole);
    }
    setCurrentUser(genericUser);
    setCurrentRole(targetRole);
    return genericUser;
  };

  // Registro de nuevo usuario
  const registerUser = (data: {
    email: string;
    name: string;
    role: UserRole;
    phone?: string;
    institutionName?: string;
    cct?: string;
    professionalLicense?: string;
  }) => {
    const cleanEmail = data.email.trim().toLowerCase();

    // Check si es superadmin
    const isSuper = cleanEmail === 'admin@docentia.com' || cleanEmail === 'luisalbertogaribaldileciwr@gmail.com' || cleanEmail.includes('admin');

    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      email: cleanEmail,
      name: data.name,
      role: isSuper ? 'admin' : data.role,
      isSuperAdmin: isSuper,
      phone: data.phone || '',
      institutionName: data.institutionName,
      cct: data.cct,
      professionalLicense: data.professionalLicense,
      subscription: isSuper ? {
        planType: 'superadmin_ilimitado',
        status: 'activo',
        isCertified: true,
        amountUsd: 0,
        activatedAt: '2026-01-01',
        renewsAt: '2099-12-31'
      } : {
        planType: 'ninguno',
        status: 'sin_plan',
        isCertified: false,
        amountUsd: 0
      },
      acceptedTerms: true,
      acceptedTermsAt: new Date().toISOString(),
      privacyConsent: true,
      dataHandlingAuthorized: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Guardar en lista de registrados
    const storedUsersJson = typeof window !== 'undefined' ? localStorage.getItem(REGISTERED_USERS_KEY) : null;
    let registeredUsers: UserAccount[] = storedUsersJson ? JSON.parse(storedUsersJson) : [];
    registeredUsers.push(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registeredUsers));
    }

    setCurrentUser(newUser);
    setCurrentRole(data.role);

    // Actualizar perfil sincronizado
    if (data.role === 'docente') {
      const updatedDoc: TeacherProfile = {
        ...teacherProfile,
        fullName: data.name,
        email: data.email,
        phone: data.phone || teacherProfile.phone,
        professionalLicense: data.professionalLicense || teacherProfile.professionalLicense
      };
      setTeacherProfile(updatedDoc);
      if (typeof window !== 'undefined') {
        localStorage.setItem(TEACHER_PROFILE_KEY, JSON.stringify(updatedDoc));
      }
    } else {
      const updatedSchool: SchoolProfile = {
        ...schoolProfile,
        name: data.institutionName || data.name,
        cct: data.cct || schoolProfile.cct,
        contactEmail: data.email,
        contactPhone: data.phone || schoolProfile.contactPhone
      };
      setSchoolProfile(updatedSchool);
      if (typeof window !== 'undefined') {
        localStorage.setItem(SCHOOL_PROFILE_KEY, JSON.stringify(updatedSchool));
      }
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      localStorage.setItem(ACTIVE_ROLE_KEY, data.role);
    }
    return newUser;
  };

  // Cerrar Sesión
  const logout = () => {
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  };

  // Activar o certificar plan de suscripción ($5 Docente o $10 Escuela)
  const activateSubscription = (planType: 'docente_5usd' | 'escuela_10usd') => {
    if (!currentUser) return null;

    const today = new Date().toISOString().split('T')[0];
    const renews = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const amount = planType === 'docente_5usd' ? 5 : 10;

    const updatedUser: UserAccount = {
      ...currentUser,
      subscription: {
        planType,
        status: 'activo',
        isCertified: true,
        amountUsd: amount,
        activatedAt: today,
        renewsAt: renews
      }
    };

    setCurrentUser(updatedUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    }

    // Actualizar verificación en perfil escolar si aplica
    if (planType === 'escuela_10usd') {
      const updatedSchool: SchoolProfile = { ...schoolProfile, verified: true };
      setSchoolProfile(updatedSchool);
      if (typeof window !== 'undefined') {
        localStorage.setItem(SCHOOL_PROFILE_KEY, JSON.stringify(updatedSchool));
      }
    }

    return updatedUser;
  };

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
      teacherId: currentUser?.id || teacherProfile.id,
      teacherName: currentUser?.name || teacherProfile.fullName,
      teacherEmail: currentUser?.email || teacherProfile.email,
      teacherPhone: currentUser?.phone || teacherProfile.phone,
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

  const switchRole = (role: UserRole) => {
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
    currentUser,
    isLoaded,
    login,
    registerUser,
    logout,
    activateSubscription,
    addVacancy,
    updateTeacherProfile,
    updateSchoolProfile,
    applyToVacancy,
    updateApplicationStatus,
    switchRole
  };
}
