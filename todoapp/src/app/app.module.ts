import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskListComponent } from './pages/tasks/task-list/task-list.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AddTaskDialogComponent } from './pages/tasks/add-task-dialog/add-task-dialog.component';
import { AddSubtaskDialogComponent } from './pages/tasks/add-subtask-dialog/add-subtask-dialog.component';

const routes: Routes = [
  { path: "tasks", component: TaskListComponent, canActivate: [ AuthGuard ] },
  { path: "login", component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    LoginComponent,
    AddTaskDialogComponent,
    AddSubtaskDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    CustomMaterialModule,
    FormsModule,
    HttpModule,
    AuthModule
  ],
  entryComponents: [ AddTaskDialogComponent, AddSubtaskDialogComponent ],
  providers: [ AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
