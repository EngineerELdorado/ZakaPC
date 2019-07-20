import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SaleService } from 'src/app/services/sale.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.css']
})
export class SaleDetailsComponent implements OnInit {

  myForm:FormGroup;
  client;
  constructor(private saleService: SaleService,
    private toastr:ToastrService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<SaleDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,private gloabal:GlobalVariablesService) { }

  ngOnInit() {

    this.myForm = new FormGroup({
      discount : new FormControl (''),
      toPay : new FormControl ('', Validators.required),
      servedBy : new FormControl ('', Validators.required),
      paid : new FormControl ('', Validators.required),
      balance : new FormControl ('', Validators.required),
      purchaseCost : new FormControl (''),
      customerOfflineIdentifier : new FormControl (''),
      offlineIdentifier : new FormControl ('', Validators.required),
      saleNumber : new FormControl ('', Validators.required),
      status : new FormControl ('', Validators.required),
      total: new FormControl('', Validators.required),
      creationDate: new FormControl('')
    });

    this.saleService.findById(this.data.id).subscribe(res=>{
      console.log(res);
      this.client=res.data.customerName;
      this.myForm.patchValue({
        discount:res.data.discount,
        toPay:res.data.toPay,
        servedBy:res.data.servedBy,
        paid:res.data.paid,
        balance:res.data.balance,
        purchaseCost:res.data.purchaseCost,
        customerOfflineIdentifier:res.data.customerOfflineIdentifier,
        offlineIdentifier:res.data.offlineIdentifier,
        saleNumber:res.data.saleNumber,
        status:res.data.status,
        total:res.data.total,
        creationDate:this.datePipe.transform(new Date(res.data.creationDate), "dd/MM/yyyy HH:mm:ss")
      })
    })
  }

  
  

}
