import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

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
  isSummaryActive: boolean = true;
  isBoardActive: boolean = false;
  isAddTaskActive: boolean = false;
  isContactsActive: boolean = false;
  isImpressActive: boolean = false;
  isPrivacyActive: boolean = false;
  activeStart: string = '';
  firstSummaryCall = true;
  start: boolean = true;
  showSubMenu: boolean = false;


  getMessage(message: string, image?: string) {
    this.messageText = message;
    this.messageImage = image;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 1500);
  }

  
  setActive(clickedLink: string): void {
    this.isSummaryActive = clickedLink === 'summary';
    this.isBoardActive = clickedLink === 'board';
    this.isAddTaskActive = clickedLink === 'addTask';
    this.isContactsActive = clickedLink === 'contacts';
    this.isImpressActive = clickedLink === 'impress';
    this.isPrivacyActive = clickedLink === 'privacy';
  }


  dontCloseByClick(event: Event) {
    event.stopPropagation();
  }


  // setOrRemoveBodyScroll() {
  //   const bodyTag = document.body;
  //   if (this.control.isOpenedInOverlay) {
  //     bodyTag.classList.add('no-scroll');
  //   } else {
  //     bodyTag.classList.remove('no-scroll');
  //   }
  // }

}
