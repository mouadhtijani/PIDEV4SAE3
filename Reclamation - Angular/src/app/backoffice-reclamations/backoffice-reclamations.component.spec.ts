import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeReclamationsComponent } from './backoffice-reclamations.component';

describe('BackofficeReclamationsComponent', () => {
  let component: BackofficeReclamationsComponent;
  let fixture: ComponentFixture<BackofficeReclamationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackofficeReclamationsComponent]
    });
    fixture = TestBed.createComponent(BackofficeReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
