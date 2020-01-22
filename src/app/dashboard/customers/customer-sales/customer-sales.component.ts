import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { SaleService } from '../../services/sale.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';

import { CustomersService } from '../../../services/customers.service';
import { InvoiceComponent } from '../../sales/invoice/invoice.component';
import { SaleDetailsComponent } from '../../sales/sale-details/sale-details.component';
import { ConfirmDeleteSaleComponent } from '../../sales/confirm-delete-sale/confirm-delete-sale.component';
import { AddPaymentComponent } from '../../sales/add-payment/add-payment.component';
// import { GlobalVariablesService } from '../../global-variables.service';
import { GlobalVariablesService } from '../../../global-variables.service';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-customer-sales',
  templateUrl: './customer-sales.component.html',
  styleUrls: ['./customer-sales.component.css']
})
export class CustomerSalesComponent implements OnInit {
  sales;
  data;
  id;
  totalElements;
  customer;
  currency;
  status="all";
  @ViewChild('dataTable', {static: false}) table;
  @ViewChild(MatSort, {static: false})matSort:MatSort;
  @ViewChild(MatPaginator, {static: false})paginator:MatPaginator;
  constructor(private activatedRoute: ActivatedRoute,
    private customerService:CustomersService,
    private global:GlobalVariablesService,
    private dialog:MatDialog,
              private saleService:SaleService) { }
              displayedColumns: string []=["saleNumber","toPay","paid","balance","status","servedBy","actions"];

  ngOnInit() {
    this.currency = localStorage.getItem("zakaBranchCurrency");
    this.activatedRoute.params.subscribe(params => {
      let id = params['status'];
       console.log(id);
       this.id=id;
       this.customerService.getById(this.id).subscribe(res=>{
         this.customer = res.body.data;
       });

       this.global.data.subscribe(res=>{
         if(res){
          this.saleService.getByCustomerAndStatus(id, 0,5,this.status).subscribe(res=>{
            this.sales = res.data.content;
            this.data= new MatTableDataSource(this.sales);
            this.totalElements=res.data.totalElement;
         this.data.sort = this.matSort;
         this.data.paginator=this.paginator;
         })
         }

       });

       this.saleService.getByCustomerAndStatus(id, 0,5,this.status).subscribe(res=>{
         this.sales = res.data.content;
         this.data= new MatTableDataSource(this.sales);
         this.totalElements=res.data.totalElements;
      this.data.sort = this.matSort;
      this.data.paginator=this.paginator;
       })
      });
  }


  onPageChanged(e){
    this.saleService.getByCustomerAndStatus(this.id, e.pageIndex,e.pageSize,this.status).subscribe(res=>{
      this.sales = res.data.content;
      this.data= new MatTableDataSource(this.sales);
      this.totalElements=res.data.totalElements
    })

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
    console.log(e);
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

applyFilter(e){

}
onStatusChanged(e){
  this.status=e;
  this.saleService.getByCustomerAndStatus(this.id, 0,5,this.status).subscribe(res=>{
    this.sales = res.data.content;
    this.data= new MatTableDataSource(this.sales);
    this.totalElements=res.data.totalElements})
}

}
