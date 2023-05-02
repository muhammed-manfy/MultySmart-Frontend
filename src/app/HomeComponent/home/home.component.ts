import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/API Services/Brand/brand.service';
import { OfferService } from 'src/app/API Services/Offer/offer.service';
import { ProjectsService } from 'src/app/API Services/Project/projects.service';
import { brandInfo } from 'src/app/Models/Brand.model';
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
  constructor(private projectService:ProjectsService ,
    private offerService:OfferService) { 
      $(document).ready(function() {
        ( $("#carouselIndicators") as any).carousel({
            interval: 3500
        });
       });      
    }

  ngOnInit(): void {
    this.getOffers();
    this.getProjects()
    
  }
  getProjects(){
    this.projectService.getProjects().subscribe((allProjects:projectInfo)=>{
      this.projectsReceived =allProjects;
      this.projectsList = this.projectsReceived.map((project:any)=>{
        return project;
      });
    });
  }
  getOffers(){
    this.offerService.getOffers().subscribe((allOffers:offersInfo)=>{
      this.offersReceived =allOffers;
      this.offersList = this.offersReceived.map((offer:any)=>{
        return offer;
      });
    });
  }
}
