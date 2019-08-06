import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  myForm:FormGroup;
  branchId;
  userId;
  constructor(private employeeService:EmployeesService,
    public dialogRef: MatDialogRef<EmployeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private global:GlobalVariablesService) { }

  ngOnInit() {
    this.branchId = localStorage.getItem("zakaBranchId");
    this.userId = localStorage.getItem("zakaUserId");
    this.myForm= new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl(''),
      offlineIdentifier: new FormControl('', Validators.required)
    });

    this.myForm.patchValue({
      name:this.data.name,
      phone:this.data.phone,
      offlineIdentifier:this.data.offlineIdentifier
    })

  }

  submit(form:FormGroup){
    if(form.value.phone.startsWith("+")){
      this.global.showLoading("Operation en cours... veillez patienter")
      this.employeeService.addEmployee(form.value, this.branchId,this.userId).subscribe(res=>{
        this.global.stopLoading();
        if(res.body.responseCode==="00"){
          this.global.updatedCanReload(true);
          form.reset()
          this.global.showSuccessMessage("COMPTE MIS A JOUR")
        }else{
          this.global.showErrorMessage(res.body.responseMessage)
        }
      },err=>{
        console.log(err)
        this.global.showSuccessMessage("ERREUR")
        this.global.stopLoading();
      })
    }else{
      this.global.showErrorMessage("Veillez mettre le code du pays. ex: +243")
    }

  }

}

