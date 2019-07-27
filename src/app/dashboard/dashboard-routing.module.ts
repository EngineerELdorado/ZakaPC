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
          loadChildren:'./pos/pos.module#PosModule'
        
      },{
        path:'products/:status',
        loadChildren:'./product/product.module#ProductModule'
      
    },{
      path:'sales/:status',
      loadChildren:'./sales/sales.module#SalesModule'
    
  },{
    path:'customers/:status',
    loadChildren:'./customers/customers.module#CustomersModule'
  
},{
  path:'expenses',
  loadChildren:'./expenses/expenses.module#ExpensesModule'

}
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
