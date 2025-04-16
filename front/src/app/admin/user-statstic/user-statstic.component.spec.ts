import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatsticComponent } from './user-statstic.component';

describe('UserStatsticComponent', () => {
  let component: UserStatsticComponent;
  let fixture: ComponentFixture<UserStatsticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStatsticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserStatsticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
