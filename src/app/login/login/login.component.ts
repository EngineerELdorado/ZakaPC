import { Component, OnInit, PLATFORM_ID, Inject  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm:FormGroup;
  @BlockUI() blockUI: NgBlockUI;
  constructor(private authService: AuthService,
    @Inject(PLATFORM_ID) private platform: Object,
    private router:Router) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      phone: new FormControl('', Validators.required),
      pin: new FormControl('', Validators.required)
    })
  }

  post(myForm:FormGroup){

    if(this.isValid()){
      this.blockUI.start('Loading...'); // Start blocking
      this.authService.login(myForm.value).subscribe(res=>{
        this.blockUI.stop(); // Stop blocking
       // console.log(res)
        if(res.body.responseCode==="00"){
          console.log(res);
          if (isPlatformBrowser(this.platform)) {
          localStorage.setItem("zakaLoggedIn","true");
          localStorage.setItem("zakaUserId", res.body.data.id);
          localStorage.setItem("zakaBusinessId", res.body.data.business.id);
          localStorage.setItem("zakaBranchId", res.body.data.branch.id);
          localStorage.setItem("zakaBusinessName", res.body.data.business.name);
          localStorage.setItem("zakaBranchName", res.body.data.branch.name);
          localStorage.setItem("zakaBranchCurrency", res.body.data.branch.currency);
          localStorage.setItem("zakaUsername", res.body.data.name);
          localStorage.setItem("zakaUserType", res.body.data.type);
          localStorage.setItem("zakaExpirationDate", res.body.data.branch.expirationDate)
          }
           this.router.navigate(['/dashboard'])
        }else{
          console.log("login failed");
          alert(res.body.responseMessage)
        }
      },err=>{
        this.blockUI.stop(); // Stop blocking
        console.log(err);
        alert(err)
      },()=>{

      });
    }else{
alert("Veillez remplir tous les champs")
    }

  }

  isValid(){

    if(this.myForm.value.phone==="" || this.myForm.value.pin===""){

      return false;
    }else{
      return true;
    }
  }


}
