import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRepositoryExampleComponent } from './filter-repository-example.component';

describe('FilterRepositoryExampleComponent', () => {
  let component: FilterRepositoryExampleComponent;
  let fixture: ComponentFixture<FilterRepositoryExampleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterRepositoryExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRepositoryExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
