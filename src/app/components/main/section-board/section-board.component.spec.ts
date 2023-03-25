import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBoardComponent } from './section-board.component';

describe('BoardComponent', () => {
  let component: SectionBoardComponent;
  let fixture: ComponentFixture<SectionBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
