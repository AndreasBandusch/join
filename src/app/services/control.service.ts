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
  showMessage = false;
  messageText: string = '';
  messageImage?: string = '';
  currentId: string = '';
  contactsAvailable: boolean = false;
  currentContact: number = 0;
  notRouteToContactList = false;
  isOpenedInOverlay = false;
  currentTask: any = {};

 
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

  
  getPrioImage(prio: string): string {
    switch (prio) {
      case 'low':
        return 'add-task-low';

      case 'medium':
        return 'add-task-medium';

      case 'urgent':
        return 'add-task-urgent';

      default:
        return '';
    }
  }

}
