import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseHeaderExampleComponent } from './case-header-example.component';

describe('CaseHeaderExampleComponent', () => {
  let component: CaseHeaderExampleComponent;
  let fixture: ComponentFixture<CaseHeaderExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseHeaderExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseHeaderExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
