import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  dueDate: number;
  dueDateOutput: string = '';

  constructor(public control: ControlService) {
    this.dueDate = control.currentTask.dueDate;
  }



  ngOnInit(): void {
    console.log(this.control.currentTask);
    this.setDueDateOutput();
  }


  setDueDateOutput() {
    let date = new Date(this.dueDate);
    this.dueDateOutput = date.toLocaleString('en-US', { day: '2-digit' })
      + '-' + date.toLocaleString('en-EN', { month: '2-digit' })
      + '-' + date.getFullYear();
  }

}
