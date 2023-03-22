import { Component } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent {
animationStatus: boolean = false;

constructor(public control: ControlService) {}

  closeDialog() {
     this.animationStatus = true;
     setTimeout(() => {
      this.control.openOverlay('addTask', false)
     }, 225);
  }
}
