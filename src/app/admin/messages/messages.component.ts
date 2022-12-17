import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MessageService } from 'src/app/API Services/Message/message.service';
import { DeleteMessagesComponent } from 'src/app/Dialogs/Messages/delete-messages/delete-messages.component';
import { messageInfo } from 'src/app/Models/Message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messagesReceived:any;
  messagesList= Array<messageInfo>();
  pageSize = 4;
  currentpage = 0;
  totalMessages:any;
  pageEvent!:PageEvent;
  constructor(private messageService:MessageService,
              public dialog:MatDialog) { }

  ngOnInit(): void {
    this.getMessagePagination(this.pageSize,this.currentpage)
  }

  handlePAgination(event:PageEvent){
    this.pageEvent =event;
    this.getMessagePagination(event.pageSize,event.pageIndex);
  }

  async getMessagePagination(pageSize:Number,currentPage:Number){
    (await this.messageService.getMessagesPagination(pageSize,currentPage)).subscribe((allMessages:messageInfo)=>{
      this.messagesReceived = allMessages;
      this.messagesList = this.messagesReceived.messages.map((message:any)=>{
        return message;
      });
      this.totalMessages =  this.messagesReceived.totalMessages;
    });
  }

  deleteMessage(id:any){
    this.dialog.open(DeleteMessagesComponent,{
      data:{
        id:id
      },
      width:"300px"
    })
  }
}
