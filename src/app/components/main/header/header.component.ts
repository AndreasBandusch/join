import { Component } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public control: ControlService){}
}
