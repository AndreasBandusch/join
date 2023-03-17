import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  isSummaryActive: boolean = true;
  isBoardActive: boolean = false;
  isAddTaskActive: boolean = false;
  isContactsActive: boolean = false;
  isImpressActive: boolean = false;
  isPrivacyActive: boolean = false;
  activeStart: string = '';

  constructor(
    private router: Router,
    private location: Location) {
  }


  ngOnInit(): void {
    this.activeStart = this.location.path();
    this.setActiveStart();
  }


  // Sets the active start link
  setActiveStart() {
    switch (true) {
      case this.activeStart.includes('summary'):
        this.setActive('summary');
        break;
      case this.activeStart.includes('board'):
        this.setActive('board');
        break;
      case this.activeStart.includes('add-task'):
        this.setActive('addTask');
        break;
      case this.activeStart.includes('contact-list'):
        this.setActive('contacts');
        break;
      case this.activeStart.includes('impress'):
        this.setActive('impress');
        break;
      default:
        this.setActive('privacy');
        break;
    }
  }

  // navigate() {
  //   this.router.navigate(['/login']);
  // }

  // Sets the active link
  setActive(clickedLink: string): void {
    this.isSummaryActive = clickedLink === 'summary';
    this.isBoardActive = clickedLink === 'board';
    this.isAddTaskActive = clickedLink === 'addTask';
    this.isContactsActive = clickedLink === 'contacts';
    this.isImpressActive = clickedLink === 'impress';
    this.isPrivacyActive = clickedLink === 'privacy';
  }
}
