import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatDialogModule, MatMenuModule,
   MatTableModule, MatProgressBarModule, MatBadgeModule,
   MatPaginatorModule, MatSortModule, MatIconModule,
   MatProgressSpinnerModule, MatCardModule, MatButtonModule,
   MatGridListModule, MatListModule, MatBottomSheetModule,
    MatFormFieldModule, MatToolbarModule, MatSidenavModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';

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
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),

    BlockUIModule.forRoot(),
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
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule,
    BlockUIModule,
      ]
})
export class MatElementsModule { }
