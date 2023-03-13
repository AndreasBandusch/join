import { Component, HostListener, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { TaskService } from 'src/app/services/task.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from 'src/app/models/category.model';
import { CustomformcontrolModule } from 'src/app/modules/customformcontrol/customformcontrol.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-section-add-task',
  templateUrl: './section-add-task.component.html',
  styleUrls: ['./section-add-task.component.scss']
})
export class SectionAddTaskComponent implements OnInit, OnDestroy {

  @ViewChild('addSubtask') inputField: ElementRef = new ElementRef(null);
  id: number = 0;
  assignedTo: number[] = [];
  showNewCategory: boolean = false;
  allCategorys: any[] = [];
  allContacts: any[] = [];
  assignedTotext = 'Select Contacts to assign'
  currentSubtask: string = '';
  categoryName: string = '';
  catColors: string[] = ['#8fa6fc', '#e83400', '#6bce33', '#ee8f11', '#cd37b9', '#0e45fa'];
  newCategory: Category = new Category(this.categoryName);



  @HostListener('window:resize')
  onResize() {
    this.checkMaxWidth(1100);
  }

  constructor(
    public control: ControlService,
    public task: TaskService,
    private afs: AngularFirestore,
    public fControl: CustomformcontrolModule
  ) { }


  public createTask: FormGroup = new FormGroup({

  });


  ngOnInit(): void {
    this.task.resetForm();
    // this.task.dueDate = '';
    // this.task.catText = this.task.catStartText;
    this.checkMaxWidth(1100);
    this.loadCategorys();
    this.loadContacts();
    // this.task.activePrio = '';
    // this.task.showAssignedTo = false;
    // this.task.showCategorys = false;
    // this.task.selectedContacts = {};
    // this.task.selectedCategory = '';
  }


  ngOnDestroy(): void {
    this.control.showAddTaskBotton = false;
    this.fControl.prioErrorMessage = '';
    this.fControl.noAssignedConactErrorMessage = '';
  }

  loadCategorys() {
    this.afs.collection('categorys').valueChanges().subscribe((changes) => {
      this.allCategorys = changes;
    });
  }

  loadContacts() {
    this.afs.collection('contacts').valueChanges().subscribe((changes) => {
      this.allContacts = changes;
    });
  }


  checkMaxWidth(maxWidth: number) {
    if (window.innerWidth <= maxWidth) {
      this.control.showAddTaskBotton = true;
    } else {
      this.control.showAddTaskBotton = false;
    }
  }


  inputView() {
    console.log(this.categoryName);
  }


  selectCategory(category: string, color: string, id: number) {
    this.task.selectedCategory = category;
    this.task.catText = category;
    this.task.catColor = color;
    this.task.showCategorys = false;
    this.task.categoryId = id;
    this.fControl.noCategoryErrorMessage = '';
  }


  createCategory() {
    this.showNewCategory = true;
    this.categoryName = '';
    this.task.catColor = '';
  }


  saveCategory() {
    this.newCategory = new Category(this.categoryName, this.task.catColor);
    this.task.categoryId = this.newCategory.id;
    this.afs
      .collection('categorys')
      .add(
        this.newCategory.toJson()
      ).then(() => {
        this.task.catColor = this.newCategory.color;
        this.task.catText = this.categoryName;
        this.task.showCategorys = !this.task.showCategorys;
        this.showNewCategory = false;
        this.task.selectedCategory = this.categoryName;
      });

  }

  cancel() {
    this.task.showCategorys = !this.task.showCategorys;
    this.showNewCategory = false;
    this.task.catColor = '';
    this.task.catText = this.task.catStartText;
    this.task.catColor = '';
    this.categoryName = '';
  }

  updateSelectedContacts() {
    this.task.assignedContactIdsForTask = [];
    for (let key in this.task.selectedContacts) {
      if (this.task.selectedContacts[key]) {
        this.task.assignedContactIdsForTask.push(key);
      }
    }
  }

  updateAssignedSubtasks() {
    this.task.assignedSubtasks = [];
    for (let key in this.task.selectedSubtasks) {
      if (this.task.selectedSubtasks[key] && !this.task.assignedContactIdsForTask.includes(key)) {
        this.task.assignedSubtasks.push({ name: key, done: false });
      }
    }
  }



  setFocus() {
    this.inputField.nativeElement.focus();
    this.task.showSubtask = true;
  }


  createSubtask() {
    this.task.allSubtasks.push({ name: this.currentSubtask });
    console.log('All subtasks: ', this.task.allSubtasks);
    this.currentSubtask = '';
    this.task.showSubtask = false;
  }


  getTimestamp() {
    this.task.dueDateTimestamp = new Date(this.task.dueDate).getTime();
  }

  addContact() {
    this.control.notRouteToContactList = true;
    this.control.addContactDialogOpen = true
  }

  checkForm() {
    this.checkIfaContactIsAssigned();
    this.checkSelectedPrio();
    this.checkSelectedCategory()
  }
  
  checkSelectedCategory() {
    if (this.task.selectedCategory === '') {
      this.fControl.noCategoryErrorMessage = 'Select a category';
   } else {
    this.fControl.noCategoryErrorMessage = '';
   }
   console.log('Category', this.task.selectedCategory);
   
  }


  // Check if a priority has been selected
 checkSelectedPrio() {
    if (this.task.activePrio === '') {
      this.fControl.prioErrorMessage = 'Select a priority';
    }
  }

  // Check if a contact has been selected
  checkIfaContactIsAssigned() {
    let amount = 0;
    for (let item in this.task.selectedContacts) {
      if (this.task.selectedContacts[item]) {
        amount++;
      }
    }
    if (amount < 1) {
      this.fControl.noAssignedConactErrorMessage = 'No contact assigned'
    } else {
      this.fControl.noAssignedConactErrorMessage = '';
    }
    this.task.showAssignedTo = false;
  }

}
