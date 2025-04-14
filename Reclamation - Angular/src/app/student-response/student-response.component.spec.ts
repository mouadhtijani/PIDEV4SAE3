import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentResponseComponent } from './student-response.component';

describe('StudentResponseComponent', () => {
  let component: StudentResponseComponent;
  let fixture: ComponentFixture<StudentResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentResponseComponent]
    });
    fixture = TestBed.createComponent(StudentResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
