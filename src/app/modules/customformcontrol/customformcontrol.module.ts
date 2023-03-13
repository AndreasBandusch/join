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
  prioErrorMessage: string = '';
  noAssignedConactErrorMessage = '';

  phoneNumber(c: AbstractControl) {
    const telephonePattern = /^[0-9\+\-\ ]{8,}$/;
    return c.value === '' || telephonePattern.test(c.value) ? null : { invalidTelephone: true };
  }
  
  name(c: AbstractControl) {
    const namePattern =  /^(\p{L}{2,}\s+){1,}\p{L}{2,}$/u;
    return c.value === '' || namePattern.test(c.value) ? null : { invalidName: true };
  }
}
