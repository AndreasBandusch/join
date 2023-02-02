import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCatagoryComponent } from './contact-catagory.component';

describe('ContactCatagoryComponent', () => {
  let component: ContactCatagoryComponent;
  let fixture: ComponentFixture<ContactCatagoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactCatagoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactCatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
