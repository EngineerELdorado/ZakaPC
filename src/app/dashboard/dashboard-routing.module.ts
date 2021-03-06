import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    canActivate:[AuthGuard],
    children:[
      {
          path:'pos',
          loadChildren:'./pos/pos.module#PosModule',
          // data: { preload: false, delay:0}

      },{
        path:'products/:status',
        loadChildren:'./product/product.module#ProductModule',
        // data: { preload: true, delay:10000}

    },{
      path:'sales/:status',
      loadChildren:'./sales/sales.module#SalesModule',
      data: { preload: true, delay:5000}

  },{
    path:'customers/:status',
    loadChildren:'./customers/customers.module#CustomersModule',
    // data: { preload: true, delay:10000}

},{
  path:'expenses',
  loadChildren:'./expenses/expenses.module#ExpensesModule',
  // data: { preload: true, delay:10000}
},{
  path:'employees',
  loadChildren:'./employees/employees.module#EmployeesModule',
  // data: { preload: true, delay:10000}
},{
  path:'reports',
  loadChildren:'./reports/reports.module#ReportsModule',
  data: { preload: true,}
}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
