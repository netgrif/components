import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseResourceExampleComponent } from './case-resource-example.component';

describe('CaseResourceExampleComponent', () => {
  let component: CaseResourceExampleComponent;
  let fixture: ComponentFixture<CaseResourceExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseResourceExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseResourceExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
