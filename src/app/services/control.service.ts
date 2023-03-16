import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor() { }

  showAddTaskBotton = false;
  addContactDialogOpen = false;
  editContactDialogOpen = false;
  taskDetailsDialogOpen = false;
  editTasksDialogOpen = false;
  showDeleteTaskDialog = false;
  showMessage = false;
  messageText: string = '';
  messageImage?: string = '';
  currentId: string = '';
  contactsAvailable: boolean = false;
  currentContact: number = 0;
  notRouteToContactList = false;
  isOpenedInOverlay = false;
  

  getMessage(message: string, image?: string) {
    this.messageText = message;
    this.messageImage = image;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 1500);
  }


  dontCloseByClick(event: Event) {
    event.stopPropagation();
  }

}
