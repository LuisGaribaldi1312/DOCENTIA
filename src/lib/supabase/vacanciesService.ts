import { supabase, isSupabaseConfigured } from './client';
import { JobVacancy } from '@/types';
import { INITIAL_VACANCIES } from '../mockData';

const TABLE_NAME = 'vacancies';

/**
 * Consulta vacantes desde la base de datos de Supabase.
 * Si la tabla está vacía o se está configurando, recurre a las vacantes iniciales.
 */
export async function fetchVacanciesFromSupabase(): Promise<JobVacancy[]> {
  if (!isSupabaseConfigured) {
    return INITIAL_VACANCIES;
  }

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return INITIAL_VACANCIES;
    }

    return (data as unknown[]).map((raw: any) => ({
      id: raw.id || `vac-${Date.now()}`,
      title: raw.title,
      schoolName: raw.school_name || raw.schoolName,
      schoolType: raw.school_type || raw.schoolType || 'privada',
      schoolLogo: raw.school_logo || raw.schoolLogo,
      cct: raw.cct,
      educationalLevel: raw.educational_level || raw.educationalLevel || 'secundaria',
      subjects: raw.subjects || [],
      description: raw.description || '',
      salaryMin: Number(raw.salary_min ?? raw.salaryMin ?? 15000),
      salaryMax: raw.salary_max !== undefined ? Number(raw.salary_max) : raw.salaryMax,
      salaryPeriod: raw.salary_period || raw.salaryPeriod || 'mensual',
      contractDuration: raw.contract_duration || raw.contractDuration || 'Ciclo Escolar',
      contractType: raw.contract_type || raw.contractType || 'planta_permanente',
      scheduleType: raw.schedule_type || raw.scheduleType || 'tiempo_completo',
      shift: raw.shift || 'matutino',
      modality: raw.modality || 'presencial',
      location: raw.location || { state: 'Ciudad de México', city: '', address: '' },
      requiredDocuments: raw.required_documents || raw.requiredDocuments || [],
      requirements: raw.requirements || {
        minDegree: 'Licenciatura',
        requireProfessionalLicense: true,
        minExperienceYears: 1
      },
      isUrgentSubstitute: Boolean(raw.is_urgent_substitute ?? raw.isUrgentSubstitute),
      status: raw.status || 'activa',
      createdAt: raw.created_at || raw.createdAt || new Date().toISOString().split('T')[0],
      applicantsCount: Number(raw.applicants_count ?? raw.applicantsCount ?? 0)
    })) as JobVacancy[];
  } catch (err) {
    console.warn('Error fetching from Supabase vacancies, falling back:', err);
    return INITIAL_VACANCIES;
  }
}

/**
 * Guarda una nueva vacante en Supabase.
 */
export async function saveVacancyToSupabase(
  vacancy: Omit<JobVacancy, 'id' | 'createdAt' | 'applicantsCount' | 'status'>
): Promise<JobVacancy> {
  const newVacancy: JobVacancy = {
    ...vacancy,
    id: `vac-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    applicantsCount: 0,
    status: 'activa'
  };

  if (!isSupabaseConfigured) {
    return newVacancy;
  }

  try {
    const dbPayload = {
      id: newVacancy.id,
      title: newVacancy.title,
      school_name: newVacancy.schoolName,
      school_type: newVacancy.schoolType,
      school_logo: newVacancy.schoolLogo,
      cct: newVacancy.cct,
      educational_level: newVacancy.educationalLevel,
      subjects: newVacancy.subjects,
      description: newVacancy.description,
      salary_min: newVacancy.salaryMin,
      salary_max: newVacancy.salaryMax,
      salary_period: newVacancy.salaryPeriod,
      contract_duration: newVacancy.contractDuration,
      contract_type: newVacancy.contractType,
      schedule_type: newVacancy.scheduleType,
      shift: newVacancy.shift,
      modality: newVacancy.modality,
      location: newVacancy.location,
      required_documents: newVacancy.requiredDocuments,
      requirements: newVacancy.requirements,
      is_urgent_substitute: newVacancy.isUrgentSubstitute,
      status: newVacancy.status,
      created_at: newVacancy.createdAt,
      applicants_count: 0
    };

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([dbPayload])
      .select()
      .single();

    if (error) {
      console.warn('Supabase insert vacancy warning:', error.message);
      return newVacancy;
    }

    return {
      ...newVacancy,
      id: data?.id || newVacancy.id
    };
  } catch (err) {
    console.warn('Supabase saveVacancy exception:', err);
    return newVacancy;
  }
}
