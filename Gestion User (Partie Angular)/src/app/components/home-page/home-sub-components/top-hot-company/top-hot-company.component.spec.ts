import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHotCompanyComponent } from './top-hot-company.component';

describe('TopHotCompanyComponent', () => {
  let component: TopHotCompanyComponent;
  let fixture: ComponentFixture<TopHotCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopHotCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopHotCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
