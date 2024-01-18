import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  user$: Observable<User>;

  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
    // Nothing
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['login']);
      });
  }

}
