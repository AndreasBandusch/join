import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
userName: string = '';
email: string = '';
password: string = '';




constructor(private auth: AngularFireAuth, private router: Router){}

         
  signUp() {
    this.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(res => {
             if (res.user) {           
                 res.user.updateProfile({ displayName: this.userName });
                 this.router.navigate(['/kanban/summary']);
             }
            console.log('User registriert');
        })
        .catch(error => {
            console.log('Something is wrong:', error.message);
        });
}
}
