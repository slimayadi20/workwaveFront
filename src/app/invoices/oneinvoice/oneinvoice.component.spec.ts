import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneinvoiceComponent } from './oneinvoice.component';

describe('OneinvoiceComponent', () => {
  let component: OneinvoiceComponent;
  let fixture: ComponentFixture<OneinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneinvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
