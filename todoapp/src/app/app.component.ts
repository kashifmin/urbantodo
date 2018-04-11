import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService, UserModel } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user: UserModel = null;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.onAuthStateChanged.subscribe((user) => {
      console.log("app comp auth stte", user);
      this.user = user;
      if(user == null) {
        this.router.navigate(['login'])
      } else {
        this.router.navigate(['tasks'])
      }
    });
  }

  logout() {
    console.log("logout clickd")
    this.auth.logout()
  }

  
}
