import { Injectable } from '@angular/core';
import { GlobalVariablesService } from '../global-variables.service';
import { ApiResponse } from '../api-response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private httpClient: HttpClient,
    private globalVariables: GlobalVariablesService) { }

    public getCustomers(branchId, page, size,status){
      
     return this.httpClient.get<ApiResponse>(this.globalVariables.BACKEND_URL+"/customers/findPagedData/"+branchId+"?page="+page+"&size="+size+"&status="+status, {observe:'response'})
    }

    public getById(customerId){
      
      return this.httpClient.get<ApiResponse>(this.globalVariables.BACKEND_URL+"/customers/findById/"+customerId, {observe:'response'})
     }

    public filterCustomers(branchId, page, size,filter){
      
      return this.httpClient.get<ApiResponse>(this.globalVariables.BACKEND_URL+"/customers/filter/"+branchId+"?page="+page+"&size="+size+"&filter="+filter, {observe:'response'})
     }

    public postExcel(formData){

      return this.httpClient.post<ApiResponse>(this.globalVariables.BACKEND_URL+"/customers/importFromExcel", formData,{observe:'response'})
  }

  public postCustomer(customer, branchId, selllerId){
      
    return this.httpClient.post<ApiResponse>(this.globalVariables.BACKEND_URL+"/customers/add?branchId="+branchId+"&userId="+selllerId,customer,{observe:'response'})
   }
}
