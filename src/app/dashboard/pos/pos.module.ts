import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { PosRoutingModule } from './pos-routing.module';
import { PosComponent } from './pos/pos.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import { SubstringNamePipe } from './substring-name.pipe';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { PayBillComponent } from './pay-bill/pay-bill.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { ConfirmPrintInvoiceComponent } from './confirm-print-invoice/confirm-print-invoice.component';
@NgModule({
  declarations: [PosComponent, SubstringNamePipe, PayBillComponent, ConfirmPrintInvoiceComponent],
  entryComponents:[PayBillComponent,ConfirmPrintInvoiceComponent],
  imports: [
    CommonModule,
    FormsModule,
    PosRoutingModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatBottomSheetModule,
    BlockUIModule.forRoot()
  ]
})
export class PosModule { }
