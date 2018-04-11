import { NgModule } from '@angular/core';

import { 
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatTabsModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatExpansionModule,
  MatListModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
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
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class CustomMaterialModule { }
