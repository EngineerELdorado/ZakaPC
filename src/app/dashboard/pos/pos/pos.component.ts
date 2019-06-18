import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Item } from '../item';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { PayBillComponent } from '../pay-bill/pay-bill.component';
import { GlobalVariablesService } from 'src/app/global-variables.service';
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
  cost:number =Number(localStorage.getItem("PURCHASE_COST"));
  price:number =Number(localStorage.getItem("BILL_PRICE"));
  currency=localStorage.getItem("zakaBranchCurrency");
  branchId= localStorage.getItem("zakaBranchId");
  constructor(private productService: ProductService,
    private globalService: GlobalVariablesService,
    private dialog: MatDialog) { }
 
  ngOnInit() {

    this.getProducts();
    this.order = JSON.parse(localStorage.getItem("ITEMS"));

    this.globalService.clearBillObs.subscribe(res=>{
      if(res){
        console.log(res);
        this.clearBill();
        this.dialog.closeAll()
      }
    })
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
      localStorage.setItem("PURCHASE_COST", +localStorage.getItem("PURCHASE_COST")  +product.purchaseCost)
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

  remove(o){
    this.order = JSON.parse(localStorage.getItem("ITEMS"));
    var removeIndex = this.order.map(function(item) { return item.id; }).indexOf(o.id);
    this.order.splice(removeIndex, 1);
    this.ITEMS.splice(removeIndex,1);
    localStorage.setItem("ITEMS", JSON.stringify(this.ITEMS));
    var s = +localStorage.getItem("BILL_PRICE") - o.price;
    localStorage.setItem("BILL_PRICE", s.toString()) 
    this.price = Number(localStorage.getItem("BILL_PRICE"));

    var z = +localStorage.getItem("PURCHASE_COST") - o.purchaseCost;
    localStorage.setItem("PURCHASE_COST", z.toString()) 
  }


  openBill(){
    this.dialog.open(PayBillComponent, {
      height: '400px',
      width: '900px',
    });
  }
}
