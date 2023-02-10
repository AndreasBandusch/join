import { Component, OnInit, OnChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnChanges {
currentContact: any = [];

  constructor(public contactServ: ContactService, public route: ActivatedRoute, public control: ControlService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.contactServ.currentId = params['id'];

      
  this.contactServ.contacts.forEach((contact) => {
    if (contact.id == this.contactServ.currentId) {
      
      this.currentContact = contact;

     
      console.log('Current Contact:', this.currentContact);
    }
  })
  });
  

}

ngOnChanges(): void {
 

}
}