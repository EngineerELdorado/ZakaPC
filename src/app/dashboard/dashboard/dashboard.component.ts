import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  businessName;
  expirationDate;
  connected:boolean=true;
  constructor(private router:Router) { }

  ngOnInit() {
    console.log(window.navigator.onLine)
    this.connected = window.navigator.onLine;
    this.expirationDate = localStorage.getItem("zakaExpirationDate");
    this.businessName = localStorage.getItem("zakaBusinessName")+" "+localStorage.getItem("zakaBranchName")
    console.log("Dashboard component loaded");

    if(localStorage.getItem("zakaLoggedIn")==="true"){
       this.router.navigate(["/dashboard/pos"])
    }else{
      this.router.navigate(["/login"])
    }

  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/login"])
  }

  comingSoon(){
    alert("CETTE OPTION ARRIVE BIENTOT")
  }

}
