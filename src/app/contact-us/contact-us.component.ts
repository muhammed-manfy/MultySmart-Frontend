import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from '../API Services/Message/message.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(public snackBar:MatSnackBar,
    private messageService:MessageService,
    public router:Router) { }
    messageResponse:any;
  ngOnInit(): void {
  }
  ValidationNotfication(){
    this.snackBar.open("Complete Fields Please","Ok",{
      horizontalPosition:"end",
      verticalPosition:"bottom",
      panelClass:['validationSnackBar'],
      duration:4 * 1000
    })
  }
  async  formSubmit(event:any){
    let fullName = event.target.fullName.value;
    let phone = event.target.phone.value;
    let message = event.target.message.value;

    if(!fullName || !phone ||!message){
      this.ValidationNotfication();
    }else{
      const createMessage={
        fullName:fullName,
        phone:phone,
        message:message
      };
      (await this.messageService.createMessage(createMessage)).subscribe(response=>{
        this.messageResponse = response;
        this.snackBar.open(this.messageResponse.message,"OK",{
          horizontalPosition:"end",
          verticalPosition:"bottom",
          panelClass:['successSnackBar'],
          duration:4 * 1000
        });
        this.router.navigate(['/']);
      },(erorr)=>{
        this.snackBar.open("The Server is Down Try Later!","OK",{
          horizontalPosition:"end",
          verticalPosition:"bottom",
          panelClass:['validationSnackBar'],
          duration:4 * 1000
        });
      })
    }
  }
}
