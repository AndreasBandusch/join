import { Component} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { Contact } from 'src/app/models/contact.model';
import { ControlService } from 'src/app/services/control.service';


export function phoneNumber(c: AbstractControl) {
  const telephonePattern = /[0-9\+\-\ ]/;
  return telephonePattern.test(c.value) ? null : { invalidTelephone: true };
}

export function name(c: AbstractControl) {
  const namePattern = /^ *[A-Za-z]{2,} *( +[A-Za-z]{2,})* *$/;
  return namePattern.test(c.value) ? null : { invalidName: true };
}

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})



export class AddContactComponent {
  inputName: string = '';
  inputEmail: string = '';
  inputPhone: string = '';
 
  public createContactForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      name
    ], []),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(10)
    ], []),
    phone: new FormControl('', [
      phoneNumber,
      Validators.minLength(10)
    ])
  });
 

  constructor(public control: ControlService, private firestore: AngularFirestore) {
    this.createContactForm.valueChanges.subscribe(console.log)
  }


  createContact() {
    // this.control.addContactDialogOpen = false;
    let newContact: Contact = new Contact(this.inputName, this.inputEmail, this.inputPhone);
    this.saveContact(newContact);
  }

  saveContact(newContact: any) {
    this.firestore
      .collection('contacts')
      .add(newContact.toJSON());
  }


  // Verhindert das Schließen des inneren Div-Containers beim Klicken
  public dontCloseByClick(event: Event) {
    event.stopPropagation();
  }

  
  
}


