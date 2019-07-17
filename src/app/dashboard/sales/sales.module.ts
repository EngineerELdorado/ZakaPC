import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesListComponent } from './sales-list/sales-list.component';
import { BlockUIModule } from 'ng-block-ui';
import { MatInputModule, MatDialogModule, MatTableModule, MatProgressBarModule, MatBadgeModule, MatPaginatorModule, MatSortModule, MatIconModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';
import { FlexmonsterPivotModule } from 'ng-flexmonster';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SalesListComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    BlockUIModule.forRoot(),
    MatInputModule,
    MatDialogModule,
        MatTableModule,
        MatProgressBarModule,
        MatBadgeModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatProgressSpinnerModule,
        FlexmonsterPivotModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule
  ]
})
export class SalesModule { }
