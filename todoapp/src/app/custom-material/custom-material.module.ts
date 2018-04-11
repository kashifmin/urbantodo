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
  ]
})
export class CustomMaterialModule { }
