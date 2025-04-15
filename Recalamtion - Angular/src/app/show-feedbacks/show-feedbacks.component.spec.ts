import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFeedbacksComponent } from './show-feedbacks.component';

describe('ShowFeedbacksComponent', () => {
  let component: ShowFeedbacksComponent;
  let fixture: ComponentFixture<ShowFeedbacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowFeedbacksComponent]
    });
    fixture = TestBed.createComponent(ShowFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
