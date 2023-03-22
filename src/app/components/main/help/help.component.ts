import { Component, OnInit, OnDestroy } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit, OnDestroy {
  currentPath: string = '';

  constructor(public control: ControlService, public location: Location) { }


  ngOnInit(): void {
    this.control.inHelpSection = true;
    this.location.ngOnDestroy();


  }

  ngOnDestroy(): void {
    this.control.inHelpSection = false;
  }

  
}
