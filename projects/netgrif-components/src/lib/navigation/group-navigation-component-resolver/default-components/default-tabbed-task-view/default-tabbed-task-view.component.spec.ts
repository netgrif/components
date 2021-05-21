import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultTabbedTaskViewComponent } from './default-tabbed-task-view.component';

describe('DefaultTabbedTaskViewComponent', () => {
  let component: DefaultTabbedTaskViewComponent;
  let fixture: ComponentFixture<DefaultTabbedTaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultTabbedTaskViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultTabbedTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
