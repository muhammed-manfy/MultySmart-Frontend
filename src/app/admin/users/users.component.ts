import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { get } from 'jquery';
import { Page } from 'ngx-pagination';
import { UserServiceService } from 'src/app/API Services/User/user-service.service';
import { User } from 'src/app/Models/User.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  userApiResponse: any;
  usersInfo: Array<User>=[];
  currentPage: number = 0;
  pageSize :number = 10;
  totalUsers !:number;
  deleteUserApiResponse:any;
  constructor(private userService:UserServiceService , private snackBar:MatSnackBar) {}

  ngOnInit():void {
    this.getUsers();
  }

  async getUsers(){
    (await this.userService.getAllUsers(this.currentPage,this.pageSize)).subscribe( usersInfoResponse => {
      this.userApiResponse = usersInfoResponse ;
      this.usersInfo = this.userApiResponse.data;
      console.log(this.userApiResponse);
    });
  }

  handlePagination(event:PageEvent){
    this.currentPage = event.pageIndex;
    this.getUsers();
  }

  async deleteUser(id:any){
    (await this.userService.deleteUser(id)).subscribe(response=>{
        this.deleteUserApiResponse = response;
          this.snackBar.open(this.deleteUserApiResponse.message,"Ok",{
            duration: 3 * 1000,
            horizontalPosition:"center",
            verticalPosition:"bottom",
            panelClass:['success']
          });
              document.location.reload();
    },(error)=>{
          this.snackBar.open(error.error.message,"Close",{
            duration: 3 * 1000,
            horizontalPosition:"center",
            verticalPosition:"bottom",
            panelClass:['success']
          });
        })
     }
}
