import { AssoTypes } from './asso-types';
import { firestore } from 'firebase';

export interface Conges {
  dateDebut: Date;
  dateFin: Date;
  joursPris: AssoTypes[];
}

export interface FirestoreConges {
  dateDebut: firestore.Timestamp;
  dateFin: firestore.Timestamp;
  joursPris: AssoTypes[];
}
