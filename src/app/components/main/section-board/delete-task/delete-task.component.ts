import { Component } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent {
  constructor(public control: ControlService, public task: TaskService) {} 
}
