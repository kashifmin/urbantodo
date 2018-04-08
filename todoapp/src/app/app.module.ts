import { CustomMaterialModule } from './custom-material/custom-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskListComponent } from './pages/tasks/task-list/task-list.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: "tasks", component: TaskListComponent },
  { path: "", component: LoginComponent, pathMatch: 'prefix' }
]

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    CustomMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
