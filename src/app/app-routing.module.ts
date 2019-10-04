import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CustomPreloader } from './CustomerPreloader';

const routes: Routes = [
  {
    path:'',
    loadChildren:'./dashboard/dashboard.module#DashboardModule',

  },
  {
    path:'dashboard',
    loadChildren:'./dashboard/dashboard.module#DashboardModule'

  },
  {
    path:'login',
    loadChildren:'./login/login.module#LoginModule',
    data: { preload: true, delay:0}
  },
  {
    path:'register',
    loadChildren:'./register/register.module#RegisterModule',
    data: { preload: true, delay:10000}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloader
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
