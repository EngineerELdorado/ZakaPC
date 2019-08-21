import { Injectable } from '@angular/core';
// import { HttpClient } from 'selenium-webdriver/http';
import { GlobalVariablesService } from '../../global-variables.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../api-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {



  constructor(private http: HttpClient, private global:GlobalVariablesService) { }


  delete(offlineIdentifier: any) {
    return this.http.get<ApiResponse>(this.global.BACKEND_URL+"/users/delete/"+offlineIdentifier, {observe:'response'})
  }

  findEmployees(branchId, page, size){
    return this.http.get<ApiResponse>(this.global.BACKEND_URL+"/users/page/"+branchId+"?page="+page+"&size="+size,{observe:'response'});

  }

  filter(branchId, filter, page,size){
    return this.http.get<ApiResponse>(this.global.BACKEND_URL+"/users/page/filter/"+branchId+"?page="+page+"&size="+size+"&filter="+filter,{observe:'response'});

  }

  addEmployee(user, branchId, userId){

    return this.http.post<ApiResponse>(this.global.BACKEND_URL+"/users/add?creatorId="+userId+"&branchId="+branchId, user,{observe:'response'})
  }
}
