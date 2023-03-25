import { Component } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-feedback-message',
  templateUrl: './feedback-message.component.html',
  styleUrls: ['./feedback-message.component.scss']
})
export class FeedbackMessageComponent {

  constructor(public control: ControlService) { }
}
