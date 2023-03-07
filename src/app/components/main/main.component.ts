import { Component, HostListener, OnInit } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
constructor(public control: ControlService) {

}


@HostListener('window:resize')
  onResize() {
    this.checkMaxWidth(920);
  }

  ngOnInit(): void {
    this.checkMaxWidth(920);
  }


  checkMaxWidth(maxWidth: number) {
    if (window.innerWidth <= maxWidth) {
      this.control.setHeaderZIndex = true;
    } else {
      this.control.setHeaderZIndex =  false;
    }
  }
}
