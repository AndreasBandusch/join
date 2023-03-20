import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
    public control: ControlService) {
  }


  ngOnInit(): void {
    this.control.activeStart = this.location.path();
    this.setActiveStart();
  }


  // Sets the active start link
  setActiveStart(): void {
    switch (true) {
      case this.control.activeStart.includes('summary'):
        this.control.setActive('summary');
        break;
      case this.control.activeStart.includes('board'):
        this.control.setActive('board');
        break;
      case this.control.activeStart.includes('add-task'):
        this.control.setActive('addTask');
        break;
      case this.control.activeStart.includes('contact-list'):
        this.control.setActive('contacts');
        break;
      case this.control.activeStart.includes('imprint'):
        this.control.setActive('imprint');
        break;
      case this.control.activeStart.includes('privacy'):
        this.control.setActive('privacy');
        break;
      default:
        this.control.setActive('not');
        break;
    }
  }

  // navigate() {
  //   this.router.navigate(['/login']);
  // }

  // Sets the active link

}
