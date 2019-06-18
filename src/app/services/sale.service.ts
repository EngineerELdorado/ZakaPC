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
}
