import { Component } from '@angular/core';
import { OpendialogService } from 'src/app/services/opendialog.service';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {


  constructor(public openDialog: OpendialogService)  {

  }



   
  // Verhindert das Schließen des inneren Containers beim Klicken
  public dontCloseByClick(event: Event) {
    event.stopPropagation();
  }
}
