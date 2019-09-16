import { firestore } from 'firebase';
import { DocumentReference } from '@angular/fire/firestore';

export interface Conges {
  key: string;
  dateDebut: Date;
  dateFin: Date;
  joursPris: [{
    type: string,
    nombreJours: number,
  }];
  eventId?: string;
}

export interface FirestoreConges {
  dateDebut: firestore.Timestamp;
  dateFin: firestore.Timestamp;
  joursPris: [{
    type: string,
    nombreJours: number,
  }];
  eventId?: string;
}
