import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { MaterialModule } from './material/material.module';
import { PageSidenavComponent } from './page-sidenav/page-sidenav.component';
import { LibraryComponent } from './library/library.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { OrdersComponent } from './orders/orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ReturnBookComponent } from './return-book/return-book.component';


@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    PageSidenavComponent,
    LibraryComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    AllOrdersComponent,
    ReturnBookComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:() =>{
          return localStorage.getItem('access_token')
        },
        allowedDomains:['localhost:22052','localhost:7057','localhost:7057']
      }
    })
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
