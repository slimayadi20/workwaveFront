import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCalendarComponent } from './display-calendar.component';

describe('DisplayCalendarComponent', () => {
  let component: DisplayCalendarComponent;
  let fixture: ComponentFixture<DisplayCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
