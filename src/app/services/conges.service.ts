import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Conges, FirestoreConges } from '../models/conges';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import { CalendarService } from './calendar.service';
import * as moment from 'moment';
import { AuthService } from './auth.service';
import { ParametrageService } from './parametrage.service';
import { convertToDate, convertToTimestamp } from '../helpers/types-converters';

@Injectable({
  providedIn: 'root'
})
export class CongesService {
  private congesRef: AngularFirestoreCollection<FirestoreConges>;
  private _congesSubject = new BehaviorSubject<Conges[]>([]);
  private _subscription: Subscription = null;

  constructor(
    private db: AngularFirestore,
    public auth: AuthService,
    private calendarService: CalendarService,
    private parametrageService: ParametrageService,
  ) {
    this.auth.user$.subscribe((user) => {
      if (user !== null) {
        this.congesRef = db.collection('users/' + user.uid + '/conges');
        this._subscription = this._subscribeData(user.uid);
      } else {
        this.congesRef = null;
        this._congesSubject.next([]);
        this._subscription?.unsubscribe();
      }
    });
  }

  private _subscribeData(uid): Subscription {
    return this._getCongesRef(uid).snapshotChanges().subscribe(actions => {
      this._congesSubject.next(actions.map(a => {
        const data = a.payload.doc.data() as FirestoreConges;
        const key = a.payload.doc.id;
        return this.firestoreToConges(key, data);
      }))
    });
  }

  private _getCongesRef(uid: string): AngularFirestoreCollection<FirestoreConges> {
    return this.db.collection('users/' + uid + '/conges', ref => ref.orderBy('dateDebut'));
  }


  public getAllConges(): Observable<Conges[]> {
    return this._congesSubject.pipe(
      map(conges => conges.filter(conge => this.parametrageService.showHistorique || moment().startOf('year').isBefore(conge.dateFin)))
    );
  }

  public get conges$() {
    return this._congesSubject;
  }

  getConge(key: string): Observable<Conges> {
    return this.congesRef.doc<FirestoreConges>(key).valueChanges().pipe(
      map(conge => this.firestoreToConges(key, conge)),
    );
  }

  updateConge(conges: Conges): Promise<void> {
    return this.congesRef.doc(conges.key).update(this.congesToFirestore(conges));
  }

  saveConges(conges: Conges): Promise<firebase.firestore.DocumentReference> {
    return this.congesRef.add(this.congesToFirestore(conges));
  }

  updateCongeWithCalendar(conges: Conges): Promise<void> {
    return this.calendarService.mettreAJourCalendrier(conges)
      .then((retourCalendar) => {
        this.updateEventId(conges, retourCalendar);
        return this.updateConge(conges);
      });
  }

  saveCongesWithCalendar(conges: Conges): Promise<firebase.firestore.DocumentReference> {
    return this.calendarService.mettreAJourCalendrier(conges)
      .then((retourCalendar) => {
        this.updateEventId(conges, retourCalendar);
        return this.saveConges(conges);
      });
  }

  deleteConges(key: string): Promise<void> {
    return this.congesRef.doc(key).delete();
  }



  private firestoreToConges(key: string, conge: FirestoreConges): Conges {
    return {
      dateDebut: convertToDate(conge.dateDebut),
      dateFin: convertToDate(conge.dateFin),
      joursPris: conge.joursPris,
      eventId: conge.eventId,
      previsionnel: conge.previsionnel || null,
      key,
    };
  }

  private congesToFirestore(conge: Conges): FirestoreConges {
    return {
      dateDebut: convertToTimestamp(conge.dateDebut),
      dateFin: convertToTimestamp(conge.dateFin),
      joursPris: conge.joursPris,
      eventId: conge.eventId,
      previsionnel: conge.previsionnel || null,
    };
  }




  private updateEventId(conges: Conges, retourCalendar: any) {
    if ((conges.eventId === null || conges.eventId === undefined) && retourCalendar != null) {
      conges.eventId = retourCalendar.result.id;
    }
  }

}
