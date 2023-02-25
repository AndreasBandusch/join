import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-section-summary',
  templateUrl: './section-summary.component.html',
  styleUrls: ['./section-summary.component.scss']
})
export class SectionSummaryComponent implements OnInit {
  allTasks: any[] = [];
  taskInBoard: number = 0;
  taskInProgress: number = 0;
  awaitingFeedback: number = 0;
  urgent: number = 0;
  todo: number = 0;
  done: number = 0;

  constructor(private afs: AngularFirestore) { }


  ngOnInit() {
    this.afs.collection('tasks').valueChanges().subscribe(changes => {
      this.allTasks = changes;
      this.getSummaryNumbers();
    });


  }


  getSummaryNumbers() {
    this.unsetSummaryNumbers();
    this.taskInBoard = this.allTasks.length;
    this.allTasks.forEach(task => {
      this.getNumberOfUrgentTasks(task);
      this.getNumbersOfTaskStatus(task.status);
    });
  }


  unsetSummaryNumbers() {
    this.urgent = 0;
    this.todo = 0;
    this.taskInProgress = 0;
    this.done = 0;
    this.awaitingFeedback = 0;
  }


  getNumberOfUrgentTasks(currentTask: any): void {
    if (currentTask.prio === 'urgent') {
      this.urgent++;
    }
  }


  getNumbersOfTaskStatus(taskStatus: any): void {
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
}


