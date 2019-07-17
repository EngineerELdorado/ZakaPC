import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../api-response';
import { GlobalVariablesService } from '../global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient,
    private globalVariables: GlobalVariablesService) { }

    public postCustomer(customer, branchId, selllerId){
      
      return this.httpClient.post<ApiResponse>(this.globalVariables.BACKEND_URL+"/customers/add?branchId="+branchId+"&userId="+selllerId,customer,{observe:'response'})
     }

     public getByNameAndBranch(name,branchId){
      return this.httpClient.get<ApiResponse>(this.globalVariables.BACKEND_URL+"/customers/findByNameAndBranch/"+name+"/"+branchId, {observe:"response"});
    }
}
