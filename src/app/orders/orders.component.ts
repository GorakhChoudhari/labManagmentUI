import { Component, OnInit } from '@angular/core';
import { Order } from '../model/model';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  listOfOrders:Order[]=[];
  coloumns:string[]=['id','name','bookid','book','returned'];

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    let userId= this.api.gettokeninfo()?.id ?? 0; 
    this.api.GetordersOfBook(userId).subscribe({
      next:(res:Order[])=>{
        console.log(res);
        this.listOfOrders=res;
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

}
