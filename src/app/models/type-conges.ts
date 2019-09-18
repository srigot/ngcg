import { firestore } from 'firebase';
import { Moment } from 'moment';

export interface TypeConges {
  key: string;
  dateDebut: Moment;
  dateFin: Moment;
  nom: string;
  nombreJours: number;
  joursPoses?: number;
}

export interface FirestoreTypeConges {
  dateDebut: firestore.Timestamp;
  dateFin: firestore.Timestamp;
  nom: string;
  nombreJours: number;
}
