import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { UserServiceService } from 'src/app/API Services/User/user-service.service';
import { User } from 'src/app/Models/User.model';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  apiResponse: any;
  userResponseApi: any;
  imageResponseApi: any
  user: any;
  imageUploaded: any;
  userId: any;
  username: any;
  screenWidth: any;
  duration: Date = new Date(`${localStorage.getItem('expiresIn-duration')}`);
  intervalAuthUser: any;
  widthScreen!: number;
  constructor(private route: Router, private userService: UserServiceService,
    private snackbar: MatSnackBar) {

    $(document).ready(function () {
      $("ul").hide();
    });

    $(document).ready(function () {
      $(".projects").click(function () {
        $(".projects-list").toggle(500);
      });
    });

    $(document).ready(function () {
      $(".offers").click(function () {
        $(".offers-list").toggle(500);
      });
    });

    $(document).ready(function () {
      $(".product").click(function () {
        $(".product-list").toggle(500);
      });
    });

    $(document).ready(function () {
      $(".brands").click(function () {
        $(".brands-list").toggle(500);
      });
    });

    $(document).ready(function () {
      $(".videos").click(function () {
        $(".videos-list").toggle(500);
      });
    });
    this.getScreenSize();
  }

  ngOnInit() {
    this.userId = localStorage.getItem("user-id");
    this.username = localStorage.getItem("username");
    this.getUser();
    this.intervalAuthUser = setInterval(() => {
      if ((this.duration.getTime() - new Date().getTime()) <= 0) {
        localStorage.removeItem("username");
        localStorage.removeItem("user-token");
        localStorage.removeItem("expiresIn-duration");
        localStorage.removeItem("previousUrl");
        window.location.reload();
      }
    }, 10000);
  }


  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.widthScreen = window.innerWidth;
  }

  async getUser() {
    (await this.userService.getUser(this.userId)).subscribe((userResponse: User) => {
      this.userResponseApi = userResponse;
      this.user = this.userResponseApi;
      if (this.user.data.image == " ") {
        this.user.data.image = "assets/userProfile/user.png";
      }
    });
  }

  logoutUser() {
    this.userService.logoutUser();
    clearInterval(this.intervalAuthUser);
  }
}
