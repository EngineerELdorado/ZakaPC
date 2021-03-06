import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerSalesComponent } from './customer-sales/customer-sales.component';

const routes: Routes = [
  {
    path:'',
    component:CustomersListComponent
  },{
    path:'sales',
    component:CustomerSalesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
