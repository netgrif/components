import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultTabbedSingleTaskViewComponent } from './default-tabbed-single-task-view.component';

describe('DefaultTabbedSingleTaskViewComponent', () => {
  let component: DefaultTabbedSingleTaskViewComponent;
  let fixture: ComponentFixture<DefaultTabbedSingleTaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultTabbedSingleTaskViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultTabbedSingleTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
