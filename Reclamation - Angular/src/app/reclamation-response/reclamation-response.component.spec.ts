import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationResponseComponent } from './reclamation-response.component';

describe('ReclamationResponseComponent', () => {
  let component: ReclamationResponseComponent;
  let fixture: ComponentFixture<ReclamationResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReclamationResponseComponent]
    });
    fixture = TestBed.createComponent(ReclamationResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
