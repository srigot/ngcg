import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as moment from 'moment';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertToDate, convertToTimestamp } from '../helpers/types-converters';
import { FirestoreTypeConges, TypeConges } from '../models/type-conges';
import { AuthService } from './auth.service';
import { ParametrageService } from './parametrage.service';
import firebase from 'firebase/app';
import { CongesService } from './conges.service';
import { Conges } from '../models/conges';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  private _typesRef: AngularFirestoreCollection<FirestoreTypeConges> = null;
  private _typesSubject = new BehaviorSubject<TypeConges[]>([]);

  constructor(
    private _db: AngularFirestore,
    public auth: AuthService,
    private _parametrageService: ParametrageService,
    private _congesServices: CongesService,
  ) {
    this.auth.user$.subscribe((user) => {
      if (user !== null) {
        this._typesRef = this._db.collection('users/' + user.uid + '/types');
        this._subscribeData(user.uid);
      } else {
        this._typesRef = null;
        this._typesSubject.next([]);
      }
    });
  }

  private _subscribeData(uid: string): void {
    this._getTypesRef(uid).snapshotChanges().subscribe(actions => {
      this._typesSubject.next(actions.map(a => {
        const data = a.payload.doc.data() as FirestoreTypeConges;
        const key = a.payload.doc.id;
        return this.firestoreToTypeConges(key, data);
      }));
    });
  }

  private _getTypesRef(uid: string): AngularFirestoreCollection<FirestoreTypeConges> {
    return this._db.collection('users/' + uid + '/types', ref => ref.orderBy('dateDebut'));
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
    return this._typesRef.doc<FirestoreTypeConges>(key).valueChanges().pipe(
      map(type => this.firestoreToTypeConges(key, type)),
    );
  }

  updateType(type: TypeConges): Promise<void> {
    return this._typesRef.doc(type.key).update(this.typeCongesToFirestore(type));
  }

  saveType(type: TypeConges): Promise<firebase.firestore.DocumentReference> {
    return this._typesRef.add(this.typeCongesToFirestore(type));
  }

  deleteType(key: string): Promise<void> {
    return this._typesRef.doc(key).delete();
  }

  private firestoreToTypeConges(key: string, typeConges: FirestoreTypeConges): TypeConges {
    return {
      dateDebut: convertToDate(typeConges.dateDebut),
      dateFin: convertToDate(typeConges.dateFin),
      nom: typeConges.nom,
      nombreJours: typeConges.nombreJours,
      key,
    };
  }
  private typeCongesToFirestore(type: TypeConges): FirestoreTypeConges {
    return {
      dateDebut: convertToTimestamp(type.dateDebut),
      dateFin: convertToTimestamp(type.dateFin),
      nom: type.nom,
      nombreJours: type.nombreJours,
    };
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
