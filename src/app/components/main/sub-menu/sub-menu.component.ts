import { Component } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent {
  constructor(public control: ControlService, public authServ: AuthService, private auth: AngularFireAuth, private router: Router) {

  }

  async signOut() {
    return this.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
