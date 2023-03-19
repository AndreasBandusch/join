import { Component } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
constructor(public control: ControlService) {}

}
