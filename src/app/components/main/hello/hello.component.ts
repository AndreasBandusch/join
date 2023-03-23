import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {
  greeting: string = '';

  constructor(public authServ: AuthService) {}


  ngOnInit(): void {
    this.getGreeting();
  }


  getGreeting() {
    let now = new Date();
    let hour = now.getHours();
    if (hour >= 5 && hour < 11) {
      this.greeting = "Good Morning";
    } else if (hour >= 11 && hour < 18) {
      this.greeting = "Good Day";
    } else {
      this.greeting = "Good Evening";
    }
  }
}
