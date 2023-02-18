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

  getMessage(message: string) {
    this.messageText = message;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 1500);
  }
}
