import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contact } from 'src/app/models/contact.model';
import { ControlService} from 'src/app/services/control.service';
import { ContactService } from 'src/app/services/contact.service';



@Component({
  selector: 'app-section-contacts',
  templateUrl: './section-contacts.component.html',
  styleUrls: ['./section-contacts.component.scss']
})
export class SectionContactsComponent implements OnInit {
  
  isAntonActive = false;
  test: boolean = false;
  catagoryInitials: string[] = [];
  initialsLastNames: string[] = [];
  initals: any[] = [];
  currentContact: string = '';

  constructor(public firestore: AngularFirestore, public control: ControlService, public contactServ: ContactService ) {}


  ngOnInit() {
    this.firestore.collection('contacts').valueChanges({ idField: 'docId' }).subscribe((updates: any) => {
      this.contactServ.contacts = updates;
      this.getCatagoryInitials();
    })
  }


  getCatagoryInitials() {
    this.catagoryInitials = [];
    this.contactServ.contacts.forEach(contact => {
      let initial = contact.initials[0];
      if (!this.catagoryInitials.includes(initial)) {
        this.catagoryInitials.push(initial);
        this.catagoryInitials.sort();
      }
    });
  }


  setActive(clickedContact: string) {
    this.isAntonActive = clickedContact === 'anton';
  }


  getFirstLetter(currentContact: string) {
    return currentContact.charAt(0);
  }


  toggleDetails(isActiveContact: boolean) {
    this.test = isActiveContact;
  }


  addContact() {
    this.control.addContactDialogOpen = true;
  }

}

