import { Injectable, Inject } from '@nestjs/common';
import { Firestore } from 'firebase/firestore'; // ✅ AJOUTÉ
import { ActionSaisonniere } from '../Models/actions-saisonnieres/ActionSaisonniere';
import { CreateActionSaisonniere } from '../Models/actions-saisonnieres/CreateActionSaisonniere';
import { UpdateActionSaisonniere } from '../Models/actions-saisonnieres/UpdateActionSaisonniere';
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';

@Injectable()
export class ActionsSaisonnieresService {
  constructor(
    @Inject('FIRESTORE') private readonly firestore: Firestore // ✅ CHANGÉ ICI
  ) {}

  // Créer une nouvelle action saisonnière
  async createAction(actionData: CreateActionSaisonniere): Promise<string> {
    const now = new Date();
    const docRef = await addDoc(collection(this.firestore, 'actions_saisonnieres'), { // ✅ CHANGÉ
      ...actionData,
      status: 'a_faire',
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  }

  // Récupérer toutes les actions d'un apiculteur
  async getActionsByApiculteur(apiculteurId: string): Promise<ActionSaisonniere[]> {
    const q = query(
      collection(this.firestore, 'actions_saisonnieres'), // ✅ CHANGÉ
      where('apiculteurId', '==', apiculteurId),
      orderBy('moisOptimal', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as ActionSaisonniere));
  }

  // Récupérer les actions du mois en cours
  async getActionsCurrentMonth(apiculteurId: string): Promise<ActionSaisonniere[]> {
    const currentMonth = new Date().getMonth() + 1;
    const q = query(
      collection(this.firestore, 'actions_saisonnieres'), // ✅ CHANGÉ
      where('apiculteurId', '==', apiculteurId),
      where('moisOptimal', '==', currentMonth)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as ActionSaisonniere));
  }

  // Marquer une action comme terminée
  async completeAction(actionId: string): Promise<void> {
    const docRef = doc(this.firestore, 'actions_saisonnieres', actionId); // ✅ CHANGÉ
    await updateDoc(docRef, {
      status: 'terminee',
      dateCompletion: new Date(),
      updatedAt: new Date(),
    });
  }

  // Mettre à jour une action
  async updateAction(actionId: string, updateData: UpdateActionSaisonniere): Promise<void> {
    const docRef = doc(this.firestore, 'actions_saisonnieres', actionId); // ✅ CHANGÉ
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date(),
    });
  }

  // Supprimer une action
  async deleteAction(actionId: string): Promise<void> {
    const docRef = doc(this.firestore, 'actions_saisonnieres', actionId); // ✅ CHANGÉ
    await deleteDoc(docRef);
  }
}