import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ParametrageService {

  constructor(
    private db: AngularFirestore,
    public auth: AuthService,
  ) {
  }
  init() {
  }

  getDocShowHistorique(uid: string) {
    return this.db.collection('users/' + uid + '/params').doc('showHistorique');
  }

  getParamShowHistoriqueConnected(userId): Observable<boolean> {
    return this.getDocShowHistorique(userId).valueChanges().pipe(
      map((p: any) => p.valeur)
    );
  }

  getParamShowHistorique(): Observable<boolean> {
    return this.auth.isUserConnected(uid => this.getParamShowHistoriqueConnected(uid));
  }

  modifyParamShowHistorique(valeur: boolean) {
    const uid = this.auth.connectedUserId;
    if (uid != null) {
      this.getDocShowHistorique(uid).update({ valeur });
    }
  }
}
