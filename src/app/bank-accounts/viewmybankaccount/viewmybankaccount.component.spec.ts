import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmybankaccountComponent } from './viewmybankaccount.component';

describe('ViewmybankaccountComponent', () => {
  let component: ViewmybankaccountComponent;
  let fixture: ComponentFixture<ViewmybankaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmybankaccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewmybankaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
