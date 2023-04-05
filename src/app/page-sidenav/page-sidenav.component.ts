import { Component, OnInit } from '@angular/core';
import { SideNavItem } from '../model/model';

@Component({
  selector: 'app-page-sidenav',
  templateUrl: './page-sidenav.component.html',
  styleUrls: ['./page-sidenav.component.scss']
})
 export class PageSidenavComponent {
    sideNavContent: SideNavItem[] = [
      {
        title: 'view books',
        link: 'books/library',
      },
      {
        title: 'manage books',
        link: 'books/maintenance',
      },
      {
        title: 'manage categories',
        link: 'books/categories',
      },
      {
        title: 'return book',
        link: 'books/return',
      },
      {
        title: 'view users',
        link: 'users/list',
      },
      {
        title: 'all orders',
        link: 'users/all-orders',
      },
      {
        title: 'my orders',
        link: 'users/order',
      },
    ];
  }