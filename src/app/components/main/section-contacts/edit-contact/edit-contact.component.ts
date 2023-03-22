import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ControlService } from 'src/app/services/control.service';
import { CustomformcontrolModule } from 'src/app/modules/customformcontrol/customformcontrol.module';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})

export class EditContactComponent implements OnInit {
  inputName: string = '';
  inputEmail: string = '';
  inputPhone: string = '';
  allContacts: any[] = [];
  currentContact: any = {};
  animationStatus: boolean = false;
  color: string = '';
  currentContactId: number = 0;
  isLoading: boolean = false;

  constructor(
    private control: ControlService,
    private firestore: AngularFirestore,
    public fControl: CustomformcontrolModule) {
  }


  ngOnInit(): void {
    this.currentContactId = this.control.currentContact;
    this.loadAllContacts();
    this.fControl.createContactForm.reset();
  }


  loadAllContacts(): void {
    this.firestore
      .collection('contacts')
      .valueChanges({ idField: 'docId' })
      .subscribe((changes: any) => {
        this.allContacts = changes;
        this.setCurrentContact();
      });
  }


  setCurrentContact(): void {
    this.allContacts.forEach(contact => {
      if (contact.docId == this.control.currentId) {
        this.currentContact = contact;
        this.loadDataIntoInputFields();
      }
    })
  }


  loadDataIntoInputFields(): void {
    this.inputName = this.currentContact.firstName + ' ' + this.currentContact.lastName;
    this.inputEmail = this.currentContact.email;
    this.inputPhone = this.checkPhoneNumber();
  }


  checkPhoneNumber(): string {
    let phone: string = '';
    this.currentContact.phone !== 'No phone number exists' ? phone = this.currentContact.phone : false;
    return phone;
  }


  createContact(): void {
    this.color = this.currentContact.color;
    let newContact = new Contact(this.inputName, this.inputEmail, this.inputPhone);
    newContact.color = this.color;
    newContact.id = this.currentContactId;
    this.updateContact(newContact);
  }


  updateContact(newContact: any) {
    this.isLoading = true;
    this.firestore
      .collection('contacts')
      .doc(this.control.currentId)
      .update(newContact.toJSON())
      .then(() => {
        this.isLoading = false;
        this.showFeedbackMessage();
      });
  }


  showFeedbackMessage() {
    this.closeDialog();
    this.control.getMessage('Contact succesfully edited');
  }


  dontCloseByClick(event: Event) {
    event.stopPropagation();
  }


  closeDialog() {
    this.animationStatus = true;
    setTimeout(() => {
      this.control.openOverlay('editContact',false);
    }, 225);
  }
}


