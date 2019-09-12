import { Component, OnInit } from '@angular/core';
import { Theme } from 'ngx-auth-firebaseui';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  themes = Theme;
  user$: Observable<firebase.User>;

  constructor(public authService: AuthService) {
    this.user$ = this.authService.user;
  }

  ngOnInit() {
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
