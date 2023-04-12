import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.scss']
})
export class ReturnBookComponent implements OnInit {
  status:string='';
  bookForm:FormGroup;

  constructor(private api:ApiService, private fb:FormBuilder) {
    this.bookForm = this.fb.group({
      bookId:fb.control('',[Validators.required]),
      userId:fb.control('',[Validators.required]),
    })
   }

  ngOnInit(): void {
  }
ReturnBook(){
  let bookId=(this.bookForm.get('bookId')as FormControl).value;
  console.log(bookId);
  
  let userId=(this.bookForm.get('userId')as FormControl).value;
  this.api.ReturnBook(bookId,userId).subscribe({
    next:(res:any)=>{
      if(res === 'success') this.status="Book returned Successfully";
      else  this.status= res  
      },
      error:(err:any)=> console.log(err),
      
  })
}


}
