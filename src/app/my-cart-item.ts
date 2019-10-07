import { BaseCartItem } from 'ng-shopping-cart';
import { Item } from './dashboard/pos/item';

export class MyCartItem extends BaseCartItem {

  public id:number;
  public name:string;
  public data:{
    cost:number,
    offlineIdentifier:string;
  };
  public price:number;
  public quantity:number;


  public setId(id){
    this.id=id;
  }
  public getId(){
    return this.id;
  }

  public setName(name){
    this.name=name;
  }
  public getName(){
    return this.name;
  }

  public setData(data:Item){
    this.data.cost=data.cost;
    this.data.offlineIdentifier=data.offlineIdentifier;

    console.log("DATA OBJECT")
    console.log(this.data)
  }
  public getCost(){
    return this.data;
  }

  public setQuantity(quantity){
    this.quantity=quantity;
  }
  public getQuantity(){
    return this.quantity;
  }

  public setPrice(price){
    this.price=price;
  }
  public getPrice(){
    return this.price;
  }

}
