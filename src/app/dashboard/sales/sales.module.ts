import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesListComponent } from './sales-list/sales-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatElementsModule } from '../../mat-elements/mat-elements.module';
@NgModule({
  declarations: [SalesListComponent],
  entryComponents:[],
  providers:[MatDatepickerModule,DatePipe,

    ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MatElementsModule,
        FormsModule,
        ReactiveFormsModule,
  ]
})
export class SalesModule { }
