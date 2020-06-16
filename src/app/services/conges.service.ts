import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { Conges, FirestoreConges } from '../models/conges';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { TypeConges, FirestoreTypeConges } from '../models/type-conges';
import { firestore } from 'firebase';
import { CalendarService } from './calendar.service';
import { Moment } from 'moment';
import * as moment from 'moment';
import { AuthService } from './auth.service';
import { ParametrageService } from './parametrage.service';

@Injectable({
  providedIn: 'root'
})
export class CongesService {
  private typesRef: AngularFirestoreCollection<FirestoreTypeConges>;
  private congesRef: AngularFirestoreCollection<FirestoreConges>;

  constructor(
    private db: AngularFirestore,
    public auth: AuthService,
    private calendarService: CalendarService,
    private parametrageService: ParametrageService,
  ) {
    this.typesRef = db.collection('users/guest/types');
    this.congesRef = db.collection('users/guest/conges');
    this.auth.user.subscribe((user) => {
      if (user !== null) {
        this.typesRef = db.collection('users/' + user.uid + '/types');
        this.congesRef = db.collection('users/' + user.uid + '/conges');
      } else {
        this.typesRef = db.collection('users/guest/types');
        this.congesRef = db.collection('users/guest/conges');
      }
    });
  }

  private getCongesRef(uid: string): AngularFirestoreCollection<FirestoreConges> {
    return this.db.collection('users/' + uid + '/conges', ref => ref.orderBy('dateDebut'));
  }

  private getTypesRef(uid: string): AngularFirestoreCollection<FirestoreTypeConges> {
    return this.db.collection('users/' + uid + '/types', ref => ref.orderBy('dateDebut'));
  }

  getAllConges(): Observable<Conges[]> {
    return this.auth.isUserConnected<Conges[]>(
      (uid) => this.getAllCongesUser(uid)
    );
  }

  private getAllCongesUser(uid): Observable<Conges[]> {
    return combineLatest([
      this.getCongesRef(uid).snapshotChanges(),
      this.parametrageService.getParamShowHistoriqueConnected(uid)
    ]).pipe(
      map(([actions, showHistorique]) => {
        return actions.map(a => {
          const data = a.payload.doc.data() as FirestoreConges;
          const key = a.payload.doc.id;
          return this.firestoreToConges(key, data);
        })
          .filter(conge => showHistorique || moment().startOf('year').isBefore(conge.dateFin));
      })
    );
  }

  getConge(key: string): Observable<Conges> {
    return this.congesRef.doc<FirestoreConges>(key).valueChanges().pipe(
      map(conge => this.firestoreToConges(key, conge)),
    );
  }

  updateConge(conges: Conges): Promise<void> {
    return this.congesRef.doc(conges.key).update(this.congesToFirestore(conges));
  }

  saveConges(conges: Conges): Promise<firestore.DocumentReference> {
    return this.congesRef.add(this.congesToFirestore(conges));
  }

  updateCongeWithCalendar(conges: Conges): Promise<void> {
    return this.calendarService.mettreAJourCalendrier(conges)
      .then((retourCalendar) => {
        this.updateEventId(conges, retourCalendar);
        return this.updateConge(conges);
      });
  }

  saveCongesWithCalendar(conges: Conges): Promise<firestore.DocumentReference> {
    return this.calendarService.mettreAJourCalendrier(conges)
      .then((retourCalendar) => {
        this.updateEventId(conges, retourCalendar);
        return this.saveConges(conges);
      });
  }

  deleteConges(key: string): Promise<void> {
    return this.congesRef.doc(key).delete();
  }

  getAllTypes(): Observable<TypeConges[]> {
    return this.auth.isUserConnected<TypeConges[]>(
      (uid) => this.getAllTypesUser(uid)
    );

  }
  private getAllTypesUser(uid: string): Observable<TypeConges[]> {
    return combineLatest([
      this.getTypesRef(uid).snapshotChanges(),
      this.parametrageService.getParamShowHistoriqueConnected(uid),
    ]).pipe(
      map(([actions, showHistorique]) => {
        return actions.map(a => {
          const data = a.payload.doc.data() as FirestoreTypeConges;
          const key = a.payload.doc.id;
          return this.firestoreToTypeConges(key, data);
        }).filter(conge => showHistorique || moment().startOf('year').isBefore(conge.dateFin));
      })
    );
  }

  getAllTypesAvecRestant(): Observable<TypeConges[]> {
    return this.auth.isUserConnected<TypeConges[]>(
      (uid) => combineLatest([this.getAllTypesUser(uid), this.getAllCongesUser(uid)]).pipe(
        map(([listeTypes, listeConges]) => this.calculerCongesRestants(listeTypes, listeConges)),
      )
    );
  }

  getType(key: string): Observable<TypeConges> {
    return this.typesRef.doc<FirestoreTypeConges>(key).valueChanges().pipe(
      map(type => this.firestoreToTypeConges(key, type)),
    );
  }

  updateType(type: TypeConges): Promise<void> {
    return this.typesRef.doc(type.key).update(this.typeCongesToFirestore(type));
  }

  saveType(type: TypeConges): Promise<firestore.DocumentReference> {
    return this.typesRef.add(this.typeCongesToFirestore(type));
  }

  deleteType(key: string): Promise<void> {
    return this.typesRef.doc(key).delete();
  }

  private firestoreToConges(key: string, conge: FirestoreConges): Conges {
    return {
      dateDebut: this.convertToDate(conge.dateDebut),
      dateFin: this.convertToDate(conge.dateFin),
      joursPris: conge.joursPris,
      eventId: conge.eventId,
      previsionnel: conge.previsionnel || null,
      key,
    };
  }

  private congesToFirestore(conge: Conges): FirestoreConges {
    return {
      dateDebut: this.convertToTimestamp(conge.dateDebut),
      dateFin: this.convertToTimestamp(conge.dateFin),
      joursPris: conge.joursPris,
      eventId: conge.eventId,
      previsionnel: conge.previsionnel || null,
    };
  }

  private firestoreToTypeConges(key: string, typeConges: FirestoreTypeConges): TypeConges {
    return {
      dateDebut: this.convertToDate(typeConges.dateDebut),
      dateFin: this.convertToDate(typeConges.dateFin),
      nom: typeConges.nom,
      nombreJours: typeConges.nombreJours,
      key,
    };
  }
  private typeCongesToFirestore(type: TypeConges): FirestoreTypeConges {
    return {
      dateDebut: this.convertToTimestamp(type.dateDebut),
      dateFin: this.convertToTimestamp(type.dateFin),
      nom: type.nom,
      nombreJours: type.nombreJours,
    };
  }

  private convertToTimestamp(date: Moment | null): firestore.Timestamp | null {
    return date === null ? null : firestore.Timestamp.fromDate(date.toDate());
  }

  private convertToDate(timestamp: firestore.Timestamp | null): Moment | null {
    return timestamp === null ? null : moment(timestamp.toDate());
  }

  private calculerCongesRestants(listeTypes: TypeConges[], listeConges: Conges[]): TypeConges[] {
    return listeTypes.map((type) => ({ ...type, joursPoses: this.getNombreJours(type.key, listeConges) }));
  }

  private getNombreJours(key: string, listeConges: Conges[]): number {
    return listeConges
      .map((conge) => conge.joursPris
        .filter((j) => j.type === key)
        .map((j) => j.nombreJours)
        .reduce((a, b) => a + b, 0))
      .reduce((a, b) => a + b, 0);
  }

  private updateEventId(conges: Conges, retourCalendar: any) {
    if ((conges.eventId === null || conges.eventId === undefined) && retourCalendar != null) {
      conges.eventId = retourCalendar.result.id;
    }
  }

}
