import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
  import { from } from 'rxjs';
import { GlobalVariablesService } from './global-variables.service';
import { ApiResponse } from './api-response';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private router: Router,
    private globalVariables: GlobalVariablesService) { }

    public login(form){
      return this.httpClient.post<ApiResponse>(this.globalVariables.BACKEND_URL+"/users/login",form,{observe:'response'});
    }

    public register(form){
      return this.httpClient.post<ApiResponse>(this.globalVariables.BACKEND_URL+"/businesses/add",form,{observe:'response'});
    }

    public logout(){
      localStorage.clear();
      this.router.navigate(['/login'])
    }

}
