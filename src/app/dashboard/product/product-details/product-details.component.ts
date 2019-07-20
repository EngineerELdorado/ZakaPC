import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ProductService } from 'src/app/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  myForm:FormGroup;
  userId;
  branchId;
  product:any;
  modifiedBy;
  modifiedOn;
  modificationNote:string;
  modificationDate;
  @BlockUI() blockUI: NgBlockUI;
  constructor(private productService: ProductService,
    private toastr:ToastrService,
    public dialogRef: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,private gloabal:GlobalVariablesService) { }

  ngOnInit() {
    
    console.log(this.data)
    this.getproduct();
this.branchId = localStorage.getItem("zakaBranchId");
 this.userId = localStorage.getItem("zakaUserId");
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      barcode:new FormControl(''),
      purchaseCost:new FormControl('',Validators.required),
      price:new FormControl('',Validators.required),
      quantity:new FormControl(''),
      location:new FormControl(''),
      offlineIdentifier:new FormControl(''),
      imagepath:new FormControl(''),
      createdBy:new FormControl(''),
      modifiedBy:new FormControl(''),
      creationDate:new FormControl(''),
      modificationDate:new FormControl(''),

    });

    
  }

  public getproduct(){
    this.productService.findOne(this.data.id).subscribe(res=>{
      this.product= res.body.data;
      this.modifiedBy=this.product.modifiedBy;
      this.modifiedOn=this.product.updatedOn;
      this.modificationNote=this.product.modificationNote;
      this.modificationDate = this.product.modificationDate;
      console.log("DATA")
      console.log(res.body.data)
      this.myForm.patchValue({
        name: this.product.name,
        barcode:this.product.barcode,
        purchaseCost:this.product.purchaseCost,
        price:this.product.price,
        quantity:this.product.quantity,
        location:this.product.location,
        offlineIdentifier:res.body.data.offlineIdentifier,
        modificationDate:this.modificationDate,
        modifiedBy:localStorage.getItem("zakaUsername")
      })
    })
  } 

  submit(data:FormGroup){
    console.log(data.value)
    this.blockUI.start("Operation en cours... veillez patienter.");
    this.productService.create(data.value, this.userId, this.branchId).subscribe(res=>{
      this.blockUI.stop();
      if(res.body.responseCode==="00"){
        this.gloabal.showSuccessMessage("LE PRODUIT A ETE MIS A JOUR");
        this.gloabal.updatedCanReload(true);
        this.dialogRef.close();
      }else{
      alert()
        this.gloabal.showErrorMessage(res.body.responseMessage)
      }
    }, err=>{
      this.gloabal.showErrorMessage(err)
    })
  }

   


}
