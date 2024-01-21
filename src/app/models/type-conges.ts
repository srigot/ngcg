import { Timestamp } from '@angular/fire/firestore';
import { Moment } from 'moment';

export interface TypeConges {
  key: string;
  dateDebut: Moment;
  dateFin: Moment;
  nom: string;
  nombreJours: number;
  anticipable: boolean;
  joursPoses?: number;
}

export interface FirestoreTypeConges {
  dateDebut: Timestamp;
  dateFin: Timestamp;
  nom: string;
  nombreJours: number;
  anticipable?: boolean;
}
