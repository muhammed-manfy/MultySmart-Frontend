import { Component, OnInit } from '@angular/core';
import { event } from 'jquery';
import { BrandService } from 'src/app/API Services/Brand/brand.service';
import { OfferService } from 'src/app/API Services/Offer/offer.service';
import { ProjectsService } from 'src/app/API Services/Project/projects.service';
import { offersInfo } from 'src/app/Models/Offer.model';
import { projectInfo } from 'src/app/Models/Project.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projectsReceived:any;
  projectsList=Array<projectInfo>();
  offersReceived:any;
  offersList=Array<offersInfo>();
  screenWidth:any;
  constructor(private projectService:ProjectsService ,
    private offerService:OfferService) {
      $(document).ready(function() {
        ( $("#carouselIndicators") as any).carousel({
            interval: 1500
        });
       });
    }

  ngOnInit(): void {
    this.screenWidth = window.screen.width;
  }

}
