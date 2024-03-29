import { Injectable } from '@angular/core';
import { Location } from '@angular/common';


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
  isImprintActive: boolean = false;
  isPrivacyActive: boolean = false;
  activeStart: string = '';
  firstSummaryCall: boolean = true;
  start: boolean = true;
  showSubMenu: boolean = false;
  inHelpSection: boolean = false;
  lastActiveLink: string = '';

  constructor(private location: Location) { }

  getMessage(message: string, image?: string) {
    this.messageText = message;
    this.messageImage = image;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 1500);
  }


  setActive(clickedLink: string): void {
    if (clickedLink !== 'not') {
      this.lastActiveLink = clickedLink;
    }
    this.showSubMenu = false;
    this.isSummaryActive = clickedLink === 'summary';
    this.isBoardActive = clickedLink === 'board';
    this.isAddTaskActive = clickedLink === 'addTask';
    this.isContactsActive = clickedLink === 'contacts';
    this.isImprintActive = clickedLink === 'imprint';
    this.isPrivacyActive = clickedLink === 'privacy';
  }


  dontCloseByClick(event: Event): void {
    event.stopPropagation();
  }


  closeSubMenu(event: string): void {
    if (event === 'over') {
      this.showSubMenu = true;
    } else {
      setTimeout(() => {
        this.showSubMenu = false;
      }, 1000)

    }
  }


  openOverlay(overlayName: string, open: boolean): void {
    this.setOrRemoveBodyScroll(open);
    switch (overlayName) {
      case 'addContact':
        this.addContactDialogOpen = open;
        break;
      case 'editContact':
        this.editContactDialogOpen = open;
        break;
      case 'taskDetails':
        this.taskDetailsDialogOpen = open;
        break;
      case 'editTask':
        this.editTasksDialogOpen = open;
        break;
      case 'addTask':
        this.isOpenedInOverlay = open;
        break;
    }
  }


  setOrRemoveBodyScroll(open: boolean): void {
    const bodyTag = document.body;
    if (open) {
      bodyTag.classList.add('no-scroll');
    } else {
      bodyTag.classList.remove('no-scroll');
    }
  }

  
  goBack(): void {
    this.location.back();
    this.setActive(this.lastActiveLink);
  }

}
