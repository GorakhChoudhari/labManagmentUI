import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { setInterval } from 'timers';
import { error } from 'console';

@Component({
  selector: 'app-managebooks',
  templateUrl: './managebooks.component.html',
  styleUrls: ['./managebooks.component.scss']
})
export class ManagebooksComponent implements OnInit {

  addBookForm:FormGroup ;
  deleteBookForm:FormControl;
  
  addMsg='';
  deleteMsg='';
  constructor(private fb:FormBuilder,public  api:ApiService) { 
    this.addBookForm=fb.group({
      title:fb.control('',[Validators.required]),
      author:fb.control('',[Validators.required]),
      category:fb.control('',[Validators.required]),
      subcategory:fb.control('',[Validators.required]),
      price:fb.control('',[Validators.required]),
    });


    this.deleteBookForm=fb.control('',[Validators.required])
  }

  insertBook(){
    let book ={
      id:0,
      title:this.Title.value,
      category:{
        category:this.Category.value,
        subCategory:this.SubCategory.value
      },
      price:this.Price.value,
      available:true,
      author:this.Author.value

    };
    this.api.insertBook(book).subscribe({
      next:(res:any)=>{
this.addMsg="Bood Added Successfully";
// setInterval(() =>(this.addMsg=''),5000);

      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
    
  }
  deleteBook(){
    let id:number=parseInt(this.deleteBookForm.value)
   this.api.deleteBook(id).subscribe({
    next:(res:any)=>{
      if(res === 'success'){
        this.addMsg = 'Book Deleted '
      }else {
        this.addMsg='Book Not Found'
      }
    },
    error:(err:any)=>{
console.log(err);

    }
   })
    
  }

  get Title():FormControl{
    return this.addBookForm.get('title') as FormControl
  }

  get Author():FormControl{
    return this.addBookForm.get('author') as FormControl
  }
  get Category():FormControl{
    return this.addBookForm.get('category') as FormControl
  }
  get SubCategory():FormControl{
    return this.addBookForm.get('subcategory') as FormControl
  }
  get Price():FormControl{
    return this.addBookForm.get('price') as FormControl
  }
  
  ngOnInit(): void {
   
  }

}

