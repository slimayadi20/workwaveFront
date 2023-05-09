import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsthismonthComponent } from './paymentsthismonth.component';

describe('PaymentsthismonthComponent', () => {
  let component: PaymentsthismonthComponent;
  let fixture: ComponentFixture<PaymentsthismonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsthismonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsthismonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
