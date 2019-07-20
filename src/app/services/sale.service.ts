import { Injectable } from '@angular/core';
import { GlobalVariablesService } from '../global-variables.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../api-response';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private httpClient: HttpClient,
    private globalVariables: GlobalVariablesService) { }

    public postSale(sale, branchId, userId){
      
     return this.httpClient.post<ApiResponse>(this.globalVariables.BACKEND_URL+"/sales/add?branchId="+branchId+"&sellerId="+userId, sale,{observe:'response'})
    }

    public postSaleItem(item, branchId){
      
      return this.httpClient.post<ApiResponse>(this.globalVariables.BACKEND_URL+"/sale_items/save?branchId="+branchId,item,{observe:'response'})
     }

     public getByBranch(branchId, status){
       return this.httpClient.get<ApiResponse>(this.globalVariables.BACKEND_URL+"/sales/getByBranch/"+branchId+"?status="+status);
     }

     public findById(id){
      return this.httpClient.get<ApiResponse>(this.globalVariables.BACKEND_URL+"/sales/findById/"+id);
    }

     public getPagedByBranch(branchId, page,size, status){
      return this.httpClient.get<ApiResponse>(this.globalVariables.BACKEND_URL+"/sales/page/"+branchId+"?page="+page+"&size="+size+"&status="+status);
    }

    public getPagedByFilter(branchId, page,size, filter){
      return this.httpClient.get<ApiResponse>(this.globalVariables.BACKEND_URL+"/sales/filter/page/"+branchId+"?page="+page+"&size="+size+"&filter="+filter);
    }

    public getPagedByFilterindDates(branchId, page,date1, date2, status){
      return this.httpClient.get<ApiResponse>(this.globalVariables.BACKEND_URL+"/sales/filter/dates/page/"+branchId+"?page="+page+"&date1="+date1+"&date2="+date2+"&status="+status);
    }
}
