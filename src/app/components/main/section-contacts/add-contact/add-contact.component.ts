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
  newContactId:  string = '';
  currentContactId: number = 0;
  allContacts: any[] = [];
  animationStatus: boolean = false;


  constructor(
    public control: ControlService,
    private firestore: AngularFirestore,
    private fcontrol: CustomformcontrolModule,
    private contactServ: ContactService,
    private route: Router) {
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
    let newContact: Contact = new Contact(this.inputName, this.inputEmail, this.inputPhone);
    newContact.getRandomColor();
    this.saveContact(newContact);
  }

  saveContact(newContact: any) {
    this.currentContactId = newContact.id;
    this.firestore
      .collection('contacts')
      .add(newContact.toJSON());
      this.control.addContactDialogOpen = false;
      this.getNewContactId();
     
     
  }

  getNewContactId() {
    this.firestore.collection('contacts').valueChanges({ idField: 'docId' }).subscribe(changes => {
        this.allContacts = changes;

        this.allContacts.forEach(contact => {
          if (contact.id == this.currentContactId) {
            this.newContactId = contact.docId;
            console.log('Neue Doku-id ', this.newContactId);
            this.route.navigate(['kanban/contact-list/contact/' + this.newContactId]); 
          }
       })
    })

   
  }



  // Verhindert das Schließen des inneren Div-Containers beim Klicken
  public dontCloseByClick(event: Event) {
    event.stopPropagation();
  }

  checkErrors(field: string) {
    console.log(field + ': ', this.createContactForm.controls[field].errors);
  }

  closeDialog() {
    this.animationStatus = true;
    setTimeout(() => {
      this.control.addContactDialogOpen = false;
    }, 225);

   
  }
   
}


