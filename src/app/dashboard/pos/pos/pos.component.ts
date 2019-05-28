import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  products:any[];
  currency=localStorage.getItem("zakaBranchCurrency");
  branchId= localStorage.getItem("zakaBranchId");
  constructor(private productService: ProductService) { }
 
  ngOnInit() {

    this.getProducts();
  }


  getProducts(){
    this.productService.getProductsByBranch(this.branchId).subscribe(res=>{
      this.products = res.body.data;
      console.log(this.products)
    })
  }
}
