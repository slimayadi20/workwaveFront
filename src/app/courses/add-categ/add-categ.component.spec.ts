import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategComponent } from './add-categ.component';

describe('AddCategComponent', () => {
  let component: AddCategComponent;
  let fixture: ComponentFixture<AddCategComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
