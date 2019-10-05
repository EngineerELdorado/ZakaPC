import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Item } from '../item';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { PayBillComponent } from '../pay-bill/pay-bill.component';
import { GlobalVariablesService } from '../../../global-variables.service';
import { ConfirmPrintInvoiceComponent } from '../confirm-print-invoice/confirm-print-invoice.component';
import { BaseCartItem, CartService } from 'ng-shopping-cart';
import { MyCartItem } from 'src/app/my-cart-item';
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
  page;
  size;
  status;
  numberOfPages;
  isLast;
  cost:number =Number(localStorage.getItem("PURCHASE_COST"));
  price:number =Number(localStorage.getItem("BILL_PRICE"));
  currency=localStorage.getItem("zakaBranchCurrency");
  branchId= localStorage.getItem("zakaBranchId");
  constructor(private productService: ProductService,
    private globalService: GlobalVariablesService,
    private cartService: CartService<MyCartItem>,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.page=0;
    this.size=15;
    this.status="all";
    this.isLast = false;
    this.getProducts();
    //this.order = JSON.parse(localStorage.getItem("ITEMS"));
    this.order = this.cartService.getItems();

    this.globalService.clearBillObs.subscribe(res=>{
      if(res){
        //console.log(res);
        this.clearBill();
      }
    });
    this.globalService.data.subscribe(res=>{
      if(res){
        this.getProducts()
      }
    })
  }




  getProducts(){
    this.productService.getPagedProductsByBranch(this.branchId,this.page,this.size,this.status).subscribe(res=>{
      this.products = res.body.data.content;
      this.isLast = res.body.data.last;
      //console.log(res.body.data)
    });
  }

  loadMore(){
     this.size=this.size+this.size;
    this.productService.getPagedProductsByBranch(this.branchId,this.page,this.size,this.status).subscribe(res=>{
      this.products = res.body.data.content;
      this.isLast = res.body.data.last;
      console.log(res.body.data)
    });
  }


  getProductsByName(name){

    if(name===""){
      this.getProducts();
    }else{
      this.productService.getProductsByName(localStorage.getItem("zakaBranchId"), name).subscribe(res=>{
        this.products = res.body.data;
        this.isLast=true;
        console.log(this.products)
      });
    }
  }

  addProduct(product)
  {

    const item = new MyCartItem();
    item.setId(product.id);
    item.setName(product.name);
    item.setData(product.purchaseCost);

    if(typeof this.cartService.getItem(product.id)!="undefined"){
      item.setPrice(this.cartService.getItem(product.id).getPrice()+product.price);
      item.setData(this.cartService.getItem(product.id).getData()+product.purchaseCost);
      item.setQuantity(this.cartService.getItem(product.id).getQuantity()+1)
    }else{
      item.setPrice(product.price);
      item.setQuantity(1);
      item.setData(product.purchaseCost);
    }

    this.cartService.addItem(item);
    this.order = this.cartService.getItems();

    // this.ITEMS.push({
    //   id: product.id,
    //   name:product.name,
    //   price: product.price,
    //   quantity:product.quantity,
    //   offlineIdentifier:product.offlineIdentifier
    // });


    //   localStorage.setItem("ITEMS", JSON.stringify(this.ITEMS));
    //   this.order = JSON.parse(localStorage.getItem("ITEMS"))
    //   localStorage.setItem(product.name, product.price)
    //   localStorage.setItem("PURCHASE_COST", +localStorage.getItem("PURCHASE_COST")  +product.purchaseCost)
    //   localStorage.setItem("BILL_PRICE", +localStorage.getItem("BILL_PRICE")  +product.price)
    //   this.price = Number(localStorage.getItem("BILL_PRICE"));
  }

  clearBill(){
    this.cartService.clear();
    this.order = this.cartService.getItems();
    // localStorage.setItem("BILL_PRICE","0")
    // this.price = Number(localStorage.getItem("BILL_PRICE"));
    // localStorage.removeItem("ITEMS");
    // this.order = JSON.parse(localStorage.getItem("ITEMS"))
    // this.ITEMS =[];
  }

  remove(o){
    this.cartService.removeItem(o.id);
    this.order = this.cartService.getItems();

  }

  openBill(){
    console.log(this.cartService.getItems())
    if(this.cartService.getItems().length>0){
      this.dialog.open(PayBillComponent, {
        height: '400px',
        width: '900px',
      });
    }else{
      alert("La facture est vide")
    }
  }


}
