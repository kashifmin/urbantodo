import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {

  readonly API_URL = 'http://localhost:8000/api/v1/auth';
  readonly LOGIN_URL = this.API_URL + '/login';

  constructor(private http: Http) { }

  login(username: string, password: string) {
    let headers: Headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(username + ":" + password)); 
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    this.http.get(this.LOGIN_URL, { headers: headers })
    .subscribe((res) => console.log('res', res))
  }

}
