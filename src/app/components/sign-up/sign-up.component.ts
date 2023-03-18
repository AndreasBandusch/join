import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CustomformcontrolModule } from 'src/app/modules/customformcontrol/customformcontrol.module';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userName: string = '';
  email: string = '';
  password: string = '';
  userAlreadyExists: boolean = false;


  constructor(private auth: AngularFireAuth, private router: Router, public fControl: CustomformcontrolModule) { }

  ngOnInit(): void {
    this.fControl.createUserForm.reset();
  }

  signUp() {
    this.auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(res => {
        if (res.user) {
          res.user.updateProfile({ displayName: this.userName });
          this.router.navigate(['/login']);
        }
        console.log('User registriert');
      })
      .catch(error => {
        console.log('my error', error.message);
        if(error.message.includes('email address is already in use')) {
          this.userAlreadyExists = true;
        }
      });
  }
}
