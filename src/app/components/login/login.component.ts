import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  noUserFound = false;
  wrongPassword = false;
                       ;
  constructor(private auth: AngularFireAuth, private router: Router) {}


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
    console.log('Hello Guest!')
    this.router.navigate(['/kanban']);
  }).catch(err => {
    console.log(err.message);
    
  })
}
 
}
