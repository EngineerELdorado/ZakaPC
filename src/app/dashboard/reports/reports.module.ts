import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDataComponent } from './report-data/report-data.component';
import { Routes, RouterModule } from '@angular/router';
import { MatElementsModule } from '../../mat-elements/mat-elements.module';

const routes:Routes=[
  {
    path:'',
    component:ReportDataComponent
  }
]
@NgModule({
  declarations: [ReportDataComponent],
  imports: [
    CommonModule,
    MatElementsModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportsModule { }
