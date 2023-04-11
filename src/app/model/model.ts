export interface SideNavItem {
    title: string;
    link: string;
  }
  export enum UserType{
    ADMIN,
    USER
  }
  export interface User{
    id:Number;
    firstName:string;
    lastName:string;
    email:string;
    mobile:string;
    password:string;
    blocked:boolean;
    active:boolean;
    createdOn:string;
    userType:UserType;
    fine:number; 


  }
  export interface Book{
    id:number;
    title:string;
    category:string;
    subCategory:string;
    price:number;
    available:boolean;
    count:string;
    author:string;
  }
  export interface CategoryBook{
    category:string;
    subCategory:string;
    books:Book[];
  }
  export interface Order{
    id:number;
    userid:number;
    name:string;
    bookid:number;
    booktitle:string;
    orderno:string;
    returned:boolean;
  }