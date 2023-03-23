import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggedInUser: any = {};
  isLoggedIn = false;
  initials: string = '';

  constructor() { }


  setDataToLocalStorage(loggendIn: boolean, displayName: string): void {
    const user = { login: loggendIn, displayName: displayName };
    const jsonString = JSON.stringify(user);
    localStorage.setItem('user', jsonString);
    this.isLoggedIn = true;
  }


  getLogin(): boolean{
    const myObj = this.loadDataFormLocaleStorage();
    return myObj.login;
  }


  loadDataFormLocaleStorage(): any {
    const data = localStorage.getItem('user');
    const myObj = JSON.parse(data!);
    return myObj;
  }


  getInitals(): string {
    let displayName = this.getDisplayName();
    let initials;
    let splitedDisplayName = displayName.split(' ');;
    initials = splitedDisplayName[0].charAt(0).toLocaleUpperCase() +
      splitedDisplayName[1].charAt(0).toLocaleUpperCase();
    return initials;
  }


  getDisplayName(): string {
    const data = this.loadDataFormLocaleStorage();
    const displayName = data.displayName;
    return displayName;
  }
}


