import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User, UserType } from '../model/model';
import { log } from 'console';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
   hide= true;
   ResponseMsg:string='';
  //  registerForm:FormGroup;  Both are same or
   registerForm:any=new FormGroup({}); 
  constructor(private fb:FormBuilder,private service:ApiService) {

    this.registerForm = fb.group({
      firstName: fb.control('',[Validators.required]),
      lastName: fb.control('',[Validators.required]),
      email: fb.control('',[Validators.required,Validators.email]),
      password:fb.control('',[Validators.required,Validators.minLength(8),Validators.maxLength(15)]),
      repeatPassword:fb.control(''),
      userType:fb.control('student')
      
    },{
      Validators:[repeatPasswordValidators],
    }as AbstractControlOptions )
   };

   register(){
    let user:User={
      id: 0,
      firstName: this.registerForm.get('firstName')?.value,
      lastName:  this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      mobile: '',
      password: this.registerForm.get('password')?.value,
      blocked: false,
      active: false,
      createdOn: '',
      userType:UserType.USER,
      fine: 0
    }
    this.service.createUser(user).subscribe({
      next:(res:any) =>{
        console.log(res);
    this.ResponseMsg = res.toString();
      },
      error:(err:any) =>{
        console.log("response",err);
        
      }
    })
    
   }

   getfirstnameErrors(){
    if(this.firstName.hasError('required')) return 'Field Is Required';
    return '';
   }
   getlastnameErrors(){
    if(this.lastName.hasError('required')) return 'Field Is Required';
    return '';
   }
   getEmailErrors(){
    if(this.email.hasError('required')) return 'Email Is Required';
    if(this.email.hasError('email'))return 'Email is Invalid'
    return '';
   }
   getPasswordErrors(){
    if(this.password.hasError('required')) return 'password Is Required';
    if (this.password.hasError('minLength'))
    return 'Minimum 8 Characters are required';
    if (this.password.hasError('maxLength'))
    return 'Max  15 Characters only';
    else
    return '';
   }
    get firstName():FormControl{
      return this.registerForm.get('firstName') as FormControl
    }
    get lastName():FormControl{
      return this.registerForm.get('lastName') as FormControl
    }
    get email():FormControl{
      return this.registerForm.get('email') as FormControl
    }
    get password():FormControl{
      return this.registerForm.get('password') as FormControl
    }
    get repeatPassword():FormControl{
      return this.registerForm.get('repeatPassword') as FormControl
    }
   
  
   ngOnInit(): void {
  };
 
};
export const repeatPasswordValidators:ValidatorFn=(
  control:AbstractControl):ValidationErrors| null =>{
    const pwd = control.get("password")?.value;
    const rpwd = control.get("repeatPassword")?.value;
    if (pwd === rpwd){
   control.get('repeatPassword')?.setErrors(null);
   return null
    } else{
  control.get('repeatPassword')?.setErrors({repeatPassword:true});
  return {repeatPassword:true};
  };
  
}

 




