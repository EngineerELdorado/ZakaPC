import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { InvoiceComponent } from './sales/invoice/invoice.component';
import { AddPaymentComponent } from './sales/add-payment/add-payment.component';
import { SaleDetailsComponent } from './sales/sale-details/sale-details.component';
import { ConfirmDeleteSaleComponent } from './sales/confirm-delete-sale/confirm-delete-sale.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatElementsModule } from '../mat-elements/mat-elements.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LimitNamePipe } from '../limit-name.pipe';
import { SubstringNamePipe } from './pos/substring-name.pipe';
@NgModule({
  declarations: [DashboardComponent, InvoiceComponent,
     AddPaymentComponent, SaleDetailsComponent,
     LimitNamePipe,
    SubstringNamePipe,
     ConfirmDeleteSaleComponent, ContactUsComponent],
  entryComponents:[AddPaymentComponent,SaleDetailsComponent,ConfirmDeleteSaleComponent,InvoiceComponent],
  providers: [DatePipe,
    { provide: MAT_DIALOG_DATA, useValue: {} }],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatElementsModule,
    ReactiveFormsModule,
    FormsModule,
  ],exports:[InvoiceComponent, AddPaymentComponent, SaleDetailsComponent,ConfirmDeleteSaleComponent]
})
export class DashboardModule { }
