import { Component, OnInit, Inject } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GlobalVariablesService } from '../../../global-variables.service';

@Component({
  selector: 'app-confirm-delete-employee',
  templateUrl: './confirm-delete-employee.component.html',
  styleUrls: ['./confirm-delete-employee.component.css']
})
export class ConfirmDeleteEmployeeComponent implements OnInit {
  constructor(private employeeService: EmployeesService,
    public dialogRef: MatDialogRef<ConfirmDeleteEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data,private gloabal:GlobalVariablesService) { }


  ngOnInit() {
  }

  delete(){
    this.employeeService.delete(this.data.offlineIdentifier).subscribe(res=>{
      if(res.body.responseCode==="00"){
        this.gloabal.showSuccessMessage("LE COMPTE A ETE EFFACEE");
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
