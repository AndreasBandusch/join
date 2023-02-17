import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ControlService} from 'src/app/services/control.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-section-contacts',
  templateUrl: './section-contacts.component.html',
  styleUrls: ['./section-contacts.component.scss']
})
export class SectionContactsComponent implements OnInit {
  
  allContacts: any[] = [];
  switchView: boolean = false;
  catagoryInitials: string[] = [];
  initialsLastNames: string[] = [];
  initals: any[] = [];
  
  constructor(public firestore: AngularFirestore, public control: ControlService, public contactServ: ContactService) {}

  ngOnInit() {
    this.contactServ.currentContact = 0;
    this.loadContacts();
  }

  loadContacts() {
    this.firestore.collection('contacts').valueChanges({idField: 'docId'}).subscribe((updates: any) => {
      this.allContacts = updates;

      if (this.allContacts.length > 0) {
        this.getCatagoryInitials();
        this.contactServ.contactsAvailable = true;
      } else {
        this.contactServ.contactsAvailable = false;
      }
    })
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

