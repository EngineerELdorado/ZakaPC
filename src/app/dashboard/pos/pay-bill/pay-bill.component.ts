import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SaleService } from '../../../services/sale.service';
import { GlobalVariablesService } from '../../../global-variables.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ProductService } from '../../../services/product.service';
import { CustomerService } from '../../../services/customer.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { InvoiceComponent } from '../../sales/invoice/invoice.component';
import { ConfirmPrintInvoiceComponent } from '../confirm-print-invoice/confirm-print-invoice.component';

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
  order:any[];
  branchId;
  sellerId;
  saleOfflineIdentifier;
  customerFullName="Passant";
  customerPhone;
  customerOfflineIdentifier;
  customers: any[] = [];
  @ViewChild('customerName', {static: false})
  customerNameRef:ElementRef
  @ViewChild('customerNumber', {static: false})
  customerNumberRef;
  showBtn=true;
  showList:boolean=false;
  sale;

  @BlockUI() blockUI: NgBlockUI;
  constructor(private saleService: SaleService,
    private productService:ProductService,
    private customerService: CustomerService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<PayBillComponent>,
    private globalService: GlobalVariablesService) {
     }

  ngOnInit() {

    this.getProducts();
    this.branchId = localStorage.getItem("zakaBranchId");
    this.sellerId = localStorage.getItem("zakaUserId");
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
      total: new FormControl('', Validators.required),
      creationDate: new FormControl('')
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
    if (e.target.value!==0 && this.currentBillAmount>e.target.value){
      status="incomplet"
    }
    if (+bal===+this.currentBillAmount){
      status = "credit"
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
  //this.saleOfflineIdentifier = result;
  return result;
}

submit(form:FormGroup){
  this.myForm.patchValue({
    creationDate: Date.now()
  })
  this.globalService.showLoading('Operation en cours... veillez patienter');
  let branchId = localStorage.getItem("zakaBranchId");
  let userId = localStorage.getItem("zakaUserId");

  this.saleService.postSale(form.value, branchId, userId).subscribe(res=>{
    console.log(res.body.data);
    this.saleOfflineIdentifier=res.body.data.offlineIdentifier;
    this.globalService.stopLoading();
    if(res.body.responseCode==="00"){
      this.sale = res.body.data;
      this.confirmPrint();
      this.dialogRef.close();
      //this.toastr.success('Vente enregistree', 'Success!');
      this.globalService.showSuccessMessage("VENTE ENREGISTREE AVEC SUCCESS.");
      this.globalService.updatedCanReload(true)
      for(var i =0; i<this.order.length; i++){
        console.log(this.order[i]);
        let item = {
          'name':this.order[i].name,
          'quantity':1,
          'price':this.order[i].price,
          'productOfflineIdentifier':this.order[i].offlineIdentifier,
          'saleOfflineIdentifier':this.saleOfflineIdentifier,
          'offlineIdentifier':this.generateOfflineIdentifier(100)
        }
        console.log(item);
        this.saleService.postSaleItem(item, this.branchId).subscribe(res=>{
             console.log(res)
        });
      }

      this.blockUI.stop();
      localStorage.setItem("BILL_PRICE","0");
      localStorage.setItem("PURCHASE_COST","0");
      localStorage.setItem("ITEMS","");
      this.globalService.updateCleaBill(true);
    }else{
      this.blockUI.stop();
      //this.toastr.error(res.body.responseMessage, 'Oops!');
      // this._snackBar.open("Vente enregistree","", {
      //   duration: 2000,
      // });
    }
  },err=>{
    console.log(err);
    //this.toastr.error(err, 'Oops!');
    this.globalService.stopLoading();
  });
}

getProducts(){
  this.order = JSON.parse(localStorage.getItem("ITEMS"));
}


saveCustomer(){
  console.log(this.customerNameRef)

  this.customerFullName = this.customerNameRef.nativeElement.value;
  this.customerPhone = this.customerNumberRef.nativeElement.value;
  if(this.customerFullName==="" || this.customerFullName==="Passant"){
    this.customerFullName="Passant";
    alert("Veillez entrer le nom du client")
  }else if(this.customerPhone==="" || !this.customerPhone.startsWith("+")){
    alert("Veillez entrer le numero de telephone du client commencant par le code du pays")
  }else{

    this.blockUI.start("Enregistrement du en cours");
    this.customerOfflineIdentifier = this.generateOfflineIdentifier(100);

    let customer = {
      name: this.customerFullName,
      phone: this.customerPhone,
      offlineIdentifier:this.customerOfflineIdentifier,
    }

    this.customerService.postCustomer(customer, this.branchId, this.sellerId).subscribe(res=>{
        if(res.body.responseCode==="00"){
          this.blockUI.stop();
          this.globalService.showSuccessMessage(this.customerFullName+" vient d'etre enregistrE comme client de votre business")


        }else{
          this.blockUI.stop();
          this.globalService.showErrorMessage("une erreur s'est produite")
        }
    },err=>{
      this.blockUI.stop();
      console.log(err)
    })

    this.myForm.patchValue({
      customerOfflineIdentifier:this.customerOfflineIdentifier
    })
  }
}

onNameTyped(e){
  this.showBtn=true;
  if(e.target.value.length>0){
    this.customerService.getByNameAndBranch(e.target.value, this.branchId).subscribe(res=>{

      this.customers = res.body.data;
      this.showList=true;

    });
  }else{
    this.showList=false;
  }

}

openInvoice(e){
  console.log(e)
  this.dialog.open(InvoiceComponent, {
    height: '600px',
    width: '900px',
    data: e
  });
}

setItem(i){
  console.log(i)
  this.customerNameRef.nativeElement.value=i.name;
  this.customerNumberRef.nativeElement.value=i.phone;
  this.customerOfflineIdentifier=i.offlineIdentifier;
  this.showBtn=false;
  this.showList=false;
  this.customerFullName=i.name;
  this.myForm.patchValue({
    customerOfflineIdentifier: this.customerOfflineIdentifier
  })
}

confirmPrint(){

  this.dialog.open(ConfirmPrintInvoiceComponent, {
    height: '200px',
    width: '400px',
    data:this.sale
  });

}

}
