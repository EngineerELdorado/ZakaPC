import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  //public BACKEND_URL ="https://torapos-master.herokuapp.com/api";
   public BACKEND_URL ="https://torapos.herokuapp.com/api";

  private clearBill = new BehaviorSubject<boolean>(false);
  clearBillObs = this.clearBill.asObservable();
  constructor() { }

 public updateCleaBill(bool:boolean){
    this.clearBill.next(bool)
  }
}
