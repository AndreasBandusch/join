import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-section-board',
  templateUrl: './section-board.component.html',
  styleUrls: ['./section-board.component.scss']
})
export class SectionBoardComponent implements OnInit {
  allContacts: any[] = [];
  allTasks: any[] = [];
  allTodos: any[] = [];
  allInProgress: any[] = [];
  allAwaitingFeedback: any[] = [];
  allDone: any[] = [];

  constructor(private afs: AngularFirestore) {

  }

  ngOnInit() {
    this.loadContacts();
    this.loadTasks();
  }


  loadContacts() {
    this.afs.collection('contacts').valueChanges().subscribe(changes => {
      this.allContacts = changes;
    })
  }


  loadTasks() {
    this.afs.collection('tasks').valueChanges().subscribe(changes => {
      this.allTasks = changes;
      this.seperateStatus();
    })
  }

  seperateStatus() {
    this.allTasks.forEach(task => {
      switch (task.status) {
        case 'todo':
          this.allTodos.push(task);
          break;

        case 'inProgress':
          this.allInProgress.push(task);
          break;

          case 'awaitingFeedback':
          this.allAwaitingFeedback.push(task);
          break;

          case 'done':
          this.allDone.push(task);
          break;
      }
    })

    // console.log('Todo: ', this.todo);
    // console.log('In progress: ', this.inProgress);
    // console.log('Awaiting Feedback: ', this.awaitingFeedback);
    // console.log('Done: ', this.done);
  }







  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
