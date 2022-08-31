import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseRefFieldComponent } from './case-ref-field.component';

describe('CaseRefFieldComponent', () => {
  let component: CaseRefFieldComponent;
  let fixture: ComponentFixture<CaseRefFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseRefFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseRefFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
