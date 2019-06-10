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

    public getProductsByBranch(branchId){
      return this.httpClient.get<ApiResponse>(this.globalVariables.BACKEND_URL+"/products/getByBranch/"+branchId, {observe:"response"});
    }

    public getProductsByName(branchId, name){

      return this.httpClient.get<ApiResponse>(this.globalVariables.BACKEND_URL+"/products/getByName/?branchId="+branchId+"&name="+name, {observe:"response"});
    }
}
