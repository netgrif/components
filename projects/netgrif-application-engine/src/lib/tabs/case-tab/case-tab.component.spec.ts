import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTabComponent } from './case-tab.component';

describe('TabComponent', () => {
  let component: CaseTabComponent;
  let fixture: ComponentFixture<CaseTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
