import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatMenuModule,
  MatButtonModule, 
  MatCardModule,
  MatDialog,
  MatDialogModule,
  MatIconModule, 
  MatFormFieldModule,
  MatInputModule, 
  MatListModule,
  MatSidenavModule, 
  MatToolbarModule, 
  MatIcon,
  MatExpansionModule,
  MatGridListModule,
  MatTabsModule,
  MAT_DIALOG_DATA,
  MatStepperModule
} from '@angular/material';

@NgModule({
  imports: [
    MatMenuModule,
    CommonModule,
    MatButtonModule, 
    MatCardModule,
    MatDialogModule,
    MatIconModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatListModule,
    MatSidenavModule, 
    MatToolbarModule,
    MatExpansionModule, 
    MatGridListModule,
    MatTabsModule,
    MatStepperModule,
  ],
  exports: [
    MatMenuModule,
    MatButtonModule, 
    MatCardModule,
    MatDialogModule,
    MatIconModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatListModule,
    MatSidenavModule, 
    MatToolbarModule, 
    MatExpansionModule,
    MatGridListModule,
    MatTabsModule,
    MatStepperModule
  ],
  declarations: [],
  providers: [
    MatDialog,
     { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})

export class MaterialModule { }