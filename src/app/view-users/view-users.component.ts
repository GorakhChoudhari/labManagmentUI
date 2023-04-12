import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { User } from '../model/model';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements OnInit {
  users: User[] = [];
  columnsToDisplay: string[] = [
    'id',
    'name',
    'email',
    'mobile',
    'fine',
    'blocked',
    'active',
    'created on',
    'action',
  ];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAllUser()
  }

  getAllUser(){
    this.api.getAllUsers().subscribe({
      next: (res: User[]) => {
        this.users = [];
        this.users = res;
      },
      error: (err: any) => console.log(err),
    });
  }
  blockUser(user: User) {
    if (user.blocked) {
      this.api.Unblockuser(user.id).subscribe({
        next: (res: any) => {
          if (res === 'success') user.blocked = false;
          this.getAllUser();
        },
        error: (err: any) => console.log(err),
      });
    } else{
      this.api.blockuser(user.id).subscribe({
        next:(res:any)=>{
          if (res === 'success') user.blocked = true;
          this.getAllUser()
        },
        error: (err: any) => console.log(err),
      })
    }
  }

  enableUser(user: User) {
    if (user.active) {
      this.api.disablekuser(user.id).subscribe({
        next: (res: any) => {
          if (res === 'success') user.active = false;
          this.getAllUser()
        },
        error: (err: any) => console.log(err),
      });
    } else{
      this.api.enableuser(user.id).subscribe({
        next:(res:any)=>{
          if (res === 'success') user.active = true;
          this.getAllUser()
        },
        error: (err: any) => console.log(err),
      })
    }
  }
}
