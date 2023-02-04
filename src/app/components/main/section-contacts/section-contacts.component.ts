import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contact } from 'src/app/models/contact.model';
import { OpendialogService } from 'src/app/services/opendialog.service';



@Component({
  selector: 'app-section-contacts',
  templateUrl: './section-contacts.component.html',
  styleUrls: ['./section-contacts.component.scss']
})
export class SectionContactsComponent implements OnInit {
  
  isAntonActive = false;
  test: boolean = false;
  currentColor: number = 0;
  colors: string[] = [
    '#FF7A00', '#9327FF', '#29ABE2', '#FC71FF', '#02CF2F', '#AF1616', '#462F8A'];


  catagoryInitials: string[] = [];
  initialsLastNames: string[] = [];
  initals: any[] = [];
  contacts: any[] = [];
  currentContact: string = '';





  constructor(public firestore: AngularFirestore, public openDialog: OpendialogService) {}




  ngOnInit() {

    this.firestore.collection('contacts').valueChanges().subscribe((updates: any) => {
      this.contacts = updates;

      this.getCatagoryInitials();
      console.log(this.catagoryInitials);
      console.log('contacts', this.contacts);
      console.log('colors', this.colors);
    })


  }



  getCatagoryInitials() {
    this.catagoryInitials = [];
    this.contacts.forEach(contact => {
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
    this.openDialog.addContactDialogOpen = true;
   
  }

  saveContact() {
    let newContact: Contact = new Contact('Andreas', 'Bandusch', 'bandusch@web.de');
    // this.firestore
    //    .collection('contacts')
    //    .add(newContact.toJSON());

    console.log(newContact);
    console.log(newContact.id);

  }

}

