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
  InputName: string = '';
  InputEmail: string = '';
  InputPhone: string = '';

  constructor(public control: ControlService, private firestore: AngularFirestore)  {
  }
 

  createContact() {
    // let newContact: Contact = new Contact(this.InputName, 'Bandusch', 'bandusch@web.de');
    let fullName = this.InputName.trim().replace(/\s+/g, ' ').split(" ");
    let firstName = fullName[0];
    let lastName = fullName[1];

    
    console.log(firstName);
    console.log(lastName);
   
    this.control.addContactDialogOpen = false;

    let newContact: Contact = new Contact(firstName, lastName, this.InputEmail, this.InputPhone);

    this.saveContact(newContact);
  }

  saveContact(newContact :any) {
    this.firestore
    .collection('contacts')
    .add(newContact.toJSON());
  }
   


  // Verhindert das Schließen des inneren Div-Containers beim Klicken
  public dontCloseByClick(event: Event) {
    event.stopPropagation();
  }
}
