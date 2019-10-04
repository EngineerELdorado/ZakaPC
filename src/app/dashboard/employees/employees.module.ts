import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ConfirmDeleteEmployeeComponent } from './confirm-delete-employee/confirm-delete-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { MatElementsModule } from '../../mat-elements/mat-elements.module';
import { BlockUI, BlockUIModule } from 'ng-block-ui';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeeListComponent, EmployeeDetailsComponent, ConfirmDeleteEmployeeComponent, AddEmployeeComponent],
  entryComponents:[AddEmployeeComponent, ConfirmDeleteEmployeeComponent, EmployeeDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
    MatElementsModule,
  ]
})
export class EmployeesModule { }
