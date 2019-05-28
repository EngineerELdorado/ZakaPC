import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm:FormGroup;
  @BlockUI() blockUI: NgBlockUI;
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.myForm= new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      pin: new FormControl('', Validators.required),
      
    })
  }

  post(myForm:FormGroup){
    if(this.isValid){
      this.blockUI.start('Loading...'); // Start blocking
    this.authService.register(myForm.value).subscribe(res=>{
      //this.blockUI.stop(); // Stop blocking
     // console.log(res)
      if(res.body.responseCode==="00"){
        this.authService.login(myForm.value).subscribe(res=>{
          this.blockUI.stop(); // Stop blocking
         // console.log(res)
          if(res.body.responseCode==="00"){
            console.log("login successful");
            localStorage.setItem("zakaLoggedIn","true")
            localStorage.setItem("zakaUserId", res.body.data.id)
            localStorage.setItem("zakaBusinessId", res.body.data.business.id)
            localStorage.setItem("zakaBranchId", res.body.data.branch.id)
            localStorage.setItem("zakaUsername", res.body.data.name)
            localStorage.setItem("zakaUserType", res.body.data.type)
            localStorage.setItem("zakaBranchCurrency", res.body.data.branch.currency)
             this.router.navigate(['/dashboard/pos'])
          }else{
            alert(res.body.responseMessage)
            console.log(res.body.responseMessage)
          }
        },err=>{
          this.blockUI.stop(); // Stop blocking
          console.log(err)
        },()=>{
    
        });
      }else{
        this.blockUI.stop();
        alert(res.body.responseMessage)
        //console.log(res.body.responseMessage)
      }
    },err=>{
      this.blockUI.stop(); // Stop blocking
      console.log(err)
    },()=>{

    });
    }else{
      alert("Veillez remplir tous les champs obligatoires")
    }
  }

  isValid(){
    if(this.myForm.value.name==="" || this.myForm.value.address==="" || this.myForm.value.phone===""||
    this.myForm.value.pin===""){
      return false;
    }else{
      return true;
    }
  }
}
