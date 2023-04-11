import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthguardGuard } from 'src/gurad/authguard.guard';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AuthorizationGuard } from 'src/gurad/authorization.guard';
import { ReturnBookComponent } from './return-book/return-book.component';

const routes: Routes = [ 
  {
    path:"books/library",
    component:LibraryComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"users/order",
    component:OrdersComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path:"users/all-orders",
    component:AllOrdersComponent,
    canActivate:[AuthorizationGuard]
  },
  {
    path:"books/return",
    component:ReturnBookComponent,
    canActivate:[AuthorizationGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
