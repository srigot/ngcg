import { firestore } from 'firebase';

export interface TypeConges {
  dateDebut: Date;
  dateFin: Date;
  nom: string;
  nombreJours: number;
}

export interface FirestoreTypeConges {
  dateDebut: firestore.Timestamp;
  dateFin: firestore.Timestamp;
  nom: string;
  nombreJours: number;
}
