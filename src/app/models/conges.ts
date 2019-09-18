import { firestore } from 'firebase';
import { Moment } from 'moment';

export interface Conges {
  key: string;
  dateDebut: Moment;
  dateFin: Moment;
  joursPris: [{
    type: string,
    nombreJours: number,
  }];
  eventId?: string;
  previsionnel?: boolean;
}

export interface FirestoreConges {
  dateDebut: firestore.Timestamp;
  dateFin: firestore.Timestamp;
  joursPris: [{
    type: string,
    nombreJours: number,
  }];
  eventId?: string;
  previsionnel?: boolean;
}
