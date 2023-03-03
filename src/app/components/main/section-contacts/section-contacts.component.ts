import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-section-contacts',
  templateUrl: './section-contacts.component.html',
  styleUrls: ['./section-contacts.component.scss']
})

export class SectionContactsComponent implements OnInit, OnDestroy {
  allContacts: any[] = [];
  switchView: boolean = false;
  catagoryInitials: string[] = [];
  initialsLastNames: string[] = [];
  initals: any[] = [];
 

  constructor(
    private firestore: AngularFirestore, 
    public control: ControlService) {}


  ngOnInit(): void {
    this.loadContacts();
  }

  ngOnDestroy(): void {
    this.control.currentContact = 0;
  }


  loadContacts() {
    this.control.currentContact = 0;
    this.firestore.collection('contacts').valueChanges({ idField: 'docId' }).subscribe((updates: any) => {
      this.allContacts = updates;
      this.checkIfContactsAvailable();
    })
  }


  checkIfContactsAvailable() {
    if (this.allContacts.length > 0) {
      this.getCatagoryInitials();
      this.control.contactsAvailable = true;
    } else {
      this.control.contactsAvailable = false;
    }
  }


  getCatagoryInitials() {
    this.catagoryInitials = [];
    this.allContacts.forEach(contact => {
      let initial = contact.initials[0];
      if (!this.catagoryInitials.includes(initial)) {
        this.catagoryInitials.push(initial);
        this.catagoryInitials.sort();
      }
    });
  }


  getFirstLetter(currentContact: string) {
    return currentContact.charAt(0);
  }


  toggleDetails(isActiveContact: boolean) {
    this.switchView = isActiveContact;
  }


  addContact() {
    this.control.addContactDialogOpen = true;
  }
}

