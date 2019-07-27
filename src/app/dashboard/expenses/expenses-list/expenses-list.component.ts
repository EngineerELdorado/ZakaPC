import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ExcelService } from 'src/app/excel.service';
import { ConfirmDeleteExpenseComponent } from '../confirm-delete-expense/confirm-delete-expense.component';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { ExpenseDetailsComponent } from '../expense-details/expense-details.component';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css']
})
export class ExpensesListComponent implements OnInit {

  expenses;
  data;
  totalElements;
  size;
  page;
  branchId;
  @ViewChild('dataTable') table;
  @ViewChild(MatSort)matSort:MatSort;
  @ViewChild(MatPaginator)paginator:MatPaginator;
  constructor(private expensesService:ExpenseService,
    private excelService:ExcelService,
    private dialog:MatDialog,
    private global:GlobalVariablesService) { }
  displayedColumns: string []=["index","name","amount","description","creationDate","by", "actions"]
  ngOnInit() {
    this.branchId = localStorage.getItem("zakaBranchId");
    this.page=0;
    this.size=5;
    this.getData();

    this.global.data.subscribe(res=>{
      if(res){
        this.getData();
      }
    })
  }

  confirmDeleteExpense(e){
    this.dialog.open(ConfirmDeleteExpenseComponent, {
      height: '200px',
      width: '500px',
      data: e
    }); 
  }
  public getData(){
    this.expensesService.findExpensesByBranch(this.branchId, this.page,this.size).subscribe(res=>{
      this.expenses = res.data.content;
      this.data = new MatTableDataSource(this.expenses);
      this.totalElements=res.data.content.totalElements;
      this.data.sort = this.matSort;
      this.data.paginator=this.paginator;
    })
  }

  public onPageRefresh(){
    this.expensesService.findExpensesByBranch(this.branchId, this.page,this.size).subscribe(res=>{
      this.expenses = res.data.content;
      this.data = new MatTableDataSource(this.expenses);
      this.totalElements=res.data.content.totalElements;
    })
  }

  onPageChanged(e){
    this.expensesService.findExpensesByBranch(this.branchId, e.pageIndex,e.pageSize).subscribe(res=>{
      this.expenses = res.data.content;
      this.data = new MatTableDataSource(this.expenses);
      this.totalElements=res.data.content.totalElements;
    })
  }


  exportAsXLSX():void {
    
    this.excelService.exportAsExcelFile(this.expenses, 'Rapport Des Depenses ');
 }

 choseFile(e){
  console.log(e)

  const formData = new FormData();
  formData.append('file', e);
  formData.append('branchId',this.branchId);
  formData.append('createdBy', localStorage.getItem("zakaUserId"));
  this.global.showLoading("Operation en cours... veillez patienter")
  this.expensesService.postExcel(formData).subscribe(res=>{
    this.global.stopLoading();
    if(res.body.responseCode="00"){
     
      this.global.showSuccessMessage("LA LISTE A ETE IMPORTEE AVEC SUCCESS");
      this.global.updatedCanReload(true);
    }else{
      this.global.showErrorMessage(res.body.responseMessage)
    }
  },(err:HttpErrorResponse)=>{
    this.global.stopLoading();
    this.global.showErrorMessage(err.message)
  }
  )
}

openDialog(){
  this.dialog.open(AddExpenseComponent, {
    height: '500px',
    width: '500px'
  }); 
}

openEditDialog(e){
  this.dialog.open(ExpenseDetailsComponent, {
    height: '500px',
    width: '500px',
    data:e
  }); 
}

}
