import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  ResponseMsg:string='';
  loginForm: FormGroup ;

  constructor(private fb:FormBuilder,private service:ApiService,private router:Router) { 
    this.loginForm = fb.group({
      email: fb.control('',[Validators.required,Validators.email]),
      password:fb.control('',[Validators.required,Validators.minLength(8),Validators.maxLength(15)]),
    })
  }
  login(){
    let loginInfo={
      email:this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }
  this.service.Login(loginInfo).subscribe({
    next:(res :any) =>{
      if(res.toString()=== 'Invalid'){
        this.ResponseMsg='Invalid Credentials';
       
      }
      else{
        this.ResponseMsg='';
        this.service.saveToken(res.toString());
        this.router.navigateByUrl('books/library')
        
      }

    },
    error:(err:any)=>{
      console.log('Error',err);
      
    }

  })
    
    
  };
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
   get email():FormControl{
    return this.loginForm.get('email') as FormControl
  }
  get password():FormControl{
    return this.loginForm.get('password') as FormControl
  }
  ngOnInit(): void {
  }

}
