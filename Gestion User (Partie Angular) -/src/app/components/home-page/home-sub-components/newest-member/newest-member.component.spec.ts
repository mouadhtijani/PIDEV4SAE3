import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestMemberComponent } from './newest-member.component';

describe('NewestMemberComponent', () => {
  let component: NewestMemberComponent;
  let fixture: ComponentFixture<NewestMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewestMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewestMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
