import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conges, FirestoreConges } from '../models/conges';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { TypeConges, FirestoreTypeConges } from '../models/type-conges';

@Injectable({
  providedIn: 'root'
})
export class CongesService {

  constructor(private db: AngularFirestore) { }

  getAllConges(): Observable<Conges[]> {
    return this.db.collection('conges').valueChanges().pipe(
      map((conges: FirestoreConges[]) => this.transformConges(conges))
    );
  }

  getAllTypes(): Observable<TypeConges[]> {
    return this.db.collection('types').valueChanges().pipe(
      map((typeConges: FirestoreTypeConges[]) => this.transformTypeConges(typeConges))
    );
  }

  private transformConges(conges: FirestoreConges[]): Conges[] {
    return conges.map(conge => ({
      dateDebut: conge.dateDebut.toDate(),
      dateFin: conge.dateFin.toDate(),
      joursPris: conge.joursPris,
    }));
  }

  private transformTypeConges(listTypeConges: FirestoreTypeConges[]): TypeConges[] {
    return listTypeConges.map(typeConges => ({
      dateDebut: typeConges.dateDebut.toDate(),
      dateFin: typeConges.dateFin.toDate(),
      nom: typeConges.nom,
      nombreJours: typeConges.nombreJours,
    }));
  }
}
