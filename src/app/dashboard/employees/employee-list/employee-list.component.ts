import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { EmployeesService } from '../employees.service';
import { ExcelService } from '../../../excel.service';
import { GlobalVariablesService } from '../../../global-variables.service';
import { ConfirmDeleteEmployeeComponent } from '../confirm-delete-employee/confirm-delete-employee.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees;
  data;
  totalElements;
  size;
  page;
  branchId;
  @ViewChild('dataTable', {static: false}) table;
  @ViewChild(MatSort, {static: false})matSort:MatSort;
  @ViewChild(MatPaginator, {static: false})paginator:MatPaginator;
  constructor(private employeesService:EmployeesService,
    private excelService:ExcelService,
    private dialog:MatDialog,
    private global:GlobalVariablesService) { }
  displayedColumns: string []=["index","name","phone","type", "actions"]
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

  confirmDelete(e){
    this.dialog.open(ConfirmDeleteEmployeeComponent, {
      height: '200px',
      width: '500px',
      data: e
    });
  }
  public getData(){
    this.employeesService.findEmployees(this.branchId, this.page,this.size).subscribe(res=>{
      this.employees = res.body.data.content
      this.data = new MatTableDataSource(this.employees);
      this.totalElements=res.body.data.content.totalElements;
      this.data.sort = this.matSort;
      this.data.paginator=this.paginator;
    })
  }

  public onPageRefresh(){
    this.employeesService.findEmployees(this.branchId, this.page,this.size).subscribe(res=>{
      this.employees = res.body.data.content;
      this.data = new MatTableDataSource(this.employees);
      this.totalElements=res.body.data.content.totalElements;
    })
  }

  onPageChanged(e){
    this.employeesService.findEmployees(this.branchId, e.pageIndex,e.pageSize).subscribe(res=>{
      this.employees = res.body.data.content;
      this.data = new MatTableDataSource(this.employees);
      this.totalElements=res.body.data.content.totalElements;
    })
  }


  exportAsXLSX():void {

    this.excelService.exportAsExcelFile(this.employees, 'Rapport Des Utilisateurs ');
 }



openDialog(){
  this.dialog.open(AddEmployeeComponent, {
    height: '500px',
    width: '500px'
  });
}

filter(e){
  this.employeesService.filter(this.branchId,e, 0,5).subscribe(res=>{
    this.employees = res.body.data.content;
    this.data = new MatTableDataSource(this.employees);
    this.totalElements=res.body.data.content.totalElements;
  })
}

openEditDialog(e){
  this.dialog.open(EmployeeDetailsComponent, {
    height: '500px',
    width: '500px',
    data:e
  });
}

}
