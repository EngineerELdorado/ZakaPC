import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { InvoiceComponent } from './sales/invoice/invoice.component';
import { AddPaymentComponent } from './sales/add-payment/add-payment.component';
import { SaleDetailsComponent } from './sales/sale-details/sale-details.component';
import { ConfirmDeleteSaleComponent } from './sales/confirm-delete-sale/confirm-delete-sale.component';
import { BlockUIModule } from 'ng-block-ui';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatElementsModule } from '../mat-elements/mat-elements.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
@NgModule({
  declarations: [DashboardComponent, InvoiceComponent, AddPaymentComponent, SaleDetailsComponent,ConfirmDeleteSaleComponent, ContactUsComponent],
  entryComponents:[AddPaymentComponent,SaleDetailsComponent,ConfirmDeleteSaleComponent,InvoiceComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    MatElementsModule,
    ReactiveFormsModule,
    FormsModule,
    BlockUIModule.forRoot()
  ],exports:[InvoiceComponent, AddPaymentComponent, SaleDetailsComponent,ConfirmDeleteSaleComponent]
})
export class DashboardModule { }
