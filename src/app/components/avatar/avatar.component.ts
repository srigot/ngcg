import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  user$: Observable<firebase.User>;

  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.user;
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['login']);
      });
  }

}
