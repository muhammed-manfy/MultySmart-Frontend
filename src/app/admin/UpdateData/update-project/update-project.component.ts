import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/API Services/Project/projects.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {
  routingInfo:any;
  idProject:any;
  imageUploaded!: File;
  messageReceived: any;
  constructor(public snackBar: MatSnackBar,
     private projectService: ProjectsService ,
     public router:Router) {
       this.routingInfo = this.router.getCurrentNavigation()?.extras.state;
        this.idProject = this.routingInfo._id;
  }

  ngOnInit(): void {
  }
  validationNotification() {
    this.snackBar.open("Can't Update Data","Close",{
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 4 * 1000,
      panelClass:['validationSnackBar']
    })
  }

  async formSubmit(event:any) {

    const title = (event.target.title.value);
    const description = (event.target.description.value);
    this.imageUploaded = (event.target.image.files[0]);
    if (!title || !description || !this.imageUploaded)
      this.validationNotification();
    else {
      let title = (event.target.title.value);
      let description = (event.target.description.value);
      const formData = new FormData();
      formData.append("title",title);
      formData.append("description",description);
      formData.append("image",this.imageUploaded);
      (await this.projectService.updateProject(this.idProject,formData)).subscribe((response) => {
        this.messageReceived = response;
        this.snackBar.open(this.messageReceived.message, "Ok", {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 4 * 1000,
          panelClass: ['successSnackBar']
        });
        this.router.navigate(['dashboard/projects']);
      }, (error) => {
        this.snackBar.open("Some think as error is happend please try agin!", "Ok", {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 4 * 1000,
          panelClass: ['validationSnackBar']
        });
      });
    }
  }
}
