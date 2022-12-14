import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectsService } from 'src/app/API Services/Project/projects.service';
import { ShowProjevtNotificationComponent } from 'src/app/ValidatorNotification/ValidatorProject/show-projevt-notification/show-projevt-notification.component';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  addProjectForm: FormGroup;
  imageUploaded!: File;
  messageReceived: any;
  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, private projectService: ProjectsService) {
    this.addProjectForm = formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]]
    })
  }
  get title() {
    return this.addProjectForm.get('title')?.valid;
  }
  get description() {
    return this.addProjectForm.get('description')?.valid;
  }
  get image() {
    return this.addProjectForm.get('image')?.valid;
  }
  ngOnInit(): void {
  }
  validationNotification() {
    this.snackBar.openFromComponent(ShowProjevtNotificationComponent, {
      data: {
        title: this.title,
        description: this.description,
        image: this.image
      },
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 4 * 1000
    })
  }
  uploadImage(event: any) {
    const file = event.target.files[0];
    this.imageUploaded = file;
  }
  async formSubmit() {
    if (!this.addProjectForm.valid)
      this.validationNotification();
    else {
      let title = (this.addProjectForm.value.title);
      let description = (this.addProjectForm.value.description);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", this.imageUploaded);
      (await this.projectService.createProject(formData)).subscribe((response) => {
        this.messageReceived = response;
        this.snackBar.open(this.messageReceived.message, "Ok", {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 4 * 1000,
          panelClass: ['successSnackBar']
        });
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
