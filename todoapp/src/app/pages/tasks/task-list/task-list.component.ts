import { Subtask } from './../../../models/subtask';
import { TaskService } from './../../../task/task.service';
import { Task } from './../../../models/task';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [ TaskService ]
})
export class TaskListComponent implements OnInit {

  private tasks: Array<Task>;
  private hasErrors = false;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(
      (tasks) => {console.log(tasks); this.tasks = tasks; this.hasErrors = false},
      (error) => this.hasErrors = true
    );
  }

  onToggleSubtask(subtask: Subtask) {
    console.log('Subtask selected', subtask);
  }



}
