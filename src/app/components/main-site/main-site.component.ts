import { Component, OnInit } from '@angular/core';
import { OpendialogService } from 'src/app/services/opendialog.service';
@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.scss']
})
export class MainSiteComponent implements OnInit {
  

  constructor(public openDialog: OpendialogService) {
   
  }

  ngOnInit(): void {
   
  }
}
