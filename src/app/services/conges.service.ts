import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, DocumentData, DocumentReference, Firestore, FirestoreDataConverter, orderBy, query, updateDoc, WithFieldValue } from '@angular/fire/firestore';
import * as moment from 'moment';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { convertToDate, convertToTimestamp } from '../helpers/types-converters';
import { Conges } from '../models/conges';
import { AuthService } from './auth.service';
import { CalendarService } from './calendar.service';
import { ParametrageService } from './parametrage.service';

@Injectable({
  providedIn: 'root'
})
export class CongesService {
  private congesRef: CollectionReference<DocumentData>;
  private _congesSubject = new BehaviorSubject<Conges[]>([]);
  private _subscription: Subscription = null;

  private _converter: FirestoreDataConverter<Conges> = {
    toFirestore(conge: WithFieldValue<Conges>): DocumentData {
      return {
        dateDebut: convertToTimestamp(conge.dateDebut as moment.Moment),
        dateFin: convertToTimestamp(conge.dateFin as moment.Moment),
        joursPris: conge.joursPris,
        eventId: conge.eventId,
        previsionnel: conge.previsionnel || null,
      }
    },
    fromFirestore(snapshot, options): Conges {
      const data = snapshot.data(options);
      return {
        dateDebut: convertToDate(data.dateDebut),
        dateFin: convertToDate(data.dateFin),
        joursPris: data.joursPris,
        eventId: data.eventId,
        previsionnel: data.previsionnel || null,
        key: data.key,
      }
    }
  }

  constructor(
    private _firestore: Firestore,
    public auth: AuthService,
    private calendarService: CalendarService,
    private parametrageService: ParametrageService,
  ) {
    this.auth.user$.pipe(
      tap(user => {
        this.congesRef = user ? collection(this._firestore, 'users/' + user.uid + '/conges').withConverter(this._converter) : null;
      }), switchMap(user => {
        return (user ? collectionData(query(this.congesRef, orderBy('dateDebut')), { idField: 'key' }) : of([])) as Observable<Conges[]>;
      }),
    ).subscribe(conges => { this._congesSubject.next(conges); });
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
    return this._congesSubject.pipe(
      map(conges => conges.find(c => c.key === key))
    );
  }

  updateConge(conges: Conges): Promise<void> {
    const refDoc = doc(this.congesRef, conges.key).withConverter(this._converter);
    return updateDoc(refDoc, this._converter.toFirestore(conges));
  }

  saveConges(conges: Conges): Promise<DocumentReference<DocumentData>> {
    return addDoc(this.congesRef, this._converter.toFirestore(conges));
  }

  updateCongeWithCalendar(conges: Conges): Promise<void> {
    return this.calendarService.mettreAJourCalendrier(conges)
      .then((retourCalendar) => {
        this.updateEventId(conges, retourCalendar);
        return this.updateConge(conges);
      });
  }

  saveCongesWithCalendar(conges: Conges): Promise<DocumentReference<DocumentData>> {
    return this.calendarService.mettreAJourCalendrier(conges)
      .then((retourCalendar) => {
        this.updateEventId(conges, retourCalendar);
        return this.saveConges(conges);
      });
  }

  deleteConges(key: string): Promise<void> {
    const refDoc = doc(this.congesRef, key).withConverter(this._converter);
    return deleteDoc(refDoc);
  }

  private updateEventId(conges: Conges, retourCalendar: any) {
    if ((conges.eventId === null || conges.eventId === undefined) && retourCalendar != null) {
      conges.eventId = retourCalendar.result.id;
    }
  }

}
