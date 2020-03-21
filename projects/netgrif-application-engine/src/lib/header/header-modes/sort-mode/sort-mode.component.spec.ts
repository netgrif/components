import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortModeComponent } from './sort-mode.component';

describe('SortModeComponent', () => {
  let component: SortModeComponent;
  let fixture: ComponentFixture<SortModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
