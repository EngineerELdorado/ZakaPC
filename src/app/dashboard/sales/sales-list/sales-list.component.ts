import { Component, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { SaleService } from 'src/app/services/sale.service';
import { ActivatedRoute } from '@angular/router';

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
  displayedColumns: string []=["saleNumber","customerName","toPay","paid","balance","creationDate","actions"]
  constructor(private global:GlobalVariablesService,
    private saleService:SaleService,
    private route:ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit() {

    this.branchId= localStorage.getItem("zakaBranchId");
    this.currency=localStorage.getItem("zakaBranchCurrency");
    this.route.params.subscribe(params => {
      this.status = params['name'];
      this.getSales();
      });
    
    this.getSales();
    this.global.data.subscribe(res=>{
      if(res){
        this.getSales();
      }
    })
    console.log(this.data)
  }

  applyFilter(){
    this.data.filter = this.searchKey.trim().toLowerCase();
  }

  getSales(){

    this.saleService.getByBranch(this.branchId, this.status).subscribe(res=>{
      console.log(res)
      this.data = new MatTableDataSource(res.data);
      this.noData=false;
      this.data.sort = this.matSort;
      this.data.paginator=this.paginator;
    },err=>{
      console.log(err)
    })
  }
}
