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
import { MatElementsModule } from '../../mat-elements/mat-elements.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ShoppingCartModule} from 'ng-shopping-cart'; // <-- Import the module class
import { ThermalPrintModule } from 'ng-thermal-print';
@NgModule({
  declarations: [PosComponent, SubstringNamePipe, PayBillComponent, ConfirmPrintInvoiceComponent],
  entryComponents:[PayBillComponent,ConfirmPrintInvoiceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ThermalPrintModule,
    PosRoutingModule,
    MatElementsModule,
    ReactiveFormsModule,
    ShoppingCartModule
  ]
})
export class PosModule { }
