import { Component, OnInit, Inject } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';
import { InvoiceComponent } from '../invoice/invoice.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalVariablesService } from 'src/app/global-variables.service';

@Component({
  selector: 'app-confirm-delete-sale',
  templateUrl: './confirm-delete-sale.component.html',
  styleUrls: ['./confirm-delete-sale.component.css']
})
export class ConfirmDeleteSaleComponent implements OnInit {

  constructor(private saleService: SaleService,
    public dialogRef: MatDialogRef<InvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,private gloabal:GlobalVariablesService) { }


  ngOnInit() {
  }

  delete(){
    this.saleService.delete(this.data.offlineIdentifier, localStorage.getItem("zakaUserId")).subscribe(res=>{
      if(res.responseCode==="00"){
        this.gloabal.showSuccessMessage("LA VENTE A ETE EFFACEE");
        this.gloabal.updatedCanReload(true);
        this.dialogRef.close();
      }
    }, err=>{
      this.gloabal.showErrorMessage("Echeck de l'operation")
    })
  }

  cancel(){
    this.dialogRef.close();
  }

}
