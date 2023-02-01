import { Component, OnInit } from '@angular/core';
import { db } from '../../../database';

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

  db = db;
  catagoryInitials: string[] = [];
  initialsLastNames: string[] = [];
  initals: string[] = [];


  firstNames: string[] = this.db.map(function (db) {
    return db.firstName;
  });

  lastNames: string[] = this.db.map(function (db) {
    return db.lastName;
  });

  fullNames: string[] = this.db.map(function (db) {
    return db.firstName + ' ' + db.lastName;
  });




  ngOnInit() {
    this.getCatagoryInitials();
    console.log(this.catagoryInitials);
    

   
   
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
    this.test = true;
  }

  getFirstLetter(currentContact: string) {
    return currentContact.charAt(0);
  }

  closeDetails() {
    this.test = false;
  }

  // createInitals() {
  //   for (let i = 0; i < this.initialsFirstames.length; i++) {
  //     this.initals.push(this.initialsFirstnames[i] + ' ' + this.lastNames[i].charAt(0))
  //   }
  // }
}
