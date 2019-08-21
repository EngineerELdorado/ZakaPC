import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalVariablesService } from '../../../global-variables.service';
import { CustomersService } from '../../../services/customers.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  myForm:FormGroup;
  branchId;
  userId;
  constructor(private customerService:CustomersService,
    private global:GlobalVariablesService) { }

  ngOnInit() {
    this.branchId=localStorage.getItem("zakaBranchId");
    this.userId=localStorage.getItem("zakaUserId");
    this.myForm= new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      offlineIdentifier: new FormControl('')
    })
  }


  submit(form:FormGroup){
    this.setInitialValues();
    this.global.showLoading("Operation en cours... veillez patienter")
    this.customerService.postCustomer(form.value, this.branchId,this.userId).subscribe(res=>{
      this.global.stopLoading();
      if(res.body.responseCode==="00"){
        this.global.updatedCanReload(true);
        form.reset()
        this.global.showSuccessMessage("CLIENT AJOUTE")
      }
    },err=>{
      this.global.stopLoading();
    })
  }

  setInitialValues(){
    this.generateOfflineIdentifier(200);

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
