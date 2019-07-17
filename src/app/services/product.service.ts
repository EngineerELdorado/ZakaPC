import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariablesService } from '../global-variables.service';
import { ApiResponse } from '../api-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient,
    private globalVariables: GlobalVariablesService) { }

    public getProductsByBranch(branchId, filter){
      return this.httpClient.get<ApiResponse>(this.globalVariables.BACKEND_URL+"/products/getByBranch/"+branchId+"?filter="+filter, {observe:"response"});
    }

    public addQuantity(productId, addedQuantity){
      return this.httpClient.get<ApiResponse>(this.globalVariables.BACKEND_URL+"/products/addQuantity/?productId="+productId+"&addedQuantity="+addedQuantity+"&modifiedBy="+localStorage.getItem("zakaUsername"),{observe:'response'})
    }

    public getProductsByName(branchId, name){

      return this.httpClient.get<ApiResponse>(this.globalVariables.BACKEND_URL+"/products/getByName/?branchId="+branchId+"&name="+name, {observe:"response"});
    }

    public create(product, userId,branchId){
      return this.httpClient.post<ApiResponse>(this.globalVariables.BACKEND_URL+"/products/add?userId="+userId+"&branchId="+branchId, product,{observe:'response'})
    }

    public findOne(productId){
      
      return this.httpClient.get<ApiResponse>(this.globalVariables.BACKEND_URL+"/products/getOne/"+productId, {observe:"response"});
    }

    public postExcel(formData){

       return this.httpClient.post<ApiResponse>(this.globalVariables.BACKEND_URL+"/products/importFromExcel", formData,{observe:'response'})
   }
}
