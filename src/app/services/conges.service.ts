import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { Conges, FirestoreConges } from '../models/conges';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { TypeConges, FirestoreTypeConges } from '../models/type-conges';
import { firestore } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CongesService {
  private typesRef: AngularFirestoreCollection<FirestoreTypeConges>;
  private congesRef: AngularFirestoreCollection<FirestoreConges>;
  private userConnected: boolean;

  private listeConges: Observable<Conges[]>;

  constructor(private db: AngularFirestore, public afAuth: AngularFireAuth) {
    this.typesRef = db.collection('users/guest/types');
    this.congesRef = db.collection('users/guest/conges');
    this.afAuth.user.subscribe((user) => {
      if (user !== null) {
        this.typesRef = db.collection('users/' + user.uid + '/types');
        this.congesRef = db.collection('users/' + user.uid + '/conges');
        this.userConnected = true;
      } else {
        this.userConnected = false;
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

  private isUserConnected<T>(cbOK: (uid: string) => Observable<T>, cbKO: () => Observable<T>): Observable<T> {
    return this.afAuth.user.pipe(
      switchMap((user) => {
        if (user !== null) {
          return cbOK(user.uid);
        } else {
          return cbKO();
        }
      }),
    );
  }

  getAllConges(): Observable<Conges[]> {
    return this.isUserConnected<Conges[]>(
      (uid) => this.getAllCongesUser(uid),
      () => of([] as Conges[]),
    );
  }

  private getAllCongesUser(uid): Observable<Conges[]> {
    return this.getCongesRef(uid).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as FirestoreConges;
          const key = a.payload.doc.id;
          return this.firestoreToConges(key, data);
        });
      }),
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

  deleteConges(key: string): Promise<void> {
    return this.congesRef.doc(key).delete();
  }

  getAllTypes(): Observable<TypeConges[]> {
    return this.isUserConnected<TypeConges[]>(
      (uid) => this.getAllTypesUser(uid),
      () => of([] as TypeConges[]),
    );

  }
  private getAllTypesUser(uid): Observable<TypeConges[]> {
    return this.getTypesRef(uid).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as FirestoreTypeConges;
          const key = a.payload.doc.id;
          return this.firestoreToTypeConges(key, data);
        });
      }),
    );
  }

  getAllTypesAvecRestant(): Observable<TypeConges[]> {
    return this.isUserConnected<TypeConges[]>(
      (uid) => combineLatest(this.getAllTypesUser(uid), this.getAllCongesUser(uid)).pipe(
        map(([listeTypes, listeConges]) => this.calculerCongesRestants(listeTypes, listeConges)),
      ),
      () => of([] as TypeConges[]),
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
      key,
    };
  }

  private congesToFirestore(conge: Conges): FirestoreConges {
    return {
      dateDebut: this.convertToTimestamp(conge.dateDebut),
      dateFin: this.convertToTimestamp(conge.dateFin),
      joursPris: conge.joursPris,
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

  private convertToTimestamp(date: Date | null): firestore.Timestamp | null {
    return date === null ? null : firestore.Timestamp.fromDate(date);
  }

  private convertToDate(timestamp: firestore.Timestamp | null): Date | null {
    return timestamp === null ? null : timestamp.toDate();
  }

  private calculerCongesRestants(listeTypes: TypeConges[], listeConges: Conges[]): TypeConges[] {
    return listeTypes.map((type) => ({ ...type, joursPoses: this.getNombreJours(type.key, listeConges) }));
  }

  private getNombreJours(key: string, listeConges: Conges[]): number {
    console.log('key = ', key);
    return listeConges
      .map((conge) => conge.joursPris
        .filter((j) => j.type === key)
        .map((j) => j.nombreJours)
        .reduce((a, b) => a + b, 0))
      .reduce((a, b) => a + b, 0);
  }
}
