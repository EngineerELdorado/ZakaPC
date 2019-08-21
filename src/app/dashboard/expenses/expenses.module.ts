import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { BlockUIModule } from 'ng-block-ui';
import { MatElementsModule } from '../../mat-elements/mat-elements.module';
import { ConfirmDeleteExpenseComponent } from './confirm-delete-expense/confirm-delete-expense.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ExpensesListComponent, AddExpenseComponent, ExpenseDetailsComponent, ConfirmDeleteExpenseComponent],
  entryComponents:[AddExpenseComponent, ExpenseDetailsComponent, ConfirmDeleteExpenseComponent],
  imports: [
    CommonModule,
    BlockUIModule.forRoot(),
    MatElementsModule,
    ExpensesRoutingModule,
    ReactiveFormsModule
  ]
})
export class ExpensesModule { }
