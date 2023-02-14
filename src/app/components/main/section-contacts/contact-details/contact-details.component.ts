import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { ControlService } from 'src/app/services/control.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
currentContact: any = {};
contactId: string = '';
  constructor(public contactServ: ContactService, public route: ActivatedRoute, public control: ControlService, private afs: AngularFirestore) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.contactId = params['id']; 
      console.log('Contact-Id: ', this.contactId);
      this.getCurrentContact();
      this.contactServ.currentId = this.contactId;
    });
  }

  getCurrentContact() {
    this.afs
      .collection('contacts')
      .doc(this.contactId)
      .valueChanges()
      .subscribe((contact: any) => {
        this.currentContact = contact;
        console.log('Current contact: ', this.currentContact);
      });

      
  }

  }   

