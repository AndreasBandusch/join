import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


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

 firstNames: any[] = [];
 lastNames: any[] = [];
 fullNames: any[] = [];




constructor(public firestore: AngularFirestore) {
 
}




ngOnInit() {


  this.firestore.collection('contacts').valueChanges().subscribe((test: any) => {
    this.contacts = test;


    this.contacts.forEach(contact => {
      this.firstNames.push(contact.firstName)
    })
   

    this.contacts.forEach(contact => {
      this.lastNames.push(contact.lastName)
    })



   
    console.log(this.catagoryInitials);

    this.contacts.forEach(contact => {
      this.fullNames.push(contact.firstName + '' + contact.lastName)
    })
   
    this.getCatagoryInitials();
    this.createInitals();
    
    
    console.log('initals: ', this.initals);
    console.log('catagoryInitials: ', this.catagoryInitials);
    console.log(this.contacts);

  })

}

getCatagoryInitials() {
  this.firstNames.forEach(firstName => {
    let initial = firstName[0];
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

  if (isActiveContact) {
    this.setActive('anton');
  }
}

  createInitals() {
   for (let i = 0; i < this.catagoryInitials.length; i++) {
     this.initals.push(this.catagoryInitials[i] + ' ' + this.lastNames[i].charAt(0))
     }
   }
}
