import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ParametrageService {
  private _showHistoriqueSubject$ = new BehaviorSubject(true);

  constructor(
    private db: AngularFirestore,
    public auth: AuthService,
  ) {
    this.auth.isUserConnected(uid => this.getParamShowHistoriqueConnected(uid))
      .subscribe(value => this._showHistoriqueSubject$.next(value));
  }

  private _getDocShowHistorique(uid: string) {
    return this.db.collection('users/' + uid + '/params').doc('showHistorique');
  }

  getParamShowHistoriqueConnected(userId): Observable<boolean> {
    return this._getDocShowHistorique(userId).valueChanges().pipe(
      map((p: any) => (p === undefined) ? true : p.valeur)
    );
  }

  getParamShowHistorique(): Observable<boolean> {
    return this._showHistoriqueSubject$;
  }

  get showHistorique(): boolean {
    return this._showHistoriqueSubject$.value;
  }

  modifyParamShowHistorique(valeur: boolean) {
    const uid = this.auth.connectedUserId;
    if (uid != null) {
      this._getDocShowHistorique(uid).set({ valeur });
    }
  }
}
