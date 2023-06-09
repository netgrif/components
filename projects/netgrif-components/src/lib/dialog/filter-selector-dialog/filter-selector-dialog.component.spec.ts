import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSelectorDialogComponent } from './filter-selector-dialog.component';

describe('FilterSelectorDialogComponent', () => {
  let component: FilterSelectorDialogComponent;
  let fixture: ComponentFixture<FilterSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterSelectorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
