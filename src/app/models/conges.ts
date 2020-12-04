import firebase from 'firebase/app';
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
  dateDebut: firebase.firestore.Timestamp;
  dateFin: firebase.firestore.Timestamp;
  joursPris: [{
    type: string,
    nombreJours: number,
  }];
  eventId?: string;
  previsionnel?: boolean;
}
