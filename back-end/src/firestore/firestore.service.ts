import { Injectable, Inject } from '@nestjs/common';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
// import { Deplacement } from '../Models/Deplacement';
// import { Recolte } from '../Models/Recolte';
// import { TraitementVarroa } from '../Models/TraitementVarroa';
// import { Nourrissement } from '../Models/Nourrissement';
// import { MaladieTraitement } from '../Models/MaladieTraitement';
// import { Observation } from '../Models/Observation';
import { Apiculteur } from '../Models/Apiculteur';
import { RegistreElevage } from '../Models/RegistreElevage';
import { Entreprise } from '../Models/Entreprise';


@Injectable()
export class FirestoreService {
  constructor(@Inject('FIRESTORE') private firestore: Firestore) { }

  async createApiculteur(apiculteur: Omit<Apiculteur, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date();
    const docRef = await addDoc(collection(this.firestore, 'apiculteurs'), {
      ...apiculteur,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  }

  async getApiculteur(id: string): Promise<Apiculteur | null> {
    const docRef = doc(this.firestore, 'apiculteurs', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Apiculteur;
  }



  async getApiculteurByEmail(email: string): Promise<Apiculteur | null> {
    const q = query(collection(this.firestore, 'apiculteurs'), where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as Apiculteur;
  }

  async updateApiculteur(id: string, data: Partial<Apiculteur>): Promise<void> {
    const docRef = doc(this.firestore, 'apiculteurs', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  }


  async createRegistre(registre: Omit<RegistreElevage, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date();
    const docRef = await addDoc(collection(this.firestore, 'registres'), {
      ...registre,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  }

  async addObservationToRegistre(registreId: string, observation: any) {
    const docRef = doc(this.firestore, 'registres', registreId);
    const registre = await getDoc(docRef);

    if (!registre.exists()) {
      throw new Error('Registre not found');
    }

    const data = registre.data();
    const observations = data.observations || [];
    observations.push(observation);

    await updateDoc(docRef, {
      observations,
      updatedAt: new Date()
    });
  }

  async getRegistresByApiculteur(apiculteurId: string): Promise<RegistreElevage[]> {
    const q = query(collection(this.firestore, 'registres'), where('apiculteurId', '==', apiculteurId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as RegistreElevage));
  }

  async getRegistre(id: string): Promise<RegistreElevage | null> {
    const docRef = doc(this.firestore, 'registres', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as RegistreElevage;
  }

  async updateRegistre(id: string, data: Partial<RegistreElevage>): Promise<RegistreElevage> {
    const docRef = doc(this.firestore, 'registres', id);

    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });

    // Récupérer le document mis à jour
    const updatedDoc = await getDoc(docRef);

    if (!updatedDoc.exists()) {
      throw new Error('Registre non trouvé');
    }

    return {
      id: updatedDoc.id,
      ...updatedDoc.data(),
    } as RegistreElevage;
  }

  // // DEPLACEMENT // // 
  async addDeplacementToRegistre(registreId: string, deplacement: any) {
    const docRef = doc(this.firestore, 'registres', registreId);
    const registre = await getDoc(docRef);

    if (!registre.exists()) {
      throw new Error('Registre not found');
    }

    const data = registre.data();
    const deplacements = data.deplacements || [];
    deplacements.push(deplacement);

    await updateDoc(docRef, {
      deplacements,
      updatedAt: new Date()
    });
  }

  // // RECOLTE // // 

  async addRecolteToRegistre(registreId: string, recolte: any) {
    const docRef = doc(this.firestore, 'registres', registreId);
    const registre = await getDoc(docRef);

    if (!registre.exists()) {
      throw new Error('Registre not found');
    }

    const data = registre.data();
    const recoltes = data.recoltes || [];
    recoltes.push(recolte);

    await updateDoc(docRef, {
      recoltes,
      updatedAt: new Date()
    });
  }

  // // TRAITEMENT // // 

  async addTraitementVarroaToRegistre(registreId: string, traitement: any) {
    const docRef = doc(this.firestore, 'registres', registreId);
    const registre = await getDoc(docRef);

    if (!registre.exists()) {
      throw new Error('Registre not found');
    }

    const data = registre.data();
    const traitementsVarroa = data.traitementsVarroa || [];
    traitementsVarroa.push(traitement);

    await updateDoc(docRef, {
      traitementsVarroa,
      updatedAt: new Date()
    });
  }

  // // NOURISSEMENT // // 
  async addNourrissementToRegistre(registreId: string, nourrissement: any) {
    const docRef = doc(this.firestore, 'registres', registreId);
    const registre = await getDoc(docRef);

    if (!registre.exists()) {
      throw new Error('Registre not found');
    }

    const data = registre.data();
    const nourrissements = data.nourrissements || [];
    nourrissements.push(nourrissement);

    await updateDoc(docRef, {
      nourrissements,
      updatedAt: new Date()
    });
  }
  // // MALADIT ET TRAITEMENT // // 

  async addMaladieTraitementToRegistre(registreId: string, maladieTraitement: any) {
    const docRef = doc(this.firestore, 'registres', registreId);
    const registre = await getDoc(docRef);

    if (!registre.exists()) {
      throw new Error('Registre not found');
    }

    const data = registre.data();
    const maladiesTraitements = data.maladiesTraitements || [];
    maladiesTraitements.push(maladieTraitement);

    await updateDoc(docRef, {
      maladiesTraitements,
      updatedAt: new Date()
    });
  }

  // Ajoutez ces méthodes dans la classe FirestoreService :

  // Créer une entreprise
  async createEntreprise(entreprise: Omit<Entreprise, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date();
    const docRef = await addDoc(collection(this.firestore, 'entreprises'), {
      ...entreprise,
      employes: entreprise.employes || [],
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  }

  // Récupérer toutes les entreprises
  async getAllEntreprises(): Promise<Entreprise[]> {
    const querySnapshot = await getDocs(collection(this.firestore, 'entreprises'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Entreprise));
  }

  // Récupérer une entreprise par ID
  async getEntrepriseById(id: string): Promise<Entreprise | null> {
    const docRef = doc(this.firestore, 'entreprises', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Entreprise;
  }

  // Mettre à jour une entreprise
  async updateEntreprise(id: string, data: Partial<Entreprise>): Promise<void> {
    const docRef = doc(this.firestore, 'entreprises', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  }

  // Supprimer une entreprise
  async deleteEntreprise(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'entreprises', id);
    await deleteDoc(docRef);
  }

}