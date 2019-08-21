import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariablesService } from '../../global-variables.service';
import { ApiResponse } from '../../api-response';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient,
    private global:GlobalVariablesService) { }

    public getStats(branchId, date1,date2){
      return this.http.get<ApiResponse>(this.global.BACKEND_URL+"/report/numbers/"+branchId+"?date1="+date1+"&date2="+date2);
    }
}
