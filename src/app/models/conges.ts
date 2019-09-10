import { AssoTypes } from './asso-types';
import { firestore } from 'firebase';

export interface Conges {
  key: string;
  dateDebut: Date;
  dateFin: Date;
  joursPris: AssoTypes[];
}

export interface FirestoreConges {
  dateDebut: firestore.Timestamp;
  dateFin: firestore.Timestamp;
  joursPris: AssoTypes[];
}
