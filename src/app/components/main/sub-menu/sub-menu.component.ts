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
  constructor(
    public control: ControlService,
    public authServ: AuthService,
    private auth: AngularFireAuth,
    private router: Router) { }


  signOut(): void {
    this.control.firstSummaryCall = true;
    this.control.start = true;
    this.authServ.isLoggedIn = false;
    this.auth.signOut().then(() => {
      this.authServ.setDataToLocalStorage(false, '');
      this.router.navigate(['login']);
    });
  }
}
