import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { DefaultSimpleCaseViewComponent } from './default-simple-case-view.component';

describe('CaseViewComponent', () => {
  let component: DefaultSimpleCaseViewComponent;
  let fixture: ComponentFixture<DefaultSimpleCaseViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultSimpleCaseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultSimpleCaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
