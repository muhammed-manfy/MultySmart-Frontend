import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'src/app/API Services/Message/message.service';

@Component({
  selector: 'app-delete-messages',
  templateUrl: './delete-messages.component.html',
  styleUrls: ['./delete-messages.component.scss']
})
export class DeleteMessagesComponent implements OnInit {
  idMessage = this.data.id;
  messageResponse: any;
  constructor(@Inject(MAT_DIALOG_DATA)public data:any , public snackBar:MatSnackBar,
  private messageService:MessageService) { }

  ngOnInit(): void {
  }

  async deleteRecord() {
    (await this.messageService.deleteMessage(this.idMessage)).subscribe(response => {
      this.messageResponse = response;
        this.snackBar.open(this.messageResponse.message, "Ok", {
        horizontalPosition: "end",
        verticalPosition: "bottom",
        duration: 4 * 1000,
        panelClass: ['successSnackBar']
      });
      window.location.reload();
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
