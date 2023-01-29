import { Component, OnInit } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { db } from '../../../database';

@Component({
  selector: 'app-section-contacts',
  templateUrl: './section-contacts.component.html',
  styleUrls: ['./section-contacts.component.scss']
})
export class SectionContactsComponent implements OnInit {
  isAntonActive = false;
  currentColor: number = 0;
  colors: string[] = [
    '#FF7A00', '#9327FF', '#29ABE2', '#FC71FF', '#02CF2F', '#AF1616', '#462F8A'];

  db = db;
  initialsFirstnames: string[] = [];


  firstNames: string[] = db.map(function (db) {
    return db.firstName;
  });

  lastNames: string[] = db.map(function (db) {
    return db.lastName;
  });

  fullNames: string[] = db.map(function (db) {
    return db.firstName + ' ' + db.lastName;
  });


  ngOnInit() {
    this.firstNames.forEach(firstName => {
      let initial = firstName[0];
      if (!this.initialsFirstnames.includes(initial)) {
        this.initialsFirstnames.push(initial);
        this.initialsFirstnames.sort();
      }
    });

    console.log(this.colors.length);
    console.log(this.currentColor);
  }

  setActive(clickedContact: string) {
    this.isAntonActive = clickedContact === 'anton';
  }

  getFirstLetter(currentContact: string) {
    return currentContact.charAt(0);
  }

  setBgColor(): string {
    let color: string;
   
    if (this.currentColor > this.colors.length) {
      this.currentColor = 0;
      color = this.colors[this.currentColor];
    } else {
      color = this.colors[this.currentColor];
      
    }
    console.log('Current Color: ', this.currentColor);
    this.currentColor ++;
     return color;
  }
}
