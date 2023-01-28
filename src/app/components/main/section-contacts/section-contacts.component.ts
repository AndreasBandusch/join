import { Component } from '@angular/core';

@Component({
  selector: 'app-section-contacts',
  templateUrl: './section-contacts.component.html',
  styleUrls: ['./section-contacts.component.scss']
})
export class SectionContactsComponent {
isAntonActive = false;

setActive(clickedContact: string) {
  this.isAntonActive = clickedContact === 'anton';
}
}
