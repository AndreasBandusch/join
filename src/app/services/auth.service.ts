import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser: any = {};
  isLoggedIn = false;
  guestLogin = false;
  displayName: string = '';

  

  constructor(private auth: AngularFireAuth, private router: Router) { }


  
}
