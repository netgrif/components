import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterStringQueryFieldComponent } from './filter-string-query-field.component';

describe('FilterStringQueryFieldComponent', () => {
  let component: FilterStringQueryFieldComponent;
  let fixture: ComponentFixture<FilterStringQueryFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterStringQueryFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterStringQueryFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
