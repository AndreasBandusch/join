import { Component, OnInit, OnDestroy } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit, OnDestroy {
constructor(public control: ControlService){}


ngOnInit(): void {
  this.control.inHelpSection = true;
}

ngOnDestroy(): void {
  this.control.inHelpSection = false;
}
}
