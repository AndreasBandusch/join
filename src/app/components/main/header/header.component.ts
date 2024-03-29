import { Component } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  constructor(
    public control: ControlService,
    public task: TaskService,
    public authServ: AuthService,
    public auth: AuthService) {
  }

  
  toggleSubMenu(): void {
    this.control.showSubMenu = !this.control.showSubMenu;

  }
}
