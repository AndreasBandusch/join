import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
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

  constructor(
    public control: ControlService,
    private firestore: AngularFirestore,
    private fcontrol: CustomformcontrolModule,
    public contactServ: ContactService) {
  }

  ngOnInit(): void {

    this.loadContacts();
  }


  loadContacts() {
    this.firestore
      .collection('contacts')
      .valueChanges({ idField: 'docId' })
      .subscribe((changes: any) => {
        this.allContacts = changes;

        this.allContacts.forEach(contact => {
          if (contact.docId == this.contactServ.currentId) {

            this.currentContact = contact;
            console.log('Currenttttt: ', this.currentContact);

            this.inputName = this.currentContact.firstName + ' ' + this.currentContact.lastName;
            this.inputEmail = this.currentContact.email;
            this.inputPhone = this.checkPhoneNumber();
          }
        })
      });


  }


  checkPhoneNumber(): string {
    let phone: string = '';
    if (this.currentContact.phone === 'No phone number exists') {
    } else {
      phone = this.currentContact.phone;
    }

    return phone;
  }




  public createContactForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      this.fcontrol.name
    ], []),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(10)
    ], []),
    phone: new FormControl('', [
      this.fcontrol.phoneNumber,
    ])
  });


  createContact() {
    this.color = this.currentContact.color;
    let newContact = new Contact(this.inputName, this.inputEmail, this.inputPhone);
    newContact.color = this.color;
    this.updateContact(newContact);
  }

  updateContact(newContact: any) {
    // this.loading = true;
    this.firestore
      .collection('contacts')
      .doc(this.contactServ.currentId)
      .update(newContact.toJSON())
      .then(() => {
        // this.loading = false;
        // this.dialog.close();
        this.control.editContactDialogOpen = false
      });

  }

  // Verhindert das Schließen des inneren Div-Containers beim Klicken
  dontCloseByClick(event: Event) {
    event.stopPropagation();
  }

  checkErrors(field: string) {
    console.log(field + ': ', this.createContactForm.controls[field].errors);
  }


  closeDialog() {
    this.animationStatus = true;
    setTimeout(() => {
      this.control.editContactDialogOpen = false;
    }, 225);


  }

}


