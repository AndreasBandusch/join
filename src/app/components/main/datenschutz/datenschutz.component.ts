import { Component } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-datenschutz',
  templateUrl: './datenschutz.component.html',
  styleUrls: ['./datenschutz.component.scss']
})
export class DatenschutzComponent {
constructor(public control: ControlService){}
}
