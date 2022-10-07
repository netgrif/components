import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFieldTabViewComponent } from './filter-field-tab-view.component';

describe('FilterFieldTabViewComponent', () => {
  let component: FilterFieldTabViewComponent;
  let fixture: ComponentFixture<FilterFieldTabViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterFieldTabViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFieldTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
