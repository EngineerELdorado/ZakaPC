import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalVariablesService } from '../../../global-variables.service';
import { CustomersService } from '../../../services/customers.service';
import { ActivatedRoute } from '@angular/router';
import { ExcelService } from '../../../excel.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { AddPaymentComponent } from '../../sales/add-payment/add-payment.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customers;
  branchId;
  currency;
  noData:boolean=true;
  page=0;
  size=10;
  status;
  pageSize;
  @ViewChild('dataTable', {static: false}) table;
  @ViewChild(MatSort, {static: false})matSort:MatSort;
  @ViewChild(MatPaginator, {static: false})paginator:MatPaginator;
  data: MatTableDataSource<any>;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  totalPages;
  totalElements;
  displayedColumns: string []=["index","name","phone","createdBy","creationDate", "actions"]
  constructor(private customersService: CustomersService,
    private global:GlobalVariablesService,
    private route: ActivatedRoute,
    private excelService:ExcelService,
    private dialog: MatDialog) { }

  ngOnInit() {

    this.branchId= localStorage.getItem("zakaBranchId");
    this.currency=localStorage.getItem("zakaBranchCurrency");
    this.route.params.subscribe(params => {
      this.status = params['status'];
      this.getPagedData();
      });

      this.global.data.subscribe(res=>{
        if(res){
          this.onPageRefresh();
        }
      })





  }

  onStatusChanged(e){

  }



  filter(filter){
    this.customersService.filterCustomers(localStorage.getItem("zakaBranchId"),0,this.size, filter).subscribe(res=>{
      this.customers = res.body.data.content;
      console.log(this.customers);
      this.totalElements = res.body.data.totalElements;
      this.data = new MatTableDataSource(this.customers);

    });
  }

  public getPagedData(){

    this.customersService.getCustomers(this.branchId, 0,this.size,this.status).subscribe(res=>{

      console.log(res.body.data.totalElements)
      this.customers = res.body.data.content;
      this.totalElements=res.body.data.totalElements;
      this.data = new MatTableDataSource(this.customers);
      this.data.sort = this.matSort;
      this.data.paginator=this.paginator;
    })
  }

  public onPageRefresh(){

    this.customersService.getCustomers(this.branchId, 0,this.size,this.status).subscribe(res=>{

      this.customers = res.body.data.content;
      this.totalElements=res.body.data.totalElements;
      this.data = new MatTableDataSource(this.customers);
    })
  }

  public onPageChanged(e){

    this.customersService.getCustomers(this.branchId, e.pageIndex,e.pageSize,this.status).subscribe(res=>{

      this.customers = res.body.data.content;
      this.totalElements=res.body.data.totalElements;
      this.data = new MatTableDataSource(this.customers);
    })
  }


  exportAsXLSX():void {

    this.excelService.exportAsExcelFile(this.customers, 'Rapport Des Clients '+"("+this.status+")");
 }

 choseFile(e){
  console.log(e)

  const formData = new FormData();
  formData.append('file', e);
  formData.append('branchId',this.branchId);
  formData.append('createdBy', localStorage.getItem("zakaUserId"));
  this.global.showLoading("Operation en cours... veillez patienter")
  this.customersService.postExcel(formData).subscribe(res=>{
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

  this.dialog.open(AddCustomerComponent, {
    height: '400px',
    width: '900px',
  });
}

openEditDialog(e){
  this.dialog.open(CustomerDetailsComponent, {
    height: '400px',
    width: '900px',
    data:e
  });
}

}
