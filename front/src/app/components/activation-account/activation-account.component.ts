import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Confirm$Params } from 'src/app/services/fn/authentication-controller/confirm';
import { AuthenticationControllerService } from 'src/app/services/services';
@Component({
  selector: 'app-activation-account',
  templateUrl: './activation-account.component.html',
  styleUrls: ['./activation-account.component.css']
})
export class ActivationAccountComponent {

firstValue: any;
secondValue: any;
thirdValue: any;
fourthValue: any;
sixValue: any;
fifthValue: any;
code:string="";


  message:string="";
  isOkay:boolean=true;
  submitted:boolean=false;
  userId:any;
  userRole:any;
  constructor(private router:Router,private authService:AuthenticationControllerService){
      this.userId= localStorage.getItem('id_user');
      this.userRole= localStorage.getItem('role');

  }

 
    confirmCode() {
      this.code=this.firstValue+""+this.secondValue+""+this.thirdValue+""+this.fourthValue+""+this.fifthValue+""+this.sixValue;
      const params: Confirm$Params = {
        token: this.code
      };
      this.authService.confirm(params).subscribe(result=>{
        this.message = 'Your Account has been successfully activated .\n Now You Can Proced To login ';
        this.submitted= true;
        this.isOkay=true


        
      },error=>{
          this.message='Token Has been expired or inValid'
          this.submitted= true;
          this.isOkay=false
      });
      
      
    console.log(this.code)
    }
    goToNextRegister() {
      if(this.userRole=='STUDENT'){
        this.router.navigate(['/register/student']);

      }else{
        this.router.navigate(['/register/company']);

      }
    } 
    
}
