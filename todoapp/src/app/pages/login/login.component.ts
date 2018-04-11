import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

class UserModel {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel = new UserModel();


  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    console.log(this.auth)
    this.auth.onAuthStateChanged.subscribe(
      (user) => {
        console.log("login page auth state", user);
        // if(user != null) {
        //   this.router.navigate(['tasks']);
        // }
      }
    )
  }

  onLogin() {
    this.auth.login(this.user.username, this.user.password);
  }

  onSignup() {

  }

}
