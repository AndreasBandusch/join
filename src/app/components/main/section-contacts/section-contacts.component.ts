import { Component, OnInit, OnDestroy } from '@angular/core';
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
  categoryInitials: string[] = [];
  initialsLastNames: string[] = [];
  initals: any[] = [];

  constructor(
    private firestore: AngularFirestore,
    public control: ControlService) { }


  ngOnInit(): void {
    this.loadContacts();
  }

  ngOnDestroy(): void {
    this.control.currentContact = 0;
  }


  loadContacts(): void {
    this.control.currentContact = 0;
    this.firestore.collection('contacts').valueChanges({ idField: 'docId' }).subscribe((updates: any) => {
      this.allContacts = updates;
      this.checkIfContactsAvailable();
    })
  }


  checkIfContactsAvailable(): void {
    if (this.allContacts.length > 0) {
      this.getCatagoryInitials();
      this.control.contactsAvailable = true;
    } else {
      this.control.contactsAvailable = false;
    }
  }


  getCatagoryInitials(): void {
    this.categoryInitials = [];
    this.allContacts.forEach(contact => {
      let initial = contact.initials[0];
      if (!this.categoryInitials.includes(initial)) {
        this.categoryInitials.push(initial);
        this.categoryInitials.sort();
      }
    });
  }


  getFirstLetter(currentContact: string): string {
    return currentContact.charAt(0);
  }


  toggleDetails(isActiveContact: boolean): void {
    this.switchView = isActiveContact;
  }


  addContact(): void {
    this.control.notRouteToContactList = false;
    this.control.openOverlay('addContact', true);
  }
}

