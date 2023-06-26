import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseRefDefaultComponent } from './case-ref-default.component';

describe('CaseRefDefaultComponent', () => {
  let component: CaseRefDefaultComponent;
  let fixture: ComponentFixture<CaseRefDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseRefDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseRefDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
