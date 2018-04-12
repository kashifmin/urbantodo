import { map } from 'rxjs/operators';
import { Task } from './../models/task';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { UserModel, AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Subtask } from '../models/subtask';

@Injectable()
export class TaskService {
  private static API_BASE = 'http://localhost:8000/api/v1';
  private static TASK_API = TaskService.API_BASE + '/task/';
  private static SUBTASK_API = TaskService.API_BASE + '/subtask/';
  private user: UserModel;

  constructor(private auth: AuthService, private http: Http) { 
    this.auth.onAuthStateChanged.subscribe(user => this.user = user);
  }

  getTasks(searchText = '', dateFilter = '') : Observable<Array<Task>> {
    let headers: Headers = new Headers();
    headers.append("Authorization", "ApiKey " + this.user.username + ':' + this.user.apikey); 
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let apiUrl = TaskService.TASK_API;
    if(searchText != '' || dateFilter != '') {
      let myParams = new HttpParams()
      if(searchText != '') myParams = myParams.set('title__contains', searchText)
      if(dateFilter != '') myParams = myParams.set('due_date', dateFilter)
      apiUrl += '?' + myParams.toString();
    }

    

    console.log("req params", apiUrl)
    return this.http.get(apiUrl, { headers: headers })
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

  addTask(task: Task): Observable<any> {
    let headers: Headers = new Headers();
    headers.append("Authorization", "ApiKey " + this.user.username + ':' + this.user.apikey); 
    headers.append("Content-Type", "application/json");

    return this.http.post(TaskService.TASK_API, task, { headers: headers });
  }

  addSubtask(parentId: number, subtask: Subtask) {
    let headers: Headers = new Headers();
    headers.append("Authorization", "ApiKey " + this.user.username + ':' + this.user.apikey); 
    headers.append("Content-Type", "application/json");

    let body = { parent: '/api/v1/task/' + parentId + '/', ...subtask};
    console.log(body)

    return this.http.post(TaskService.SUBTASK_API, body, { headers: headers });
  }

}
