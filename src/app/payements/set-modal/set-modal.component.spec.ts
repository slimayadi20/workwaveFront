import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetModalComponent } from './set-modal.component';

describe('SetModalComponent', () => {
  let component: SetModalComponent;
  let fixture: ComponentFixture<SetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
