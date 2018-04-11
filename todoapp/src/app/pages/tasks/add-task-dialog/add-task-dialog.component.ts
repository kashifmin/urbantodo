import { TaskService } from './../../../task/task.service';
import { Task } from './../../../models/task';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css'],
  providers: [TaskService]
})
export class AddTaskDialogComponent implements OnInit {

  task: Task = { title: "", due_date: "", status: "Pending", subtasks: []};

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.task.due_date = this.formatDate(this.task.due_date);
    console.log(JSON.stringify(this.task));
    this.taskService.addTask(this.task).subscribe(
      (res) => {
        console.log(res);
        this.dialogRef.close();
      }
    )
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

}
