import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';

declare var gapi: any;

const SCOPE = 'https://www.googleapis.com/auth/calendar';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectedUserId: string = null;

  constructor(public afAuth: AngularFireAuth) {
    this.initClient();

    this.user.subscribe(user => {
      this.connectedUserId = user.uid;
    });
  }

  private initClient() {
    gapi.load('client', () => {
      console.log('loaded client');

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: environment.firebase.apiKey,
        clientId: environment.firebase.clientId,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPE,
      });

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));

    });
  }

  login(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope(SCOPE);
    return this.afAuth.signInWithPopup(provider);
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  get user(): Observable<firebase.User> {
    return this.afAuth.user;
  }

  public isUserConnected<T>(cbOK: (uid: string) => Observable<T>): Observable<T> {
    return this.afAuth.user.pipe(
      switchMap((user) => {
        if (user !== null) {
          return cbOK(user.uid);
        } else {
          throwError('Not Connected');
        }
      }),
    );
  }
}
