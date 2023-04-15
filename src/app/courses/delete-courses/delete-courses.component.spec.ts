import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCoursesComponent } from './delete-courses.component';

describe('DeleteCoursesComponent', () => {
  let component: DeleteCoursesComponent;
  let fixture: ComponentFixture<DeleteCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
