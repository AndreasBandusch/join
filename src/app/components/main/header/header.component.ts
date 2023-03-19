import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  displayName: string = '';
  
  constructor (
    public control: ControlService, 
    public task: TaskService, 
    private authServ: AuthService){
  }

  ngOnInit(): void {
    this.setDisplayName();
  }

  setDisplayName() {
    if (this.authServ.guestLogin) {
      this.displayName = 'Guest User';
    } else {
      this.displayName = this.authServ.loggedInUser.user._delegate.displayName;
    }
  }

  toggleSubMenu() {
    this.control.showSubMenu = !this.control.showSubMenu;
  }
}
