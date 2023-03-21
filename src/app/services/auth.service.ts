import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser: any = {};
  isLoggedIn = false;
  // displayName: string = '';
  initials: string = '';




  constructor(private auth: AngularFireAuth, private router: Router) {
  }

  setDataToLocalStorage(loggendIn: boolean, displayName: string) {
    const user = { login: loggendIn, displayName: displayName };
    const jsonString = JSON.stringify(user);
    localStorage.setItem('user', jsonString);
    this.isLoggedIn = true;
  }

  getLogin() {
    const myObj = this.loadDataFormLocaleStorage();
    return myObj.login;
  }

  loadDataFormLocaleStorage() {
    const data = localStorage.getItem('user');
    const myObj = JSON.parse(data!);
    return myObj;
  }



  getInitals() {
    const displayName = this.getDisplayName();
    let initials;
    displayName.split(' ');
    initials = displayName[0].charAt(0).toLocaleUpperCase() +
      displayName[1].charAt(0).toLocaleUpperCase();
      console.log(displayName[0])
      console.log(displayName[1])
      return initials;
  }

  getDisplayName() {
    const data = this.loadDataFormLocaleStorage();
    const displayName = data.displayName;
    return displayName;
  }


}


