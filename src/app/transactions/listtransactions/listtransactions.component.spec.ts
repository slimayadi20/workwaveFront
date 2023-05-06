import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtransactionsComponent } from './listtransactions.component';

describe('ListtransactionsComponent', () => {
  let component: ListtransactionsComponent;
  let fixture: ComponentFixture<ListtransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListtransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListtransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
