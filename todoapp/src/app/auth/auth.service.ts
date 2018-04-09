import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subscriber } from 'rxjs/Subscriber';

class UserModel {
  username: string;
  apikey: string;
}

@Injectable()
export class AuthService {

  readonly API_URL = 'http://localhost:8000/api/v1/auth';
  readonly LOGIN_URL = this.API_URL + '/login';

  onAuthStateChanged: Observable<UserModel>;
  private subscriber: Subscriber<UserModel>;

  constructor(private http: Http) {
    this.onAuthStateChanged = new Observable<UserModel>(
      (subscriber) => {
        this.subscriber = subscriber;
        subscriber.next(JSON.parse(localStorage.getItem('user')) as UserModel);
      }
    )
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
        this.subscriber.next(JSON.parse(localStorage.getItem("user")) as UserModel)
      }
    })
  }

  

}
