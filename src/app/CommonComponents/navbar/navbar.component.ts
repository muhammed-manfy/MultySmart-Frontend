import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/API Services/User/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  widthOfScreen!:Number;
  ORDERs_COUNT_IN_CART :any;
  ORDER_COUNT:any;
  cartCount:any;
  cartInfo:Array<any>=[];
  countStyle:string ='';
  userIsLogin!:boolean;
  username = localStorage.getItem("username");
  constructor(private userService:UserServiceService , private router:Router) { }

  ngOnInit(): void {
    this.widthOfScreen = window.innerWidth;
    this.ORDERs_COUNT_IN_CART = localStorage.getItem("ORDER_COUNT_IN_CART");
    this.cartInfo = JSON.parse(this.ORDERs_COUNT_IN_CART);
    if(this.cartInfo != null){
      this.cartCount = this.cartInfo.length;
    } else if(this.cartInfo == null) {
      this.cartCount = 0;
    }
    this.userIsLogin = this.userService.checkUserIsLogIn();
    console.log(this.userIsLogin); 
  }

  moveToProfile(){
    this.router.navigateByUrl(`/${this.username}/profile`);
  }

  logoutUser(){
    this.userService.logoutUser();
  }

}
