import { Component, OnInit  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { ControlService } from 'src/app/services/control.service';
import { CustomformcontrolModule } from 'src/app/modules/customformcontrol/customformcontrol.module';


@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit{
  inputName: string = '';
  inputEmail: string = '';
  inputPhone: string = '';
  currentContact: any = [];

  constructor(
    public control: ControlService,
    private firestore: AngularFirestore,
    private fcontrol: CustomformcontrolModule,
    public contactServ: ContactService) {
  }

  ngOnInit(): void {
       
  this.contactServ.contacts.forEach((contact) => {
    if (contact.id == this.contactServ.currentId) {
      
      this.currentContact = contact;

    
    }
  })
  this.inputName = this.currentContact.firstName + ' ' + this.currentContact.lastName;
  this.inputEmail = this.currentContact.email;
  this.inputPhone = this.checkPhoneNumber();
    
  }

  checkPhoneNumber() :string {
    let phone: string = ''
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
    
  }

  saveContact(newContact: any) {
    this.firestore
      .collection('contacts')
      .add(newContact.toJSON());
      this.control.addContactDialogOpen = false;
  }


  // Verhindert das Schließen des inneren Div-Containers beim Klicken
  public dontCloseByClick(event: Event) {
    event.stopPropagation();
  }

  checkErrors(field: string) {
    console.log(field + ': ', this.createContactForm.controls[field].errors);
  }
}


