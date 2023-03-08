import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { TaskService } from 'src/app/services/task.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  allContacts: any[] = [];
  assignedTotext = 'Select Contacts to assign';

  constructor(private afs: AngularFirestore, public control: ControlService, public task: TaskService) { }

  ngOnInit(): void {
    this.loadContacts();
  }


  loadContacts() {
    this.afs.collection('contacts').valueChanges().subscribe((changes) => {
      this.allContacts = changes;
    });
  }

  updateSelectedContacts() {
    this.task.assignedContactIdsForTask = [];
    for (let key in this.task.selectedContacts) {
      if (this.task.selectedContacts[key]) {
        this.task.assignedContactIdsForTask.push(key);
      }
    }
  }

  addContact() {
    this.control.notRouteToContactList = true;
    this.control.addContactDialogOpen = true
  }
}
