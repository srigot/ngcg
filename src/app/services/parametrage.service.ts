import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';


export function getSettings(parametrageService: ParametrageService) {
  return () => parametrageService.init();
}

@Injectable({
  providedIn: 'root',
  useFactory: getSettings,
})
export class ParametrageService {
  params = {};

  constructor(
    private db: AngularFirestore,
    public auth: AuthService,
  ) {
  }
  init() {
    this.auth.user.subscribe((user) => {
      if (user != null) {
        this.db.doc('users/' + user.uid).get().subscribe((doc) => {
          if (doc.exists) {
            this.params = doc.data();
          }
        });
      } else {
        this.params = {};
      }
    });

  }

  get showHistorique(): boolean {
    if (this.params['showHistorique'] !== undefined) {
      return this.params['showHistorique'];
    }
    return true;
  }
}
