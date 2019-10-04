import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { ConfirmDeleteCustomerComponent } from './confirm-delete-customer/confirm-delete-customer.component';
import { MatInputModule, MatDialogModule, MatTableModule, MatProgressBarModule, MatBadgeModule, MatPaginatorModule, MatSortModule, MatIconModule, MatProgressSpinnerModule, MatCardModule, MatFormFieldModule, MatMenuModule, MatButtonModule } from '@angular/material';
import { BlockUIModule } from 'ng-block-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerSalesComponent } from './customer-sales/customer-sales.component';

import { DashboardModule } from '../dashboard.module';
import { MatElementsModule } from '../../mat-elements/mat-elements.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CustomersListComponent,

     AddCustomerComponent, CustomerDetailsComponent, ConfirmDeleteCustomerComponent, CustomerSalesComponent],
  entryComponents:[AddCustomerComponent,

    CustomerDetailsComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatElementsModule,

        FormsModule,
        ReactiveFormsModule,


  ]
})
export class CustomersModule { }
