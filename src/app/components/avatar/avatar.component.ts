import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  user$: Observable<firebase.User>;

  constructor(authService: AuthService) {
    this.user$ = authService.user;
  }

  ngOnInit() {
  }

}
