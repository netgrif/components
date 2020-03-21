import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchModeComponent } from './search-mode.component';

describe('SearchModeComponent', () => {
  let component: SearchModeComponent;
  let fixture: ComponentFixture<SearchModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
