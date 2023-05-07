import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayusersComponent } from './displayusers.component';

describe('DisplayusersComponent', () => {
  let component: DisplayusersComponent;
  let fixture: ComponentFixture<DisplayusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
