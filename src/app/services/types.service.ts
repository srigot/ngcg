import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, DocumentData, Firestore, FirestoreDataConverter, orderBy, query, updateDoc, WithFieldValue } from '@angular/fire/firestore';
import moment from 'moment';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { convertToDate, convertToTimestamp } from '../helpers/types-converters';
import { Conges } from '../models/conges';
import { TypeConges } from '../models/type-conges';
import { AuthService } from './auth.service';
import { CongesService } from './conges.service';
import { ParametrageService } from './parametrage.service';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  private _typesRef: CollectionReference<DocumentData>;
  private _types$?: Observable<DocumentData[]>;
  private _typesSubject = new BehaviorSubject<TypeConges[]>([]);
  private _converter: FirestoreDataConverter<TypeConges> = {
    toFirestore(type: WithFieldValue<TypeConges>): DocumentData {
      return {
        dateDebut: convertToTimestamp(type.dateDebut as moment.Moment),
        dateFin: convertToTimestamp(type.dateFin as moment.Moment),
        nom: type.nom,
        nombreJours: type.nombreJours,
        anticipable: type.anticipable,
      };
    },
    fromFirestore(snapshot, options) {
      const data = snapshot.data(options);
      return {
        dateDebut: convertToDate(data.dateDebut),
        dateFin: convertToDate(data.dateFin),
        nom: data.nom,
        nombreJours: data.nombreJours,
        anticipable: data.anticipable ?? false,
        key: data.key,
      };

    },
  }
  constructor(
    private _firestore: Firestore,
    public auth: AuthService,
    private _parametrageService: ParametrageService,
    private _congesServices: CongesService,
  ) {
    this.auth.user$.pipe(
      tap(user => {
        this._typesRef = user ? collection(this._firestore, 'users/' + user.uid + '/types').withConverter(this._converter) : null;
      }), switchMap(user => {
        return (user ? collectionData(query(this._typesRef, orderBy('dateDebut')), { idField: 'key' }) : of([])) as Observable<TypeConges[]>;
      }),
    ).subscribe(types => { this._typesSubject.next(types); });
  }

  getAllTypes(): Observable<TypeConges[]> {
    return this._typesSubject.pipe(
      map(types => types.filter(type => this._parametrageService.showHistorique || moment().startOf('year').isBefore(type.dateFin)))
    );
  }

  getTypesAvecRestantFiltres(): Observable<TypeConges[]> {
    return combineLatest([this._typesSubject, this._congesServices.conges$]).pipe(
      map(([listeTypes, listeConges]) => this.calculerCongesRestants(listeTypes, listeConges).filter(
        type => this._parametrageService.showHistorique || moment().startOf('year').isBefore(type.dateFin))
      ));
  }

  getType(key: string): Observable<TypeConges> {
    return this._typesSubject.pipe(
      map(types => types.find(c => c.key === key))
    );
  }

  updateType(type: TypeConges): Promise<void> {
    const refDoc = doc(this._typesRef, type.key).withConverter(this._converter);
    return updateDoc(refDoc, this._converter.toFirestore(type));
  }

  saveType(type: TypeConges) {
    return addDoc(this._typesRef, this._converter.toFirestore(type));
  }

  deleteType(key: string): Promise<void> {
    const refDoc = doc(this._typesRef, key).withConverter(this._converter);
    return deleteDoc(refDoc);
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
}
