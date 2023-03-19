import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CustomformcontrolModule } from 'src/app/modules/customformcontrol/customformcontrol.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  noUserFound = false;
  wrongPassword = false;


  constructor(private auth: AngularFireAuth, private router: Router, public fControl: CustomformcontrolModule, private authServ: AuthService) { }

  ngOnInit(): void {
    this.fControl.userLogin.reset();
  }

  userLogin() {
    this.noUserFound = false;
    this.wrongPassword = false;

    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(res => {
        this.authServ.loggedInUser = res;
        this.authServ.isLoggedIn = true;
        this.authServ.guestLogin = false;
        this.setDisplayName();
        this.getInitials();
        this.router.navigate(['kanban']);
      })
      .catch(error => {
        if (error.message.includes('no user record corresponding')) {
          this.noUserFound = true;
        }

        else if (error.message.includes('password is invalid')) {
          this.wrongPassword = true;
        }
      });

  }


  guestLogin() {
    this.auth.signInAnonymously()
      .then(() => {
        this.authServ.isLoggedIn = true;
        this.authServ.guestLogin = true;
        this.router.navigate(['/kanban']);
        this.setDisplayName();
        this.getInitials();
      }).catch(err => {
        console.log(err.message);
      })

  }

  setDisplayName(): void {
    if (this.authServ.guestLogin === true) {
      this.authServ.displayName = 'Guest User';
    } else {
      this.authServ.displayName = this.authServ.loggedInUser.user._delegate.displayName;
    }

    console.log(this.authServ.displayName);
  }

  getInitials(): void {
    let displayName = this.authServ.displayName.split(' ');
    this.authServ.initials = displayName[0].charAt(0).toLocaleUpperCase() + 
    displayName[1].charAt(0).toLocaleUpperCase();
  }
}
