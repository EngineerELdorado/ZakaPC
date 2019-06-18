import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SaleService } from 'src/app/services/sale.service';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-pay-bill',
  templateUrl: './pay-bill.component.html',
  styleUrls: ['./pay-bill.component.css']
})
export class PayBillComponent implements OnInit {

  myForm:FormGroup;
  purchaseCost;
  currentBillAmount;
  currency;
  servedBy;
  total;
  @BlockUI() blockUI: NgBlockUI;
  constructor(private saleService: SaleService, private globalService: GlobalVariablesService) { }

  ngOnInit() {
    this.servedBy = localStorage.getItem("zakaUsername");
    this.currentBillAmount = localStorage.getItem("BILL_PRICE");
    this.purchaseCost = localStorage.getItem("PURCHASE_COST");
    this.currency = localStorage.getItem("zakaBranchCurrency");
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
      total: new FormControl('', Validators.required)
    });

    this.myForm.patchValue({
      toPay: this.currentBillAmount,
      servedBy: this.servedBy,
      saleNumber: this.generateSaleNumber(8),
      offlineIdentifier:this.generateOfflineIdentifier(20)+Date.now().toString().toUpperCase(),
      balance: this.currentBillAmount,
      purchaseCost: this.purchaseCost,
      discount:0,
      total: localStorage.getItem("BILL_PRICE")
    })
    
  }

  applyDiscount(e){
    var s = +localStorage.getItem("BILL_PRICE") - e.target.value;
    this.myForm.patchValue({
      toPay: s,
      balance: s
    })
    this.currentBillAmount = s;
  }

  onPaid(e){
    var bal = +this.currentBillAmount -e.target.value;
    var status="";
    if(bal===0){
      status ="complet"
    }
    else if (e.target.value===0){
      status = "credit"
    }
    else if (e.target.value!==0 && this.currentBillAmount>e.target.value){
      status="incomplet"
    }
    this.myForm.patchValue({
      balance: bal,
      status: status 
    })
  }


   generateSaleNumber(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 generateOfflineIdentifier(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

submit(form:FormGroup){
  this.blockUI.start('Operation en cours...');
  let branchId = localStorage.getItem("zakaBranchId");
  let userId = localStorage.getItem("zakaUserId");

  this.saleService.postSale(form.value, branchId, userId).subscribe(res=>{
    console.log(res);
    
    if(res.body.responseCode==="00"){
      this.blockUI.stop();
      localStorage.setItem("BILL_PRICE","0");
      localStorage.setItem("PURCHASE_COST","0");
      localStorage.setItem("ITEMS","");
      this.globalService.updateCleaBill(true);
    }else{
      this.blockUI.stop();
      alert(res.body.responseMessage)
    }
  },err=>{
    console.log(err);
    this.blockUI.stop();
  });
}
}
