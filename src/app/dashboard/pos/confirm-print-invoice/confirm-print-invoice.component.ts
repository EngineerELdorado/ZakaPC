import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InvoiceComponent } from '../../sales/invoice/invoice.component';
import { GlobalVariablesService } from '../../../global-variables.service';
import { PayBillComponent } from '../pay-bill/pay-bill.component';

@Component({
  selector: 'app-confirm-print-invoice',
  templateUrl: './confirm-print-invoice.component.html',
  styleUrls: ['./confirm-print-invoice.component.css']
})
export class ConfirmPrintInvoiceComponent implements OnInit {

  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<PayBillComponent>,) { }

  ngOnInit() {
  }


  invoice(){
    this.close();
    this.dialog.open(InvoiceComponent, {
      height: '600px',
      width: '900px',
      data: this.data
    });
}

close(){
  this.dialogRef.close();
}
}
