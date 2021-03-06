import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseService } from '../expense.service';
import { GlobalVariablesService } from '../../../global-variables.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css']
})
export class ExpenseDetailsComponent implements OnInit {
  myForm:FormGroup;
  branchId;
  userId;
  constructor(
    public dialogRef: MatDialogRef<ExpenseDetailsComponent>,
    private expenseService:ExpenseService,
    @Inject(MAT_DIALOG_DATA) public data,
    private global:GlobalVariablesService) { }

  ngOnInit() {
    this.branchId = localStorage.getItem("zakaBranchId");
    this.userId = localStorage.getItem("zakaUserId");
    this.myForm= new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      amount: new FormControl('', Validators.required),
      offlineIdentifier: new FormControl('', Validators.required)
    });
console.log(this.data);
    this.myForm.patchValue({
      name: this.data.name,
      description: this.data.description,
      amount: this.data.amount,
      offlineIdentifier: this.data.offlineIdentifier
    })
  }


  submit(form:FormGroup){
    this.global.showLoading("Operation en cours... veillez patienter");
    this.expenseService.addExpense(form.value, this.branchId,this.userId).subscribe(res=>{
      this.global.stopLoading();
      if(res.body.responseCode==="00"){
        this.global.updatedCanReload(true);
        form.reset();
        this.global.showSuccessMessage("DEPENSE MISE A JOUR");
        this.dialogRef.close();
      }else{
        this.global.showErrorMessage(res.body.responseMessage)
      }
    },err=>{
      console.log(err);
      this.global.showSuccessMessage("ERREUR");
      this.global.stopLoading();
    })
  }

}
