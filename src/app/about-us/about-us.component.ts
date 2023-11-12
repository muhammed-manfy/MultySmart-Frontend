import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor() {
    $(document).ready(function() {
      ( $("#carouselIndicators") as any).carousel({
          interval: 1500
      });
     });
   }

  ngOnInit(): void {
  }

}
