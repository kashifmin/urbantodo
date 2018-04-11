import { map } from 'rxjs/operators';
import { Task } from './../models/task';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { UserModel, AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskService {
  private static API_BASE = 'http://localhost:8000/api/v1';
  private static TASK_API = TaskService.API_BASE + '/task/';
  private user: UserModel;

  constructor(private auth: AuthService, private http: Http) { 
    this.auth.onAuthStateChanged.subscribe(user => this.user = user);
  }

  getTasks() : Observable<Array<Task>> {
    let headers: Headers = new Headers();
    headers.append("Authorization", "ApiKey " + this.user.username + ':' + this.user.apikey); 
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    return this.http.get(TaskService.TASK_API, { headers: headers })
            .pipe(map(res => {
              if(res.status == 200) {
                let body = res.json();
                return body.objects as Array<Task>;
              } else {
                return null;
              }
            })
          );
  }

}
