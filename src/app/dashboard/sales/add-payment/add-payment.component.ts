import { Component, OnInit, Inject } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SaleService } from 'src/app/services/sale.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  
  saleNumber;
  customerName;
  balance;
  myForm :FormGroup;
  branchId;
  userId;
  status;
  currency;
  paid;
  constructor(private global: GlobalVariablesService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddPaymentComponent>,
     private saleServe: SaleService) { }

     ngOnInit() {
       this.branchId = localStorage.getItem("zakaBranchId");
      this.userId = localStorage.getItem("zakaUserId");
      this.saleNumber = this.data.saleNumber;
      this.customerName = this.data.customerName;
      this.balance = this.data.balance;
      this.currency = localStorage.getItem("zakabranchCurrency")
      this.myForm= new FormGroup({
        amount: new FormControl('', Validators.required)
      })
    }
  
    submit(form:FormGroup){
      console.log(form.value)
      this.global.showLoading("Operation en cours... veillez patienter")
      this.balance = +this.data.balance-+form.value.amount;
      this.paid=Number(this.data.paid)+Number(form.value.amount);
      if(this.balance===0){
        this.status="complet"
      }else if(this.balance>0){
        this.status="incomplet"
      }
      let sale ={
        total: this.data.total,
        discount:this.data.discount,
        toPay:this.data.toPay,
        paid:this.paid,
        balance:this.balance,
        status:this.status,
        saleNumber:this.data.saleNumber,
        creationDate:this.data.creationDate,
        customerOfflineIdentifier:this.data.customerOfflineIdentifier,
        purchaseCost:this.data.purchaseCost,
        offlineIdentifier:this.data.offlineIdentifier,
        updatedBy:localStorage.getItem("zakaUsername"),
        modificationDate:this.data.modificationDate,
        serverId:this.data.serverId,
        localId:this.data.localId,
        servedBy:this.data.servedBy,
        createdBy:this.data.servedBy

      }
      console.log(this.data)
      console.log(sale)
      this.saleServe.postSale(sale,this.branchId,this.userId).subscribe(res=>{
        this.global.stopLoading();
        if(res.body.responseCode==="00"){
          console.log(res)
          this.dialogRef.close();
          this.global.showSuccessMessage("FACTURE MISE MIS A JOUR");
          this.dialogRef.close();
          this.global.updatedCanReload(true)
        }else{
          this.global.showErrorMessage(res.body.responseMessage)
        }
      },(err:HttpErrorResponse)=>{
        this.global.stopLoading();
        this.global.showErrorMessage(err.message)
      })
    }
  
  }
  