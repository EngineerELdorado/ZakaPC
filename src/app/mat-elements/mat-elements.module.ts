import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatDialogModule, MatMenuModule,
   MatTableModule, MatProgressBarModule, MatBadgeModule, 
   MatPaginatorModule, MatSortModule, MatIconModule, 
   MatProgressSpinnerModule, MatCardModule, MatButtonModule, 
   MatGridListModule, MatListModule, MatBottomSheetModule,
    MatFormFieldModule, MatToolbarModule, MatSidenavModule, MatAutocompleteModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
        MatTableModule,
        MatProgressBarModule,
        MatBadgeModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
    MatListModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatSidenavModule,
  ],
  exports:[MatInputModule,
    MatDialogModule,
    MatMenuModule,
        MatTableModule,
        MatProgressBarModule,
        MatBadgeModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatBadgeModule,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatDialogModule,
        MatBottomSheetModule,
        MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatAutocompleteModule
      ]
})
export class MatElementsModule { }
