import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbanaccountComponent } from './addbanaccount.component';

describe('AddbanaccountComponent', () => {
  let component: AddbanaccountComponent;
  let fixture: ComponentFixture<AddbanaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbanaccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddbanaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
