import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  widthOfScreen!:Number;
  constructor() { }

  ngOnInit(): void {
    this.widthOfScreen = window.innerWidth;
  }

}
