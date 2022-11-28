import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {
    $(document).ready(function(){
      $("ul").hide();
    });

    $(document).ready(function(){
      $(".projects").click(function(){
        $(".projects-list").toggle(500);
      });
    });

      $(document).ready(function(){
        $(".offers").click(function(){
          $(".offers-list").toggle(500);
        });
      });

      $(document).ready(function(){
        $(".product").click(function(){
          $(".product-list").toggle(500);
        });
      });

      $(document).ready(function(){
        $(".brands").click(function(){
          $(".brands-list").toggle(500);
        });
      });

      $(document).ready(function(){
        $(".videos").click(function(){
          $(".videos-list").toggle(500);
        });
      });
  }

  ngOnInit(): void {
  }
}
