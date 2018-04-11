import { Subtask } from './../../../models/subtask';
import { TaskService } from './../../../task/task.service';
import { Task } from './../../../models/task';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [ TaskService ]
})
export class TaskListComponent implements OnInit {

  tasks: Array<Task>;
  private hasErrors = false;

  constructor(private taskService: TaskService, public dialog: MatDialog) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(
      (tasks) => {console.log(tasks); this.tasks = tasks; this.hasErrors = false},
      (error) => this.hasErrors = true
    );
  }

  onToggleSubtask(subtask: Subtask) {
    console.log('Subtask selected', subtask);
  }

  onAddTask() {
    this.dialog.open(AddTaskDialogComponent);
  }

}
