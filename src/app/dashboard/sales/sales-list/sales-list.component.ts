import { Component, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { GlobalVariablesService } from '../../../global-variables.service';
import { SaleService } from '../../../services/sale.service';
import { ActivatedRoute } from '@angular/router';
import { ExcelService } from '../../../excel.service';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { SaleDetailsComponent } from '../sale-details/sale-details.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { ConfirmDeleteSaleComponent } from '../confirm-delete-sale/confirm-delete-sale.component';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {

  products;
  branchId;
  currency;
  noData:boolean=true;
  status;
  totalElements;
  minDate;
  sales;
  maxDate;
  @ViewChild('dataTable') table;
  @ViewChild(MatSort)matSort:MatSort;
  @ViewChild(MatPaginator)paginator:MatPaginator;
  @BlockUI() blockUI: NgBlockUI;
  data: MatTableDataSource<any>;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  searchKey;
  page;
  size;
  date1;
  date2;
  showRanges:boolean=false;
  displayedColumns: string []=["saleNumber","customerName","toPay","paid","balance","status","servedBy","actions"]
  constructor(private global:GlobalVariablesService,
    private saleService:SaleService,
    private route:ActivatedRoute,
    private excelService:ExcelService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.page = 0;
    this.size=5;
    this.branchId= localStorage.getItem("zakaBranchId");
    this.currency=localStorage.getItem("zakaBranchCurrency");
    //this.getSales();
    this.route.params.subscribe(params => {
      this.status = params['status'];
      this.getSales();
      });

      console.log(this.status)


    this.global.data.subscribe(res=>{
      if(res){
        this.onRefresh();
      }
    })
    console.log(this.data)
  }

  applyFilter(e){
    this.saleService.getPagedByFilter(this.branchId, 0,10,e.target.value.toLowerCase()).subscribe(res=>{
      this.data = new MatTableDataSource(res.data.content);
      this.totalElements=res.data.totalElements
    })
  }

  onDate1(e){
    this.minDate =e.target.value;
    this.date1 =new Date(e.target.value).getTime();
    if(this.date2){
      this.saleService.getPagedByFilterindDates(this.branchId,0,this.date1,this.date2,this.status).subscribe(res=>{
        console.log(res)
        this.data = new MatTableDataSource(res.data.content);
      console.log(res.data.totalElements)
      this.totalElements=res.data.totalElements
      })
    }
    console.log(new Date(e.target.value).getTime())
  }

  onDate2(e){
    this.date2 =new Date(e.target.value).getTime();
    this.maxDate =e.target.value;
    console.log(this.date1)
    console.log(this.date2)
    if(!this.date1){
      this.global.showErrorMessage("Veillez selectionner la date de depart")
    }else{
      this.getSalesByDates();
    }
  }



  getSales(){

    this.saleService.getPagedByBranch(this.branchId,this.page,this.size, this.status).subscribe(res=>{
      console.log(res)
      this.sales=res.data.content;
      this.data = new MatTableDataSource(res.data.content);
      console.log(res.data.totalElements)
      this.totalElements=res.data.totalElements
      this.noData=false;
      this.data.sort = this.matSort;
      this.data.paginator=this.paginator;
    },err=>{
      console.log(err)
    })
  }

  getSalesByDates(){
    this.saleService.getPagedByFilterindDates(this.branchId,0,this.date1,this.date2,this.status).subscribe(res=>{
      console.log(res)
      this.data = new MatTableDataSource(res.data.content);
    console.log(res.data.totalElements)
    this.totalElements=res.data.totalElements
    })
  }

  onPageChanged(e){
    if(this.date1 && this.date2){
      this.saleService.getPagedByFilterindDates(this.branchId,e.pageIndex,this.date1,this.date2,this.status).subscribe(res=>{
        console.log(res)
        this.sales = res.data.content;
        this.data = new MatTableDataSource(res.data.content);
      console.log(res.data.totalElements)
      this.totalElements=res.data.totalElements
      })
    }else{
      this.saleService.getPagedByBranch(this.branchId,e.pageIndex,e.pageSize, this.status).subscribe(res=>{
        console.log(res)
        this.sales = res.data.content;
        this.data = new MatTableDataSource(res.data.content);

      },err=>{
        console.log(err)
      })
    }

  }

  onRefresh(){

    this.saleService.getPagedByBranch(this.branchId,0,5, this.status).subscribe(res=>{
      console.log(res)
      this.sales = res.data.content;
      this.data = new MatTableDataSource(res.data.content);
      this.totalElements=res.data.totalElements

    },err=>{
      console.log(err)
    })
  }

  onStatusChanged(e){
    console.log(e)
    this.status=e;
    this.onRefresh();
  }

  openEditDialog(e){

  }
  openAddPayment(e){
    this.dialog.open(AddPaymentComponent, {
      height: '300px',
      width: '500px',
      data: e
    });
  }

  confirmDeleteSale(e){
    this.dialog.open(ConfirmDeleteSaleComponent, {
      height: '200px',
      width: '500px',
      data: e
    });
  }

  openInvoice(e){
    console.log(e)
    this.dialog.open(InvoiceComponent, {
      height: '600px',
      width: '900px',
      data: e
    });
  }
  delete(e){

  }

  openDetailsDialog(id){

    this.dialog.open(SaleDetailsComponent, {
      height: '600px',
      width: '900px',
      data: {id: id}
    });
}

  exportAsXLSX():void {

    this.excelService.exportAsExcelFile(this.sales, 'Rapport des Ventes '+"("+this.status+")");
 }

 setAllTime(){

  let date1 = new Date(0).getTime()
  let date2 = new Date().getTime();
  this.date1 = date1;
  this.date2 = date2;
  this.getSalesByDates()
}
setToday(){

  let date1 = new Date().setHours(0,0,0,0)
  let date2 = new Date().getTime()
  this.date1 = date1;
  this.date2 = date2;
  this.getSalesByDates()
}

setYesterday(){
  let date1 = new Date().setHours(-24,0,0,0)
  let date2 = new Date().setHours(0,0,0,0)
  this.date1 = date1;
  this.date2 = date2;
  this.getSalesByDates()
}

setThisWeek(){
  let date1 = this.getMonday(new Date()).getTime()
  let date2 = new Date().getTime()
  this.date1 = date1;
  this.date2 = date2;
  this.getSalesByDates()
}

setThisMonth(){
  var date = new Date();
  let date1 = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  let date2 = new Date().getTime()

  this.date1 = date1;
  this.date2 = date2;
  this.getSalesByDates()
}

setThisYear(){

  let date1 = new Date(new Date().getFullYear(), 0, 1).getTime();
  let date2 = new Date().getTime()
  this.date1 = date1;
  this.date2 = date2;
  this.getSales()
}


getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
  }




  stringToDate(_date,_format,_delimiter)
{
          var formatLowerCase=_format.toLowerCase();
          var formatItems=formatLowerCase.split(_delimiter);
          var dateItems=_date.split(_delimiter);
          var monthIndex=formatItems.indexOf("mm");
          var dayIndex=formatItems.indexOf("dd");
          var yearIndex=formatItems.indexOf("yyyy");
          var month=parseInt(dateItems[monthIndex]);
          month-=1;
          var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
          return formatedDate;
}

onShowRanges(){
  if(this.showRanges){
    this.showRanges=false
  }else{
    this.showRanges=true
  }
}

}
