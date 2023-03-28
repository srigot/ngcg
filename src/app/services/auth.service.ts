import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user, User, UserCredential } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

declare let gapi: any;

const SCOPE = 'https://www.googleapis.com/auth/calendar';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _auth: Auth,
  ) {
    this.initClient();
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

  login(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    provider.addScope(SCOPE);
    return signInWithPopup(this._auth, provider);
  }

  logout(): Promise<void> {
    return signOut(this._auth);
  }

  get user$(): Observable<User> {
    return user(this._auth);
  }
}
