import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSelectorListItemComponent } from './filter-selector-list-item.component';

describe('FilterSelectorListItemComponent', () => {
  let component: FilterSelectorListItemComponent;
  let fixture: ComponentFixture<FilterSelectorListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSelectorListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSelectorListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
