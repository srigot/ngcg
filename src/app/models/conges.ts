import { Timestamp } from '@angular/fire/firestore';
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
  dateDebut: Timestamp;
  dateFin: Timestamp;
  joursPris: [{
    type: string,
    nombreJours: number,
  }];
  eventId?: string;
  previsionnel?: boolean;
}
