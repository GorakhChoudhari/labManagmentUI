import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Output() menuClicked = new EventEmitter<boolean>();

  constructor(public api:ApiService) { }

  ngOnInit(): void {
  }
  deletetoken(){
    localStorage.removeItem('access_token');
    location.reload();
   }

}
