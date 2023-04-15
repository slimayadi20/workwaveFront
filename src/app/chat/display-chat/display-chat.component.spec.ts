import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayChatComponent } from './display-chat.component';

describe('DisplayChatComponent', () => {
  let component: DisplayChatComponent;
  let fixture: ComponentFixture<DisplayChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
