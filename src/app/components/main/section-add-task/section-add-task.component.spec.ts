import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAddTaskComponent } from './section-add-task.component';

describe('SectionAddTaskComponent', () => {
  let component: SectionAddTaskComponent;
  let fixture: ComponentFixture<SectionAddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionAddTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionAddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
