import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ParametrageService {
  private _showHistoriqueSubject$ = new BehaviorSubject(true);
  private _docShowHistorique: AngularFirestoreDocument<unknown>;
  private docSubscription: Subscription = null;

  constructor(
    private db: AngularFirestore,
    public auth: AuthService,
  ) {
    this.auth.user$.subscribe(user => {
      if (user !== null) {
        this._docShowHistorique = this.db.collection('users/' + user.uid + '/params').doc('showHistorique');
        this.docSubscription = this._getParamShowHistoriqueConnected().subscribe(value =>
          this._showHistoriqueSubject$.next(value));
      } else {
        this._docShowHistorique = null;
        this._showHistoriqueSubject$.next(true);
        this.docSubscription?.unsubscribe();
      }
    });
  }

  private _getParamShowHistoriqueConnected(): Observable<boolean> {
    return this._docShowHistorique.valueChanges().pipe(
      map((p: any) => (p === undefined) ? true : p.valeur)
    );
  }

  get showHistorique$(): Observable<boolean> {
    return this._showHistoriqueSubject$;
  }

  get showHistorique(): boolean {
    return this._showHistoriqueSubject$.value;
  }

  modifyParamShowHistorique(valeur: boolean) {
    this._docShowHistorique.set({ valeur });
  }
}
