import { NgModule } from '@angular/core';

import { 
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatTabsModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class CustomMaterialModule { }
