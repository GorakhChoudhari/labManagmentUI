import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserType } from '../model/model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'https://localhost:44368/api/Library/';

  constructor(private http: HttpClient,private jwt:JwtHelperService) {}

  createUser(user: User) {
    return this.http.post(this.baseUrl + 'CreateAccount', user, {
      responseType: 'text',
    });
  }

  Login(loginInfo: any) {
    let params = new HttpParams()
      .append('email', loginInfo.email)
      .append('password', loginInfo.password);

    return this.http.get(this.baseUrl + 'Login', {
      params: params,
      responseType: 'text',
    });
  }
  saveToken(token: string) {
    localStorage.setItem('access_token', token);
    console.log('token',token);
    
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
 

  gettokeninfo(): User | null{
    if(!this.isLoggedIn()) return null;
    let token =this.jwt.decodeToken();
    let user:User={
      id:token.id,
      firstName:token.firstName,
      lastName:token.lastName,
      email:token.email,
      mobile:token.mobile,
      password:'',
      blocked:token.blocked.toLowerCase()=== 'true',
      active:token.active.toLowerCase() === 'true',
      createdOn:token.createdAt,
      fine:0,
      userType:token.userType ==='USER' ? UserType.USER:UserType.ADMIN

    };
    return user
  }
}
