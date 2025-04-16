import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RagQueryComponent } from './rag-query.component';

describe('RagQueryComponent', () => {
  let component: RagQueryComponent;
  let fixture: ComponentFixture<RagQueryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RagQueryComponent]
    });
    fixture = TestBed.createComponent(RagQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
