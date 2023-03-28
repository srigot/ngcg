import { Injectable } from '@angular/core';
import { doc, DocumentReference, Firestore, onSnapshot, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ParametrageService {
  private _showHistoriqueSubject$ = new BehaviorSubject(true);
  private _docShowHistorique: DocumentReference<unknown>;
  private docSubscription: Subscription = null;

  constructor(
    public auth: AuthService,
    private _firestore: Firestore,
  ) {
    this.auth.user$.subscribe(user => {
      if (user !== null) {
        this._docShowHistorique = doc(this._firestore, 'users/' + user.uid + '/params/showHistorique');
        onSnapshot(this._docShowHistorique, {
          next: (snapshot) => {
            const value = snapshot.data() as { valeur: boolean };
            this._showHistoriqueSubject$.next(value === undefined ? false : value.valeur);
          }
        });
      } else {
        this._docShowHistorique = null;
        this._showHistoriqueSubject$.next(true);
        this.docSubscription?.unsubscribe();
      }
    });
  }


  get showHistorique$(): Observable<boolean> {
    return this._showHistoriqueSubject$;
  }

  get showHistorique(): boolean {
    return this._showHistoriqueSubject$.value;
  }

  modifyParamShowHistorique(valeur: boolean) {
    setDoc(this._docShowHistorique, { valeur });
  }
}
