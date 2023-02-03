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




constructor(public firestore: AngularFirestore) {
 
}




ngOnInit() {

  this.firestore.collection('contacts').valueChanges().subscribe((updates: any) => {
    this.contacts = updates;
    
    this.getCatagoryInitials();
    console.log(this.catagoryInitials);
    console.log('All contatcts', this.contacts);
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

  if (isActiveContact) {
    this.setActive('anton');
  }
}

}

