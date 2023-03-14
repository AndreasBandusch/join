import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class CustomformcontrolModule { 
  noPrioErrorStartMsg = 'Select a priority';
  noCategoryErrorStartMsg = 'Select a category';
  noAssignedContactsErrorStartMsg ='No contact assigned';
  noSubtaskErrorStartMsg = 'Please select at least one created subtask';
  noPrioErrorMsg: string = '';
  noAssignedContactsErrorMsg = '';
  noCategoryErrorMsg = '';
  noSubtaskErrorMsg = '';
  formReadyToSend: boolean = false;
  assignedToReady = false;
  prioReady = false
  categoryReady = false;
 

  phoneNumber(c: AbstractControl) {
    const telephonePattern = /^[0-9\+\-\ ]{8,}$/;
    return c.value === '' || telephonePattern.test(c.value) ? null : { invalidTelephone: true };
  }
  
  name(c: AbstractControl) {
    const namePattern =  /^(\p{L}{2,}\s+){1,}\p{L}{2,}$/u;
    return c.value === '' || namePattern.test(c.value) ? null : { invalidName: true };
  }
}
