import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent {
  constructor(private router: Router) { }

  isSummaryActive = true;
  isBoardActive = false;
  isAddTaskActive = false;
  isContactsActive = false;
  isImpressActive = false;
  isPrivacyActive = false

  navigate() {
    this.router.navigate(['/login']);
  }


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
