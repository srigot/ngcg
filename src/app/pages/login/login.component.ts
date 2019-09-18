import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { CalendarService } from 'src/app/services/calendar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user$: Observable<firebase.User>;

  constructor(public authService: AuthService, private calendarService: CalendarService, private router: Router) {
    this.user$ = this.authService.user;
  }

  ngOnInit() {
  }

  login() {
    this.authService.login().then((user) => {
      if (user) {
        this.router.navigate(['conges']);
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  callCalendar() {
    this.calendarService.getListeCalendrier();
  }
}
