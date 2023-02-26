import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlService {


  constructor(
  
  ) { }

  showAddTaskBotton = false;
  addContactDialogOpen = false;
  editContactDialogOpen = false;
  showMessage = false;
  messageText: string = '';
  messageImage?: string = '';

  getMessage(message: string, image?: string) {
    this.messageText = message;
    this.messageImage = image;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 1500);
  }
}
