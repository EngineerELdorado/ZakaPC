import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Item } from '../item';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {
    ITEMS: Item[] = [
    
  ];
  order:any[];
  products:any[];
  price:number =Number(localStorage.getItem("BILL_PRICE"));
  currency=localStorage.getItem("zakaBranchCurrency");
  branchId= localStorage.getItem("zakaBranchId");
  constructor(private productService: ProductService) { }
 
  ngOnInit() {

    this.getProducts();
    this.order = JSON.parse(localStorage.getItem("ITEMS"))
  }


  getProducts(){
    this.productService.getProductsByBranch(this.branchId).subscribe(res=>{
      this.products = res.body.data;
      console.log(this.products)
    });
  }


  getProductsByName(name){

    this.productService.getProductsByName(localStorage.getItem("zakaBranchId"), name).subscribe(res=>{
      this.products = res.body.data;
      console.log(this.products)
    });
  }

  addProduct(product)
  {
    this.ITEMS.push({
      id: product.id,
      name:product.name,
      price: product.price,
      quantity:product.quantity
    });


      localStorage.setItem("ITEMS", JSON.stringify(this.ITEMS));
      this.order = JSON.parse(localStorage.getItem("ITEMS"))
      localStorage.setItem(product.name, product.price)
      localStorage.setItem("BILL_PRICE", +localStorage.getItem("BILL_PRICE")  +product.price) 
      this.price = Number(localStorage.getItem("BILL_PRICE"));
  }

  clearBill(){
    localStorage.setItem("BILL_PRICE","0")
    this.price = Number(localStorage.getItem("BILL_PRICE"));
    localStorage.removeItem("ITEMS");
    this.order = JSON.parse(localStorage.getItem("ITEMS"))
    this.ITEMS =[];
  }
}
