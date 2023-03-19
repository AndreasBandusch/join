import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-section-summary',
  templateUrl: './section-summary.component.html',
  styleUrls: ['./section-summary.component.scss']
})
export class SectionSummaryComponent implements OnInit {
  tasks: any[] = [];
  taskInBoard: number = 0;
  taskInProgress: number = 0;
  awaitingFeedback: number = 0;
  urgent: number = 0;
  todo: number = 0;
  done: number = 0;
  dueDate: number = 0;
  dueDateOutput: string = 'No tasks available';

  constructor(
    private afs: AngularFirestore,
    public control: ControlService) { }


  ngOnInit() {
    this.afs.collection('tasks').valueChanges().subscribe(changes => {
      this.tasks = changes;
      this.getSummaryContent();
    });
    this.showWelcomeForMobile(); 
  }


  showWelcomeForMobile() {
    this.control.start = true;
    if (this.control.firstSummaryCall) {
      setTimeout(() => {
        this.control.start = false;
        this.control.firstSummaryCall = false;
      }, 3000);
    }
  }


  getSummaryContent() {
    this.unsetSummaryNumbers();
    this.taskInBoard = this.tasks.length;
    this.tasks.forEach(task => {
      this.getNumberOfUrgentTasks(task);
      this.setNumbersOfTaskStatus(task.status);
      this.getDueDate(task.dueDate);
      this.setDueDateOutput();
    });
  }


  unsetSummaryNumbers() {
    this.urgent = 0;
    this.todo = 0;
    this.taskInProgress = 0;
    this.done = 0;
    this.awaitingFeedback = 0;
    this.dueDate = 0;
  }


  getNumberOfUrgentTasks(currentTask: any): void {
    if (currentTask.prio === 'urgent') {
      this.urgent++;
    }
  }


  setNumbersOfTaskStatus(taskStatus: any): void {
    switch (taskStatus) {
      case 'todo':
        this.todo++;
        break;
      case 'inProgress':
        this.taskInProgress++
        break;
      case 'awaitingFeedback':
        this.awaitingFeedback++;
        break;
      case 'done':
        this.done++;
        break;
    }
  }


  getDueDate(currentDate: number): void {
    if (this.dueDate === 0 || (currentDate < this.dueDate)) {
      this.dueDate = currentDate;
    }
  }


  setDueDateOutput() {
    let date = new Date(this.dueDate);
    this.dueDateOutput = date.toLocaleString('en-EN', { month: 'long' })
      + ' ' + date.toLocaleString('en-US', { day: '2-digit' }) + ', '
      + date.getFullYear();
  }
}


