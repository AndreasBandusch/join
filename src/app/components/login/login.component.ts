import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
                       
  constructor(private auth: AngularFireAuth, private router: Router, public fControl: CustomformcontrolModule) {}

  ngOnInit(): void {
    this.fControl.userLogin.reset();
  }

userLogin() {
  this.noUserFound = false;
  this.wrongPassword = false;

  this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(res => {
          this.router.navigate(['/kanban']);
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
    this.router.navigate(['/kanban']);
  }).catch(err => {
    console.log(err.message);
  })
}
 
}
