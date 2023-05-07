import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePayementComponent } from './create-payement.component';

describe('CreatePayementComponent', () => {
  let component: CreatePayementComponent;
  let fixture: ComponentFixture<CreatePayementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePayementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
