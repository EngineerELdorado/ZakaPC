import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  public BACKEND_URL ="https://torapos-master.herokuapp.com/api";
 // public BACKEND_URL ="https://torapos.herokuapp.com/api";
  constructor() { }
}
