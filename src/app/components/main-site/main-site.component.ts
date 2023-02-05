import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.scss']
})
export class MainSiteComponent implements OnInit {
  

  constructor(public control: ControlService) {
   
  }

  ngOnInit(): void {
   
  }
}
