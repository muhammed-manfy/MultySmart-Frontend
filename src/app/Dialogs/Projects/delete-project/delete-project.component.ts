import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectsService } from 'src/app/API Services/Project/projects.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss']
})
export class DeleteProjectComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar, private projectService: ProjectsService) { }
  idProject = this.data.id;
  messageResponse: any;
  ngOnInit(): void {
  }
  async deleteRecord() {
    (await this.projectService.deleteProject(this.idProject)).subscribe(response => {
      this.messageResponse = response;
        this.snackBar.open(this.messageResponse.message, "Ok", {
        horizontalPosition: "end",
        verticalPosition: "bottom",
        duration: 4 * 1000,
        panelClass: ['successSnackBar']
      });
    }, (err) => {
      this.snackBar.open("Some Error is happend On Server", "Ok", {
        horizontalPosition: "end",
        verticalPosition: "bottom",
        duration: 4 * 1000,
        panelClass: ['validationSnackBar']
      });
    });
  }

}
