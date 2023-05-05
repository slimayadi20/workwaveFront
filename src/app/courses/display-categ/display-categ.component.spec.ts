import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCategComponent } from './display-categ.component';

describe('DisplayCategComponent', () => {
  let component: DisplayCategComponent;
  let fixture: ComponentFixture<DisplayCategComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCategComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
