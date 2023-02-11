import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: any[] = [];
  currentId: number = 0;

  constructor() { }
}
