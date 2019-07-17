import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { AddQuantityComponent } from '../add-quantity/add-quantity.component';
import { HttpErrorResponse } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products;
  branchId;
  currency;
  noData:boolean=true;
  @ViewChild('dataTable') table;
  @ViewChild(MatSort)matSort:MatSort;
  @ViewChild(MatPaginator)paginator:MatPaginator;
  @BlockUI() blockUI: NgBlockUI;
  data: MatTableDataSource<any>;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  
  displayedColumns: string []=["name","purchaseCost","price","quantity","actions"]
  constructor(private productService: ProductService,
    private global:GlobalVariablesService,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit() {
    
    this.branchId= localStorage.getItem("zakaBranchId");
    this.currency=localStorage.getItem("zakaBranchCurrency");
    this.getProducts("name");
    this.global.data.subscribe(res=>{
      if(res){
        this.getProducts("name");
      }
    })
    console.log(this.data)
    
  }

  getProductsByName(name){

    this.productService.getProductsByName(localStorage.getItem("zakaBranchId"), name).subscribe(res=>{
      this.products = res.body.data;
      console.log(this.products)
      this.data = new MatTableDataSource(this.products);
      this.data.sort = this.matSort;
      this.data.paginator=this.paginator;
    });
  }
  getProducts(filter){
    this.productService.getProductsByBranch(this.branchId,filter).subscribe(res=>{
      this.products = res.body.data;
      console.log(this.products);
      this.data = new MatTableDataSource(this.products);
      this.noData=false;
      this.data.sort = this.matSort;
      this.data.paginator=this.paginator;
    });
  }


  openDialog(){
    
      this.dialog.open(AddProductComponent, {
        height: '400px',
        width: '900px',
      });  
  }

  openEditDialog(id){
    
    this.dialog.open(ProductDetailsComponent, {
      height: '400px',
      width: '900px',
      data: {id: id}
    });  
}

openAddQuantityDialog(product){
    
  this.dialog.open(AddQuantityComponent, {
    height: '300px',
    width: '500px',
    data: product
  });  
}

  choseFile(e){
    console.log(e)
  
    const formData = new FormData();
    formData.append('file', e);
    formData.append('branchId',this.branchId);
    formData.append('createdBy', localStorage.getItem("zakaUsername"));
    this.blockUI.start("Operation en cours... veillez patienter")
    this.productService.postExcel(formData).subscribe(res=>{
      this.blockUI.stop();
      if(res.body.responseCode="00"){
       
        this.global.showSuccessMessage("LA LISTE A ETE IMPORTEE AVEC SUCCESS");
        this.getProducts("id");
      }else{
        this.global.showErrorMessage(res.body.responseMessage)
      }
    },(err:HttpErrorResponse)=>{
      this.blockUI.stop();
      this.global.showErrorMessage(err.message)
    }
    )
  }
}
