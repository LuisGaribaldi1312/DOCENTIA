import { 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  updateDoc, 
  query, 
  orderBy, 
  where 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { JobVacancy } from '@/types';
import { INITIAL_VACANCIES } from '../mockData';

const COLLECTION_NAME = 'vacancies';

export async function fetchVacanciesFromFirebase(): Promise<JobVacancy[]> {
  if (!isFirebaseConfigured || !db) {
    return INITIAL_VACANCIES;
  }

  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return INITIAL_VACANCIES;
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JobVacancy));
  } catch (error) {
    console.warn('Error fetching vacancies from Firestore, using local fallback:', error);
    return INITIAL_VACANCIES;
  }
}

export async function saveVacancyToFirebase(vacancy: Omit<JobVacancy, 'id' | 'createdAt' | 'applicantsCount' | 'status'>): Promise<JobVacancy> {
  const newVacancyData: Omit<JobVacancy, 'id'> = {
    ...vacancy,
    createdAt: new Date().toISOString().split('T')[0],
    applicantsCount: 0,
    status: 'activa'
  };

  if (!isFirebaseConfigured || !db) {
    return {
      id: `vac-${Date.now()}`,
      ...newVacancyData
    };
  }

  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), newVacancyData);
    return {
      id: docRef.id,
      ...newVacancyData
    };
  } catch (error) {
    console.error('Error saving vacancy to Firestore:', error);
    return {
      id: `vac-${Date.now()}`,
      ...newVacancyData
    };
  }
}
