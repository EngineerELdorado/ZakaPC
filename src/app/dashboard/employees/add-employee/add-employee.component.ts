import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseService } from '../../expenses/expense.service';
import { GlobalVariablesService } from '../../../global-variables.service';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  myForm:FormGroup;
  branchId;
  userId;
  constructor(private employeeService:EmployeesService,
    private global:GlobalVariablesService) { }

  ngOnInit() {
    this.branchId = localStorage.getItem("zakaBranchId");
    this.userId = localStorage.getItem("zakaUserId");
    this.myForm= new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl(''),
      pin: new FormControl('', Validators.required),
      offlineIdentifier: new FormControl('', Validators.required),
      type:new FormControl('',Validators.required)
    });

    this.myForm.patchValue({
      type:'USER'
    });

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
  submit(form:FormGroup){
    if(form.value.phone.startsWith("+")){
      this.global.showLoading("Operation en cours... veillez patienter");
      this.employeeService.addEmployee(form.value, this.branchId,this.userId).subscribe(res=>{
        this.global.stopLoading();
        if(res.body.responseCode==="00"){
          this.global.updatedCanReload(true);
          form.reset();
          this.global.showSuccessMessage("UTILISATEUR AJOUTE")
        }else{
          this.global.showErrorMessage(res.body.responseMessage)
        }
      },err=>{
        console.log(err);
        this.global.showSuccessMessage("ERREUR");
        this.global.stopLoading();
      })
    }else{
      this.global.showErrorMessage("Veillez mettre le code du pays. ex: +243")
    }

  }

}
