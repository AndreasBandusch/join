import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CustomformcontrolModule } from 'src/app/modules/customformcontrol/customformcontrol.module';
import { ControlService } from 'src/app/services/control.service';


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


  constructor(private auth: AngularFireAuth, private router: Router, public fControl: CustomformcontrolModule, private control: ControlService) { }

  ngOnInit(): void {
    this.fControl.userSignUp.reset();
  }

  signUp() {
    this.auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(res => {
        if (res.user) {
          res.user.updateProfile({ displayName: this.userName });
          this.control.getMessage('Sign up successful!');

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        }
      })
      .catch(error => {
        console.log('my error', error.message);
        if(error.message.includes('email address is already in use')) {
          this.userAlreadyExists = true;
        }
      });
  }
}
