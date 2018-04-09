import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

class UserModel {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {
  user: UserModel = new UserModel();


  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.onAuthStateChanged.subscribe(
      (state) => console.log("authstate", state)
    )
  }

  onLogin() {
    this.auth.login(this.user.username, this.user.password);
  }

  onSignup() {

  }

}
