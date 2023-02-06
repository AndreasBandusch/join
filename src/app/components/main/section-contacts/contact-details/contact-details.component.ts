import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnChanges {
currentId: string = '';
currentContact: any = [];

  constructor(public contactServ: ContactService, public route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentId = params['id'];

      
  this.contactServ.contacts.forEach((contact) => {
    if (contact.id == this.currentId) {
      
      this.currentContact = contact;

     
      console.log('Current Contact:', this.currentContact);
    }
  })
  });
  

}

ngOnChanges(): void {
 

}
}