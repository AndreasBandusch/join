import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contact } from 'src/app/models/contact.model';
import { ControlService } from 'src/app/services/control.service';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {
  inputName: string = '';
  inputEmail: string = '';
  inputPhone: string = '';

  constructor(public control: ControlService, private firestore: AngularFirestore) {
  }


  createContact() {
    this.control.addContactDialogOpen = false;
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
