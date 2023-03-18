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
          this.router.navigate(['/kanban/summary']);
        }
        console.log('User registriert');
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }
}
