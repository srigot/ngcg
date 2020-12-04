import firebase from 'firebase/app';
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
  dateDebut: firebase.firestore.Timestamp;
  dateFin: firebase.firestore.Timestamp;
  nom: string;
  nombreJours: number;
}
