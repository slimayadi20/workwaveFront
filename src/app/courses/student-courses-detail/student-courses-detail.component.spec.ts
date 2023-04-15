import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCoursesDetailComponent } from './student-courses-detail.component';

describe('StudentCoursesDetailComponent', () => {
  let component: StudentCoursesDetailComponent;
  let fixture: ComponentFixture<StudentCoursesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCoursesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCoursesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
