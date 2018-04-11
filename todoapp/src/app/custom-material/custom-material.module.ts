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
  ]
})
export class CustomMaterialModule { }
