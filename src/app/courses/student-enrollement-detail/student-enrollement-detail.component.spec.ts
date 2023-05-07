import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrollementDetailComponent } from './student-enrollement-detail.component';

describe('StudentEnrollementDetailComponent', () => {
  let component: StudentEnrollementDetailComponent;
  let fixture: ComponentFixture<StudentEnrollementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEnrollementDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEnrollementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
