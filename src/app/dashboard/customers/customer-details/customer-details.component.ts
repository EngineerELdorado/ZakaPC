import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { GlobalVariablesService } from '../../global-variables.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { CustomerService } from '../../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalVariablesService } from '../../../global-variables.service';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customer;
  myForm:FormGroup;
  branchId;
  userId;
  constructor(public dialogRef: MatDialogRef<CustomerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private customerService:CustomerService,
    private gloabal:GlobalVariablesService) { }

  ngOnInit() {
    this.branchId= localStorage.getItem("zakaBranchId");
    this.userId=localStorage.getItem("zakaUserId");
    this.myForm= new FormGroup({
      name:new FormControl('',Validators.required),
      phone: new FormControl('', Validators.required),
      offlineIdentifier: new FormControl('',Validators.required)
    });

    this.customer=this.data;
    this.myForm.patchValue({
      name:this.customer.name,
      phone:this.customer.phone,
      offlineIdentifier:this.customer.offlineIdentifier
    })
  }

  submit(form){
    this.gloabal.showLoading("Operation en cours... veillez patienter")
    this.customerService.postCustomer(form.value, this.branchId, this.userId).subscribe(res=>{

      this.gloabal.stopLoading();
      if(res.body.responseCode==="00"){
        this.dialogRef.close();
        this.gloabal.updatedCanReload(true);
        this.gloabal.showSuccessMessage("Informations du client mises a jour")
      }else{
        this.gloabal.showErrorMessage(res.body.responseMessage)
      }
    },(err:HttpErrorResponse)=>{
      this.gloabal.showErrorMessage(err.message)

    })
  }

}
