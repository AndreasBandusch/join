import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
slideIn: boolean = true;

  constructor( 
    public route: ActivatedRoute, 
    public control: ControlService, 
    private afs: AngularFirestore) { }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.contactId = params['id']; 
      this.getCurrentContact();
      this.control.currentId = this.contactId;
      this.toggleAnimationClass();
    });
  }


  toggleAnimationClass(): void {
    this.slideIn = true;
    setTimeout(() => {
      this.slideIn = false
    }, 250);
  }


  getCurrentContact(): void {
    this.afs
      .collection('contacts')
      .doc(this.contactId)
      .valueChanges()
      .subscribe((contact: any) => {
        this.currentContact = contact;
      });   
    }
  }

    

