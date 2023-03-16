import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class CustomformcontrolModule { 
  noPrioErrorStartMsg: string = 'Select a priority';
  noCategoryErrorStartMsg: string = 'Select a category';
  noAssignedContactsErrorStartMsg: string ='No contact assigned';
  noSubtaskErrorStartMsg: string = 'Please select at least one created subtask';
  noticeSubtasks: string = 'Would you like to create subtasks?';
  noPrioErrorMsg: string = '';
  noAssignedContactsErrorMsg: string = '';
  noCategoryErrorMsg: string = '';
  noSubtaskErrorMsg: string = '';
  formReadyToSend: boolean = false;
  assignedToReady: boolean = false;
  prioReady: boolean = false
  categoryReady: boolean = false;
  subtasksReady: boolean = false;
  hasSend: boolean = false;


  phoneNumber(c: AbstractControl) {
    const telephonePattern = /^[0-9\+\-\ ]{8,}$/;
    return c.value === '' || telephonePattern.test(c.value) ? null : { invalidTelephone: true };
  }
  
  name(c: AbstractControl) {
    const namePattern =  /^(\p{L}{2,}\s+){1,}\p{L}{2,}$/u;
    return c.value === '' || namePattern.test(c.value) ? null : { invalidName: true };
  }


  public taskForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),

    ], []),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(250),
    ], []),
    dueDate: new FormControl('', [
      Validators.required
    ], [])
  });
}
