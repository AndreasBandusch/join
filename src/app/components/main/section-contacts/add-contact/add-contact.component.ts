import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { ControlService } from 'src/app/services/control.service';
import { CustomformcontrolModule } from 'src/app/modules/customformcontrol/customformcontrol.module';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})

export class AddContactComponent {
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
    private fControl: CustomformcontrolModule,
    private contactServ: ContactService,
    private route: Router) {
  }


  public createContactForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      this.fControl.name
    ], []),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(10)
    ], []),
    phone: new FormControl('', [
      this.fControl.phoneNumber,
    ])
  });


  createContact() {
    let newContact: Contact = new Contact(this.inputName, this.inputEmail, this.inputPhone);
    newContact.getRandomColor();
    this.currentContactId = newContact.id;
    this.saveContact(newContact);
    this.control.addContactDialogOpen = false;
    this.loadContacts();
    this.contactServ.currentContact = newContact.id;
    this.control.getMessage('Contact succesfully created');
  }


  saveContact(newContact: any) {
    this.firestore
      .collection('contacts')
      .add(newContact.toJSON()); 
  }


  loadContacts() {
    this.firestore.collection('contacts').valueChanges({ idField: 'docId' }).subscribe(changes => {
      this.allContacts = changes;
      this.reloadContactDetails();
    })
  }


  reloadContactDetails() {
    this.allContacts.forEach(contact => {
      if (contact.id == this.currentContactId) {
        this.newContactId = contact.docId;
        this.route.navigate(['kanban/contact-list/contact/' + this.newContactId]);
      }
    })
  }


  dontCloseByClick(event: Event) {
    event.stopPropagation();
  }


  closeDialog() {
    this.animationStatus = true;
    setTimeout(() => {
      this.control.addContactDialogOpen = false;
    }, 225);
  }
}


