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

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    public fControl: CustomformcontrolModule,
    private authServ: AuthService) { }


  ngOnInit(): void {
    this.fControl.userLogin.reset();
  }


  userLogin(): void {
    this.noUserFound = false;
    this.wrongPassword = false;
    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(res => {
        this.loginIsSuccessful(res)
      })
      .catch(error => {
        this.showLoginError(error)
      });
  }


  loginIsSuccessful(res: any): void {
    this.authServ.loggedInUser = res;
    const displayName = this.authServ.loggedInUser.user._delegate.displayName;
    this.authServ.setDataToLocalStorage(true, displayName);
    this.router.navigate(['kanban']);
    this.authServ.getInitals();
  }


  showLoginError(error: any): void {
    if (error.message.includes('no user record corresponding')) {
      this.noUserFound = true;
    }
    else if (error.message.includes('password is invalid')) {
      this.wrongPassword = true;
    }
  }


  guestLogin(): void {
    this.auth.signInAnonymously()
      .then(res => {
        this.authServ.loggedInUser = res;
        this.authServ.setDataToLocalStorage(true, 'Guest User');
        this.router.navigate(['/kanban']);
        this.authServ.getInitals();
      }).catch(err => {
        console.log(err.message);
      })
  }
}




