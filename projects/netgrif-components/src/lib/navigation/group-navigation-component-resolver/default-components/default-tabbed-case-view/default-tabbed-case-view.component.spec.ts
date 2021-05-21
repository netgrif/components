import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultTabbedCaseViewComponent } from './default-tabbed-case-view.component';

describe('DefaultTabbedCaseViewComponent', () => {
  let component: DefaultTabbedCaseViewComponent;
  let fixture: ComponentFixture<DefaultTabbedCaseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultTabbedCaseViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultTabbedCaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
