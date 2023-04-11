import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { Order } from '../model/model';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  listOfAllOrders: Order[]=[];
  ordersToDisplay:Order[]=[];
  columns:string[]=[
    'id',
    'userid',
    'name',
    'bookid',
    'book',
    'date',
    'returned'
  ]

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getAllOrders().subscribe({
      next:(res:Order[])=>{
        console.log(res);
        this.listOfAllOrders=res;
        this.ordersToDisplay = this.listOfAllOrders;
        console.log(this.listOfAllOrders);
        
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
filter(value:string){
  if(value === 'all'){
    this.ordersToDisplay = this.listOfAllOrders.filter((value) => value)
  } else if(value === 'pen'){
    this.ordersToDisplay = this.listOfAllOrders.filter((value) => value.returned==false);
  
  } else
  this.ordersToDisplay = this.listOfAllOrders.filter((value) => value.returned);
}
}
