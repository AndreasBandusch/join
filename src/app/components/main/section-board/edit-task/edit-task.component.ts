import { Component } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {

  constructor(public control: ControlService){}
}
