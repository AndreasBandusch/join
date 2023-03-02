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
  allCategorys: any[] = [];
  todoTasks: any[] = [];
  inProgressTasks: any[] = [];
  awaitingFeedbackTasks: any[] = [];
  doneTasks: any[] = [];
  test: number = 0;




  constructor(private afs: AngularFirestore) {

  }

  ngOnInit() {
    this.loadContacts();
    this.loadTasks();
    this.loadCategorys();
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


      this.loadAssignedContactsInAllTasks();


    })
  }


  loadCategorys() {
    this.afs.collection('categorys').valueChanges().subscribe(changes => {
      this.allCategorys = changes;
      this.loadAssignedCategoryInAllTasks();
    })

  }


  loadAssignedContactsInAllTasks() {
    for (let task of this.allTasks) {
      let contacts = [];
      for (let assignedToId of task.assignedTo) {
        let contact = this.allContacts.find(contact => contact.id == assignedToId);
        if (contact) {
          contacts.push(contact);
        }
      }
      task.assignedTo = contacts;
    }
  }


  loadAssignedCategoryInAllTasks() {
    for (let task of this.allTasks) {
      let category = this.allCategorys.find(cat => cat.id === task.category);
      if (category) {
        task.category = category;
      }
    }
    console.log('Alltasks: ', this.allTasks);
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


  getContactIntialsStyles(color: string, index: number): object {
    let styles = {
      'background-color': color,
      'transform': `translateX(${index * 75}%)`
    }
    return styles;
  }

  getDoneSubtasksNumber(subTasks: any[]): number {
    let number = 0;
    subTasks.forEach(task => {
      if (task.done === true) {
        number++;
      }
    })
    return number;
  }


  getPrioImage(prio: string): any {
    switch (prio) {
      case 'low':
        return 'add-task-low.png';

      case 'medium':
        return 'add-task-medium.png';
       
      case 'urgent':
        return 'add-task-urgent.png';
    }
  }
}
