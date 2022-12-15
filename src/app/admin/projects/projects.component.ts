import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/API Services/Project/projects.service';
import { DeleteProjectComponent } from 'src/app/Dialogs/Projects/delete-project/delete-project.component';
import { projectInfo } from 'src/app/Models/Project.model';

@Component({
  selector: 'admin-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class AdminProjectsComponent implements OnInit {

  projectsReceived : any;
  projectsList = Array<projectInfo>();
  messageReplayOnDelete:any;
  constructor(private projectService:ProjectsService ,
     public dialog:MatDialog , public router:Router) {}

  async ngOnInit():Promise <void> {
    (await this.projectService.getProjects()).subscribe((projects:projectInfo)=>{
       this.projectsReceived = projects;
          this.projectsList = this.projectsReceived.map((project:any)=>{
             return  project;
          });
      });
  }
  async deleteRecord(id:any){
    this.dialog.open(DeleteProjectComponent,{
      data:{
        id:id
      },
      width:'300px',
    });
  }
  editProject(project:any){
    this.router.navigateByUrl('dashboard/edit-project',{state:project});
  }
}
