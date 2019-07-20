import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesListComponent } from './sales-list/sales-list.component';
import { BlockUIModule } from 'ng-block-ui';
import { MatInputModule, MatDialogModule, MatTableModule, MatProgressBarModule, MatBadgeModule, MatPaginatorModule, MatSortModule, MatIconModule, MatProgressSpinnerModule, MatCardModule, MatNativeDateModule, MAT_DATE_LOCALE, MatButtonModule } from '@angular/material';
import { FlexmonsterPivotModule } from 'ng-flexmonster';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { SaleDetailsComponent } from './sale-details/sale-details.component';
import { InvoiceComponent } from './invoice/invoice.component';
import {MatMenuModule} from '@angular/material/menu';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [SalesListComponent, AddPaymentComponent, SaleDetailsComponent, InvoiceComponent],
  entryComponents:[AddPaymentComponent,SaleDetailsComponent,InvoiceComponent],
  providers:[MatDatepickerModule,DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    { provide: LOCALE_ID, useValue: "fr-FR" }],
  imports: [
    CommonModule,
    SalesRoutingModule,
    BlockUIModule.forRoot(),
    MatInputModule,
    MatDialogModule,
        MatTableModule,
        MatSelectModule,
        MatProgressBarModule,
        MatBadgeModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule, 
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatProgressSpinnerModule,
        FlexmonsterPivotModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatMenuModule
  ]
})
export class SalesModule { }
