import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFilterComponent } from './load-filter.component';

describe('LoadFilterComponent', () => {
  let component: LoadFilterComponent;
  let fixture: ComponentFixture<LoadFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
