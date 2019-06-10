import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:'./dashboard/dashboard.module#DashboardModule'
  },
  {
    path:'dashboard',
    loadChildren:'./dashboard/dashboard.module#DashboardModule'

  },
  {
    path:'login',
    loadChildren:'./login/login.module#LoginModule' 
  },
  {
    path:'register',
    loadChildren:'./register/register.module#RegisterModule' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
