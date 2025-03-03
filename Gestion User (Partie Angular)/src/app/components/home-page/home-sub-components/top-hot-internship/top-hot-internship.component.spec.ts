import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHotInternshipComponent } from './top-hot-internship.component';

describe('TopHotInternshipComponent', () => {
  let component: TopHotInternshipComponent;
  let fixture: ComponentFixture<TopHotInternshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopHotInternshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopHotInternshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
