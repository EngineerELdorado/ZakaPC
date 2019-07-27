import { Component, OnInit, Inject } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalVariablesService } from 'src/app/global-variables.service';

@Component({
  selector: 'app-confirm-delete-expense',
  templateUrl: './confirm-delete-expense.component.html',
  styleUrls: ['./confirm-delete-expense.component.css']
})
export class ConfirmDeleteExpenseComponent implements OnInit {

  constructor(private expenseService: ExpenseService,
    public dialogRef: MatDialogRef<ConfirmDeleteExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data,private gloabal:GlobalVariablesService) { }


  ngOnInit() {
  }

  delete(){
    this.expenseService.delete(this.data.offlineIdentifier, localStorage.getItem("zakaUserId")).subscribe(res=>{
      if(res.responseCode==="00"){
        this.gloabal.showSuccessMessage("LA VENTE A ETE EFFACEE");
        this.gloabal.updatedCanReload(true);
        this.dialogRef.close();
      }
    }, err=>{
      this.gloabal.showErrorMessage("Echeck de l'operation")
    })
  }

  cancel(){
    this.dialogRef.close();
  }

}
