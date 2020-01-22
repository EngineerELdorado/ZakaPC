import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalVariablesService } from '../../../global-variables.service';
import { ProductService } from '../../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-quantity',
  templateUrl: './add-quantity.component.html',
  styleUrls: ['./add-quantity.component.css']
})
export class AddQuantityComponent implements OnInit {

  myForm:FormGroup;
  name;
  constructor(private global: GlobalVariablesService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddQuantityComponent>,
     private productService: ProductService) { }

  ngOnInit() {
    this.name = this.data.name;
    this.myForm= new FormGroup({
      quantity: new FormControl('', Validators.required)
    })
  }

  submit(form:FormGroup){

    this.productService.addQuantity(this.data.id, form.value.quantity).subscribe(res=>{
      if(res.body.responseCode==="00"){
        console.log(res);
        this.global.showSuccessMessage("STOCK MIS A JOUR");
        this.dialogRef.close();
        this.global.updatedCanReload(true)
      }else{
        this.global.showErrorMessage(res.body.responseMessage)
      }
    },(err:HttpErrorResponse)=>{
      this.global.showErrorMessage(err.message)
    })
  }

}
