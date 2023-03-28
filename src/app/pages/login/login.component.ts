import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user$: Observable<User>;

  constructor(public authService: AuthService, private calendarService: CalendarService, private router: Router) {
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
  }

  login() {
    this.authService.login().then((user) => {
      console.log('user', user);
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
