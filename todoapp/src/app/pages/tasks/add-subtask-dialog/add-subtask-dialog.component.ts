import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskService } from '../../../task/task.service';
import { Subtask } from '../../../models/subtask';

@Component({
  selector: 'app-add-subtask-dialog',
  templateUrl: './add-subtask-dialog.component.html',
  styleUrls: ['./add-subtask-dialog.component.css'],
  providers: [TaskService]
})
export class AddSubtaskDialogComponent implements OnInit {
  subtask: Subtask = { title: '', status: 'Pending'};
  parentId: number;

  constructor(
    public dialogRef: MatDialogRef<AddSubtaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.parentId = this.data.task.id;
  }

  onSave() {
    this.taskService.addSubtask(this.parentId, this.subtask).subscribe(
      (res) => {
        this.dialogRef.close();
      }
    )
  }

}
