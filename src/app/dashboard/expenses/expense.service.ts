import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../api-response';
import { GlobalVariablesService } from '../../global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http:HttpClient,
    private globalService: GlobalVariablesService) { }

  findExpensesByBranch(branchId, page,size){
    return this.http.get<ApiResponse>(this.globalService.BACKEND_URL+"/expenses/page/"+branchId+"?page="+page+"&size="+size);

  }

  filter(branchId, filter, page, size){
    return this.http.get<ApiResponse>(this.globalService.BACKEND_URL+"/expenses/page/filter/"+branchId+"?page="+page+"&size="+size+"&filter="+filter);

  }

  public postExcel(formData){

    return this.http.post<ApiResponse>(this.globalService.BACKEND_URL+"/expenses/importFromExcel", formData,{observe:'response'})
}

public delete(offlineIdentifier,userId){

  return this.http.get<ApiResponse>(this.globalService.BACKEND_URL+"/expenses/delete/"+offlineIdentifier+"/"+userId);
}

public addExpense(data, branchId, userId){
  return this.http.post<ApiResponse>(this.globalService.BACKEND_URL+"/expenses/add?branchId="+branchId+"&userId="+userId, data,{observe:'response'})
}
}
