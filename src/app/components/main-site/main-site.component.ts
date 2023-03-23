import { Component } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.scss']
})
export class MainSiteComponent {

  constructor(public control: ControlService) { }
}
