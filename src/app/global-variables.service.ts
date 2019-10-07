import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  public BACKEND_URL ="https://torapos-master.herokuapp.com/api";
   //public BACKEND_URL ="https://torapos.herokuapp.com/api";
   private canReload = new BehaviorSubject<boolean>(false);
  shouldReload = this.canReload.asObservable();
   data = this.canReload.asObservable();
   @BlockUI() blockUI: NgBlockUI;
  private clearBill = new BehaviorSubject<boolean>(false);
  clearBillObs = this.clearBill.asObservable();
  constructor(private toastr: ToastrService) { }

 public updateCleaBill(bool:boolean){
    this.clearBill.next(bool)
  }

 public updatedCanReload(data: boolean){
    this.canReload.next(data);
  }

  public showSuccessMessage(msg){
    this.toastr.success(msg, 'Operation Reussie');
  }

  public showErrorMessage(msg){
    this.toastr.error(msg, 'Operation Echouee');
  }

  public showLoading(msg){
    this.blockUI.start(msg)
  }
  public stopLoading(){
    this.blockUI.stop();
  }
}
