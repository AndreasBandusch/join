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
  todoTasks: any[] = [];
  inProgressTasks: any[] = [];
  awaitingFeedbackTasks: any[] = [];
  doneTasks: any[] = [];


  constructor(private afs: AngularFirestore) {

  }

  ngOnInit() {
    this.loadContacts();
    this.loadTasks();
    
  }

  testMe() {
    

    for (let task of this.allTasks) {
      let contacts = [];
      for (let assignedToId of task.assignedTo) {
        let contact = this.allContacts.find(contact => contact.id == assignedToId);
        if (contact) {
          contacts.push(contact.initials);
        }
      }
      task.contacts = contacts;
      
    }

   
    
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

      this.testMe();
    })
  }

  seperateStatus() {
    this.allTasks.forEach(task => {
      switch (task.status) {
        case 'todo':
          this.todoTasks.push(task);
          break;

        case 'inProgress':
          this.inProgressTasks.push(task);
          break;

        case 'awaitingFeedback':
          this.awaitingFeedbackTasks.push(task);
          break;

        case 'done':
          this.doneTasks.push(task);
          break;
      }
    })

    console.log('Todo: ', this.todoTasks);
    console.log('In progress: ', this.inProgressTasks);
    console.log('Awaiting Feedback: ', this.awaitingFeedbackTasks);
    console.log('Done: ', this.doneTasks);
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
