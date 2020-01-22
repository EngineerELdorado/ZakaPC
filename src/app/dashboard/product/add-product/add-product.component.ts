import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { ProductService } from '../../../services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalVariablesService } from '../../../global-variables.service';
// import {MD_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  myForm:FormGroup;
  userId;
  branchId;
  @BlockUI() blockUI: NgBlockUI;
  constructor(private productService: ProductService,
    private global:GlobalVariablesService,
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    console.log(this.data);
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


  submit(form:FormGroup){
    this.setInitialValues();
    this.blockUI.start("Operation en cours... veillez patienter.");
    this.productService.create(form.value, this.userId, this.branchId).subscribe(res=>{
      this.blockUI.stop();
      if(res.body.responseCode==="00"){
        this.global.showSuccessMessage("PRODUIT ENREGISTRE");
        form.reset();
        this.global.updatedCanReload(true)
      }else{
        this.global.showErrorMessage(res.body.responseMessage)
      }
    }, err=>{
      this.global.showErrorMessage(err)
    })
  }

  setInitialValues(){
    this.generateOfflineIdentifier(200);
    this.myForm.patchValue({
      createdBy: localStorage.getItem("zakaUsername"),
      creationDate:Date.now()
    })
  }


  generateOfflineIdentifier(length) {
    var offlineIdentifier           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       offlineIdentifier += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.myForm.patchValue({
      offlineIdentifier: offlineIdentifier
    })
}
}
