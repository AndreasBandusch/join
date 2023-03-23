import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contact } from 'src/app/models/contact.model';
import { ControlService } from 'src/app/services/control.service';
import { CustomformcontrolModule } from 'src/app/modules/customformcontrol/customformcontrol.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})

export class AddContactComponent implements OnInit {
  inputName: string = '';
  inputEmail: string = '';
  inputPhone: string = '';
  newContactId: string = '';
  currentContactId: number = 0;
  allContacts: any[] = [];
  animationStatus: boolean = false;

  constructor(
    public control: ControlService,
    private firestore: AngularFirestore,
    public fControl: CustomformcontrolModule,
    private route: Router) { }


  ngOnInit(): void {
    this.fControl.createContactForm.reset();
  }


  createContact(): void {
    let newContact: Contact = new Contact(this.inputName, this.inputEmail, this.inputPhone);
    newContact.getRandomColor();
    this.currentContactId = newContact.id;
    this.saveContact(newContact);
    this.loadContacts();
    this.control.currentContact = newContact.id;
  }


  saveContact(newContact: any): void {
    this.firestore
      .collection('contacts')
      .add(newContact.toJSON()).then(() => {
        this.showFeedbackMessage();
      });
  }


  loadContacts(): void {
    this.firestore.collection('contacts').valueChanges({ idField: 'docId' }).subscribe(changes => {
      this.allContacts = changes;
      this.reloadContactDetails();
    })
  }


  reloadContactDetails(): void {
    this.allContacts.forEach(contact => {
      if (contact.id == this.currentContactId) {
        this.newContactId = contact.docId;
        (this.control.notRouteToContactList !== true ?
          this.route.navigate(['kanban/contact-list/contact/' + this.newContactId]) : false);
      }
    })
  }


  showFeedbackMessage(): void {
    this.closeDialog();
    this.control.getMessage('Contact succesfully created');
  }


  closeDialog(): void {
    this.animationStatus = true;
    setTimeout(() => {
      this.control.openOverlay('addContact', false)
    }, 225);
  }
}


