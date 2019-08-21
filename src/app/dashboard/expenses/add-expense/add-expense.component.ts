import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseService } from '../expense.service';
import { GlobalVariablesService } from '../../../global-variables.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  myForm:FormGroup;
  branchId;
  userId;
  constructor(private expenseService:ExpenseService,
    private global:GlobalVariablesService) { }

  ngOnInit() {
    this.branchId = localStorage.getItem("zakaBranchId");
    this.userId = localStorage.getItem("zakaUserId");
    this.myForm= new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      amount: new FormControl('', Validators.required),
      offlineIdentifier: new FormControl('', Validators.required),
      creationDate: new FormControl('', Validators.required)
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
    this.myForm.patchValue({
      creationDate: new Date().getTime()
    })
    this.global.showLoading("Operation en cours... veillez patienter")
    this.expenseService.addExpense(form.value, this.branchId,this.userId).subscribe(res=>{
      this.global.stopLoading();
      if(res.body.responseCode==="00"){
        this.global.updatedCanReload(true);
        form.reset()
        this.global.showSuccessMessage("DEPENSE AJOUTEE")
      }else{
        this.global.showErrorMessage(res.body.responseMessage)
      }
    },err=>{
      console.log(err)
      this.global.showSuccessMessage("ERREUR")
      this.global.stopLoading();
    })
  }

}
