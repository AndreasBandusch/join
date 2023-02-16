import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  currentId: string = '';
  contactsAvailable: boolean = false;
  currentContact: number = 0;
  constructor() { }
}
