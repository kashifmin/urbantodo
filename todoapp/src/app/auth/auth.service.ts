import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class UserModel {
  username: string;
  apikey: string;
}

@Injectable()
export class AuthService {

  readonly API_URL = 'http://localhost:8000/api/v1/auth';
  readonly LOGIN_URL = this.API_URL + '/login';

  onAuthStateChanged: Observable<UserModel>;
  private authStateSubject: BehaviorSubject<UserModel>;

  constructor(private http: Http) {
    console.log("authservie instantiated")
    this.authStateSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("user")));
    this.onAuthStateChanged = this.authStateSubject.asObservable();
  }

  login(username: string, password: string) {
    let headers: Headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(username + ":" + password)); 
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    this.http.get(this.LOGIN_URL, { headers: headers })
    .subscribe((res) => {
      console.log(res.json()); // testing
      
      if(res.status == 200) {
        let user = new UserModel();
        let body = res.json()
        user.username = body.user.username;
        user.apikey = body.key;

        localStorage.setItem("user", JSON.stringify(user));
        this.authStateSubject.next(JSON.parse(localStorage.getItem("user")) as UserModel)
      }
    }) 
  }

  logout() {
    localStorage.removeItem("user");
    this.authStateSubject.next(null);
  }

  

}
